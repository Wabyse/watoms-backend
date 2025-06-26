const {
  User,
  Employee,
  Trainer,
  TrainerLatness,
  Trainee,
  TraineeAttendance,
  Organization,
  Incident,
  IncidentCategories,
  IncidentSubCategory,
  EmployeeCheckInOut,
  Course
} = require("../db/models");
const path = require("path");

exports.viewEmployees = async (req, res) => {
  try {
    const Users = await User.findAll({
      attributes: ["id", "code"],
      include: [
        {
          model: Employee,
          as: "employee",
          required: true,
          attributes: ["id", "first_name", "middle_name", "last_name", "organization_id"],
          include: [
            {
              model: Trainer,
              as: "trainer",
              required: false, // allow null
              attributes: ["id"],
            },
          ],
        },
      ],
      where: {
        '$employee.trainer.id$': null, // only users where employee has no teacher
      },
    });

    res.status(200).json({
      status: "success",
      message: "data got fetched successfully",
      Users,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.viewTrainer = async (req, res) => {
  try {
    const { id } = req.body;

    const Users = await User.findAll({
      attributes: ["id", "code"],
      where: { id },
      include: [
        {
          model: Employee,
          as: "employee",
          required: true,
          attributes: ["id", "first_name", "middle_name", "last_name", "organization_id"],
          include: [
            {
              model: Trainer,
              as: "trainer",
              attributes: ["id", "type"],
              include: [
                {
                  model: Course,
                  as: "courses",
                  attributes: ["id", "name"],
                },
              ],
            },
          ],
        },
      ],
    });

    res.status(200).json({
      status: "success",
      message: "data got fetched successfully",
      Users,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.viewTrainers = async (req, res) => {
  try {
    const Users = await User.findAll({
      attributes: ["id", "code"],
      include: [
        {
          model: Employee,
          as: "employee",
          required: true,
          attributes: ["id", "first_name", "middle_name", "last_name", "organization_id"],
          include: [
            {
              model: Trainer,
              as: "trainer",
              required: true,
              attributes: ["id"],
            },
          ],
        },
      ],
    });

    res.status(200).json({
      status: "success",
      message: "data got fetched successfully",
      Users,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.submitTrainerLatness = async (req, res) => {
  try {
    const LatnessData = req.body;

    if (!Array.isArray(LatnessData) || LatnessData.length === 0) {
      return res.status(400).json({ message: "Invalid or empty data array." });
    }

    const addLatness = await TrainerLatness.bulkCreate(LatnessData, {
      validate: true,
      returning: true,
    });

    res.status(200).json({
      status: "success",
      message: "Trainer latness data created successfully",
      data: addLatness,
    });
  } catch (error) {
    console.error("Error creating latness data:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.viewTrainees = async (req, res) => {
  try {
    const trainees = await Trainee.findAll({
      attributes: [
        "id",
        "first_name",
        "middle_name",
        "last_name",
        "user_id",
        "course_offering_id",
        "organization_id",
      ],
    });

    res.status(200).json({
      status: "success",
      message: "data got fetched successfully",
      trainees,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.submitTraineeAbsence = async (req, res) => {
  try {
    const AbsenceData = req.body;

    if (!Array.isArray(AbsenceData) || AbsenceData.length === 0) {
      return res.status(400).json({ message: "Invalid or empty data array." });
    }

    const addAttendance = await TraineeAttendance.bulkCreate(AbsenceData, {
      validate: true,
      returning: true,
    });

    res.status(200).json({
      status: "success",
      message: "Trainees Absence data created successfully",
      data: addAttendance,
    });
  } catch (error) {
    console.error("Error creating latness data:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.submitIncident = async (req, res) => {
  try {
    const { comment, location, institution_id, sub_category_id, incident_date } =
      req.body;

    if (!institution_id || !incident_date || !sub_category_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Handle file upload
    let file_path = null;
    if (req.file) {
      file_path = path.join("uploads", req.file.filename);
    }

    const addIncident = await Incident.create({
      comment,
      location,
      file_path, // Will be null if no file is uploaded
      institution_id,
      sub_category_id,
      incident_date,
    });

    res.status(201).json({
      message: "Incident assigned successfully",
      incident: addIncident,
    });
  } catch (error) {
    console.error("Sequelize Validation Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.viewIncidentsCategories = async (req, res) => {
  try {
    const categories = await IncidentCategories.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: IncidentSubCategory,
          as: "incidentSubCategories",
          required: true,
          attributes: ["id", "name"],
        },
      ],
    });
    res.status(200).json({
      status: "success",
      message: "data got fetched successfully",
      categories,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.checkInOut = async (req, res) => {
  try {
    const { latitude, longitude, user_id } = req.body;

    if (!latitude || !longitude || !user_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const checkInOut = await EmployeeCheckInOut.create({
      latitude,
      longitude,
      user_id
    });

    res.status(201).json({
      message: "checked In / Out successfully",
      incident: checkInOut,
    });
  } catch (error) {
    console.error("Sequelize Validation Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

exports.viewCheckInOut = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ message: "user_id is required" });
    }

    const checkInOuts = await EmployeeCheckInOut.findAll({
      attributes: ["id", "latitude", "longitude", "createdAt"],
      where: { user_id },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      message: "Checked In / Out fetched successfully",
      checkInOuts,
    });
  } catch (error) {
    console.error("Sequelize Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};