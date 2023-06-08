const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

router.use("/auth", require("./auth"));
router.use("/notice", require("./notice"));
router.use("/resource", require("./resource"));

module.exports = app;
