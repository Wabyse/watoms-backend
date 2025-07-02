const express = require("express");
const { insertForm, fetchForm, fetchAllForms, insertCurriculumForm, insertEnvForm, insertCourseForm, insertFacilityForm } = require("../controllers/formController");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateToken, fetchForm);
router.get("/AllForms", authenticateToken, fetchAllForms);
router.post("/individualReports", authenticateToken, insertForm);
router.post("/curriculumReports", authenticateToken, insertCurriculumForm);
router.post("/environmentResports", authenticateToken, insertEnvForm);
router.post("/courseReports", authenticateToken, insertCourseForm);
router.post("/facilityReports", authenticateToken, insertFacilityForm);

module.exports = router;
