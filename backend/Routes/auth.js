const express = require("express");
const router = express.Router();

const authController = require("../Controller/auth_controller");


// signin + registeration

router.post("/studentRegisteration", authController.studentRegisteration)

module.exports = router;