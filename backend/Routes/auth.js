const express = require("express");
const router = express.Router();

const authController = require("../Controller/auth_controller");
const authMiddleWare = require("../Middleware/auth_middleware");

// signin + registeration
router.post(
  "/studentRegisteration",
  authMiddleWare.verify_jwt,
  authController.studentRegisteration
);
router.post("/signin", authController.studentSignIn);
router.post("/adminsignin", authController.adminSignIn);

module.exports = router;
