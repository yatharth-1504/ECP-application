const express = require("express");
const router = express.Router();

const resourceController = require("../Controller/resource_controller");
const authMiddleWare = require("../Middleware/auth_middleware");

router.post(
  "/createresource",
  authMiddleWare.verify_jwt,
  resourceController.createResource
);
router.get(
  "/getresources",
  authMiddleWare.verify_jwt,
  resourceController.getResources
);

module.exports = router;
