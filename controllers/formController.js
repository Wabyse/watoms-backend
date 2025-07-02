const {
  IndividualReport,
  IndividualResult,
  CurriculumReport,
  CurriculumResult,
  EnvironmentReport,
  EnvironmentResult,
  CourseReport,
  CourseResult,
  FacilityReport,
  FacilityResult,
  User,
  Question,
  Field,
  Form,
  SubField,
} = require("../db/models");
require("dotenv").config();

const insertForm = async (req, res) => {
  try {
    const { assessor, assessee, questionsResult } = req.body;
    if (!assessor || !assessee || !questionsResult) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    const result = await User.sequelize.transaction(async (transaction) => {
      const report = await IndividualReport.create(
        {
          assessor_id: assessor,
          assessee_id: assessee,
        },
        { transaction }
      );
      const answers = questionsResult.map((question) => ({
        score: question.result,
        question_id: question.question_id,
        report_id: report.id,
      }));
      await IndividualResult.bulkCreate(answers, { validate: true, transaction });
      return { report, answers };
    });
    res
      .status(201)
      .json({ message: "form inserted successfully", result, questionsResult });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const insertCurriculumForm = async (req, res) => {
  try {
    const { userId, curriculumId, organization_id, questionsResult } = req.body;
    if (!userId || !curriculumId || !questionsResult || !organization_id) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    const result = await User.sequelize.transaction(async (transaction) => {
      const report = await CurriculumReport.create(
        {
          user_id: userId,
          curriculum_id: curriculumId,
          organization_id
        },
        { transaction }
      );
      const answers = questionsResult.map((question) => ({
        score: question.result,
        question_id: question.question_id,
        report_id: report.id,
      }));
      await CurriculumResult.bulkCreate(answers, {
        validate: true,
        transaction,
      });
      return { report, answers };
    });
    res
      .status(201)
      .json({ message: "form inserted successfully", result, questionsResult });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const insertEnvForm = async (req, res) => {
  try {
    const { userId, organization_id, questionsResult } = req.body;
    if (!userId || !questionsResult || !organization_id) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    const result = await User.sequelize.transaction(async (transaction) => {
      const report = await EnvironmentReport.create(
        {
          user_id: userId,
          organization_id
        },
        { transaction }
      );
      const answers = questionsResult.map((question) => ({
        score: question.result,
        question_id: question.question_id,
        report_id: report.id,
      }));
      await EnvironmentResult.bulkCreate(answers, {
        validate: true,
        transaction,
      });
      return { report, answers };
    });
    res
      .status(201)
      .json({ message: "form inserted successfully", result, questionsResult });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const insertCourseForm = async (req, res) => {
  try {
    const { userId, course_offering_id, questionsResult } = req.body;
    if (!userId || !course_offering_id || !questionsResult) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    const result = await User.sequelize.transaction(async (transaction) => {
      const report = await CourseReport.create(
        {
          user_id: userId,
          course_offering_id,
        },
        { transaction }
      );
      const answers = questionsResult.map((question) => ({
        score: question.result,
        question_id: question.question_id,
        report_id: report.id,
      }));
      await CourseResult.bulkCreate(answers, {
        validate: true,
        transaction,
      });
      return { report, answers };
    });
    res
      .status(201)
      .json({ message: "form inserted successfully", result, questionsResult });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const insertFacilityForm = async (req, res) => {
  try {
    const { userId, facility_id, questionsResult } = req.body;
    if (!userId || !facility_id || !questionsResult) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    const result = await User.sequelize.transaction(async (transaction) => {
      const report = await FacilityReport.create(
        {
          user_id: userId,
          facility_id,
        },
        { transaction }
      );
      const answers = questionsResult.map((question) => ({
        score: question.result,
        question_id: question.question_id,
        report_id: report.id,
      }));
      await FacilityResult.bulkCreate(answers, {
        validate: true,
        transaction,
      });
      return { report, answers };
    });
    res
      .status(201)
      .json({ message: "form inserted successfully", result, questionsResult });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const fetchForm = async (req, res) => {
  try {
    const { formId } = req.body;

    if (!formId || isNaN(formId)) {
      return res.status(400).json({
        status: "fail",
        message: "Valid formId is required",
      });
    }

    const data = await Question.findAll({
      attributes: [
        ["id", "question_id"],
        ["ar_name", "question_ar_name"],
        ["weight", "question_weight"],
        ["max_score", "question_max_score"],
      ],
      include: [
        {
          model: SubField,
          as: "sub_field",
          required: true,
          attributes: [
            ["id", "sub_field_id"],
            ["ar_name", "sub_field_ar_name"],
            ["weight", "sub_field_weight"],
            "field_id",
          ],
          include: [
            {
              model: Field,
              as: "field",
              required: true,
              attributes: [
                ["id", "field_id"],
                ["ar_name", "field_ar_name"],
                ["weight", "field_weight"],
                "form_id",
              ],
              include: [
                {
                  model: Form,
                  as: "form",
                  required: true,
                  attributes: [
                    ["id", "form_id"],
                    ["ar_name", "form_ar_name"],
                    ["code", "form_code"],
                    ["type", "form_type"],
                    ["weight", "form_weight"],
                  ],
                  where: { id: formId },
                },
              ],
            },
          ],
        },
      ],
    });

    res.status(200).json({
      status: "success",
      message: "Data fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Error fetching form:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const fetchAllForms = async (req, res) => {
  try {
    const data = await Form.findAll({
      attributes: ["id", "ar_name", "code", "type"],
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

module.exports = {
  insertForm,
  fetchForm,
  fetchAllForms,
  insertCurriculumForm,
  insertEnvForm,
  insertCourseForm,
  insertFacilityForm,
};
