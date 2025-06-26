const validator = require("validator");
const jwt = require("jsonwebtoken");
const {
  User,
  Employee,
  Trainer,
  UserRole,
  Organization,
  Trainee,
  EmployeeRole,
  Course,
  CourseOffering
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
    let employeeRole = null;
    let employee = null;

    if (userRole.title !== "Trainee") {
      employee = await Employee.findOne({ where: { user_id: user.id } });
      if (employee) {
        organization = await Organization.findOne({
          where: { id: employee.organization_id },
        });
      }
      employeeRole = await EmployeeRole.findOne({
        where: { id: employee.role_id },
      });
      if (employeeRole && (employeeRole.title === "Trainer")) {
        const trainer = await Trainer.findOne({
          where: { employee_id: employee.id },
        });
      }
    } else {
      const trainee = await Trainee.findOne({ where: { user_id: user.id } });
      if (trainee) {
        organization = await Organization.findOne({
          where: { id: trainee.organization_id },
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
      user_role: userRole.title,
      employee_id: employee ? employee.id : null,
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
      course_id,
      course_offering_id,
      trainer_type,
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

      if (Role.title === "trainee") {
        if (!course_offering_id) {
          throw new Error("Missing class or specialization");
        }

        const trainee = await Trainee.create(
          {
            first_name,
            middle_name,
            last_name,
            email: normalizedEmail,
            user_id: user.id,
            course_offering_id,
            organization_id,
          },
          { transaction }
        );

        return { user, trainee };
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

        let trainer = null;
        if (
          Role.title === "Trainer"
        ) {
          if (!trainer_type || !course_id) {
            throw new Error("Missing trainer details");
          }
          trainer = await Trainer.create(
            {
              type: trainer_type,
              employee_id: employee.id,
              course_id,
            },
            { transaction }
          );
        }

        return { user, employee, trainer: trainer || null };
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

const signupBulk = async (req, res) => {
  try {
    const users = req.body;

    if (!Array.isArray(users) || users.length === 0) {
      return res.status(400).json({ message: "Users array is required" });
    }

    const createdResults = [];

    await User.sequelize.transaction(async (transaction) => {
      const lastUser = await User.findOne({
        attributes: ["code"],
        order: [["code", "DESC"]],
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      let newCode = lastUser?.code ? lastUser.code + 1 : 1000;

      for (const userData of users) {
        const {
          first_name,
          middle_name,
          last_name,
          email,
          user_role_id,
          organization_id,
          emp_role_id,
          password,
          course_id,
          course_offering_id,
          trainer_type,
        } = userData;

        const normalizedEmail = email?.toLowerCase().trim();

        if (
          !first_name ||
          !last_name ||
          !normalizedEmail ||
          !user_role_id ||
          !organization_id ||
          !password
        ) {
          throw new Error(`Missing required fields for email: ${email}`);
        }

        if (!validator.isEmail(normalizedEmail)) {
          throw new Error(`Invalid email format: ${email}`);
        }

        const Role = await UserRole.findOne({
          attributes: ["title"],
          where: { id: user_role_id },
          transaction,
        });

        if (!Role) {
          throw new Error(`Invalid user role ID for email: ${email}`);
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create(
          {
            code: newCode++,
            password: hashedPassword,
            role_id: user_role_id,
          },
          { transaction }
        );

        // Get organization name
        const organization = await Organization.findByPk(organization_id, {
          attributes: ['name'],
          transaction,
        });

        let outputData = {
          first_name,
          middle_name,
          last_name,
          email: normalizedEmail,
          code: user.code,
          password,
          organization: organization?.name || null,
          course_offering: null,
        };

        if (Role.title === "Trainee") {
          if (!course_offering_id) {
            throw new Error(`Missing course offering for trainee: ${email}`);
          }

          await Trainee.create(
            {
              first_name,
              middle_name,
              last_name,
              email: normalizedEmail,
              user_id: user.id,
              course_offering_id,
              organization_id,
            },
            { transaction }
          );

          // Get class and specialization names
          const courseOfferingObj = await CourseOffering.findByPk(course_offering_id, {
            attributes: ['name'],
            transaction,
          });

          outputData.course_offering = courseOfferingObj?.name || null;
        } else {
          if (!emp_role_id) {
            throw new Error(`Missing employee role ID`);
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

          if (Role.title === "Trainer") {
            if (!trainer_type || !course_id) {
              throw new Error(`Missing trainer details`);
            }

            await Trainer.create(
              {
                type: trainer_type,
                employee_id: employee.id,
                course_id,
              },
              { transaction }
            );
          }
        }

        createdResults.push(outputData);
      }
    });

    res.status(201).json({
      message: "Users created successfully",
      created: createdResults.length,
      users: createdResults,
    });
  } catch (error) {
    console.error("Bulk Signup Error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

module.exports = { signup, login, signupBulk };