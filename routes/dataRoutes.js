const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");
const { authenticateToken } = require("../middleware/authMiddleware");

router.get("/curriculums", authenticateToken, dataController.fetchCurriculums);
router.get("/Organizations", authenticateToken, dataController.fetchOrganizations);
router.get("/institutions", dataController.viewInstitutions);

module.exports = router;