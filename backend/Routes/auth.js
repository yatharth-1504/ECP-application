const express = require("express");
const router = express.Router();

const authController = require("../Controller/auth_controller");
const authMiddleWare = require("../Middleware/auth_middleware");

// signin + registeration
router.post(
  "/studentReg",
  authMiddleWare.verify_jwt,
  authController.studentRegisteration
);
router.get(
  "/getstudents",
  authMiddleWare.verify_jwt,
  authController.getStudents
);
router.post("/signin", authController.studentSignIn);
router.post("/adminsignin", authController.adminSignIn);
router.get("/getme", authMiddleWare.verify_jwt, authController.getMe);
router.post("/sendOTP", authController.__otp);
router.post("/verifyOTP", authController.__otp);
router.post("/resetPassword", authController.resetPassword);
module.exports = router;
