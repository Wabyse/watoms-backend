const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const fileController = require("../controllers/fileController");
const { authenticateToken } = require("../middleware/authMiddleware");

router.post("/upload", upload.single("file"), fileController.uploadFile);
router.get("/download/*", fileController.downloadFile);
router.get("/view", authenticateToken, fileController.viewFiles);
router.get("/open/:filename", fileController.openFile);
router.post("/send/:filename", fileController.sendFile); //still under development
router.get("/categories", authenticateToken, fileController.viewCategories);

module.exports = router;
