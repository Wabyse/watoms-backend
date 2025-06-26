const express = require("express");
const { login, signup, signupBulk } = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/bulk/signup", signupBulk);

module.exports = router;
