const express = require("express");
const router = express.Router();

const noticeController = require("../Controller/notice_controller");
const authMiddleWare = require("../Middleware/auth_middleware");

// signin + registeration
router.post(
  "/createnotice",
  authMiddleWare.verify_jwt,
  noticeController.createNotice
);
router.get(
  "/getnotices",
  authMiddleWare.verify_jwt,
  noticeController.getNotices
);

module.exports = router;
