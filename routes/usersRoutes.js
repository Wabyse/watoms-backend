const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const usersController = require("../controllers/usersController");

router.get("/employees", usersController.viewEmployees);
router.post("/trainer", usersController.viewTrainer);
router.get("/trainers", usersController.viewTrainers);
router.post("/trainer/lateness", usersController.submitTrainerLatness);
router.get("/trainees", usersController.viewTrainees);
router.post("/trainees/absence", usersController.submitTraineeAbsence);
router.post("/institutions/incidents", upload.single("file"), usersController.submitIncident);
router.get("/institutions/incidents/categories", usersController.viewIncidentsCategories);
router.post("/checkinout", usersController.checkInOut);
router.get("/checkinout/view", usersController.viewCheckInOut);

module.exports = router;