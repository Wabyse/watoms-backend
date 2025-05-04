const validator = require("validator");
const jwt = require("jsonwebtoken");
const {
  User,
  Employee,
  Teacher,
  UserRole,
  Organization,
  Student,
  EmployeeRole,
  Department,
} = require("../db/models");
const { comparePassword, hashPassword } = require("../utils/hashPassword");
require("dotenv").config();

const login = async (req, res) => {
  try {
    const { code, password } = req.body;
    if (!code || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ where: { code } });
    if (!user) {
      return res.status(401).json({ message: "Invalid code or password" });
    }

    const userRole = await UserRole.findOne({ where: { id: user.role_id } });

    let organization = null;
    let department = null; // Declare organization outside the if block
    let employeeRole = null;
    let employee = null;

    if (userRole.title !== "Student") {
      employee = await Employee.findOne({ where: { user_id: user.id } });
      if (employee) {
        organization = await Organization.findOne({
          where: { id: employee.organization_id },
        });
      }
      employeeRole = await EmployeeRole.findOne({
        where: { id: employee.role_id },
      });
      if (employeeRole && (employeeRole.title === "Teacher" || employeeRole.title === "HOD")) {
        const teacher = await Teacher.findOne({
          where: { employee_id: employee.id },
        });
        department = await Department.findOne({
          where: { id: teacher.department_id },
        });
      }
    } else {
      const student = await Student.findOne({ where: { user_id: user.id } });
      if (student) {
        organization = await Organization.findOne({
          where: { id: student.school_id },
        });
      }
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid code or password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      id: user.id,
      code: user.code,
      organization_id: organization ? organization.id : null,
      department_id: department ? department.id : null,
      user_role: userRole.title,
      employee_id: employee? employee.id : null,
      employee_role: employeeRole ? employeeRole.title : null,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const signup = async (req, res) => {
  try {
    const {
      first_name,
      middle_name,
      last_name,
      email,
      user_role_id,
      organization_id,
      emp_role_id,
      password,
      planned_sessions,
      subject_id,
      department_id,
      class_id,
      specialization_id,
    } = req.body;

    // Normalize and validate email
    const normalizedEmail = email?.toLowerCase().trim();
    if (
      !first_name ||
      !last_name ||
      !normalizedEmail ||
      !user_role_id ||
      !organization_id ||
      !password
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!validator.isEmail(normalizedEmail)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const Role = await UserRole.findOne({
      attributes: ["title"],
      where: { id: user_role_id },
    });

    if (!Role) {
      return res.status(400).json({ message: "Invalid user role ID" });
    }

    const hashedPassword = await hashPassword(password);

    const result = await User.sequelize.transaction(async (transaction) => {
      const lastUser = await User.findOne({
        attributes: ["code"],
        order: [["code", "DESC"]],
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      const newCode = lastUser?.code ? lastUser.code + 1 : 1000;

      const user = await User.create(
        {
          code: newCode,
          password: hashedPassword,
          role_id: user_role_id,
        },
        { transaction }
      );

      if (Role.title === "Student") {
        if (!class_id || !specialization_id) {
          throw new Error("Missing class or specialization");
        }

        const student = await Student.create(
          {
            first_name,
            middle_name,
            last_name,
            email: normalizedEmail,
            user_id: user.id,
            class_id,
            specialization_id,
            school_id: organization_id,
          },
          { transaction }
        );

        return { user, student };
      } else {
        if (!emp_role_id) {
          throw new Error("Missing employee role ID");
        }

        const employee = await Employee.create(
          {
            first_name,
            middle_name,
            last_name,
            email: normalizedEmail,
            organization_id,
            role_id: emp_role_id,
            user_id: user.id,
          },
          { transaction }
        );

        let teacher = null;
        if (
          Role.title === "Teacher" ||
          Role.title === "Head of Department (HOD)"
        ) {
          if (!planned_sessions || !subject_id || !department_id) {
            throw new Error("Missing teacher details");
          }
          teacher = await Teacher.create(
            {
              planned_sessions,
              employee_id: employee.id,
              subject_id,
              department_id,
            },
            { transaction }
          );
        }

        return { user, employee, teacher: teacher || null };
      }
    });

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ id: result.user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User created successfully",
      code: result.user.code,
      token,
      result,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

module.exports = { signup, login };
