const { Curriculum } = require("../db/models");
require("dotenv").config();

const fetchCurriculums = async (req, res) => {
  try {
    const data = await Curriculum.findAll({
      attributes: ["id", "code"],
    });
    res.status(200).json({
      status: "success",
      message: "data got fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const fetchOrganizations = async (req, res) => {
  try {
    const data = await Organization.findAll({
      attributes: ["id", "name", "type"],
    });

    res.status(200).json({
      status: "success",
      message: "Data fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const viewInstitutions = async (req, res) => {
  try {
    const institutions = await Organization.findAll({
      attributes: ["id", "name"],
      where: { type: "institution" },
    });

    res.status(200).json({
      status: "success",
      message: "data got fetched successfully",
      institutions,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { fetchCurriculums, fetchOrganizations, viewInstitutions };