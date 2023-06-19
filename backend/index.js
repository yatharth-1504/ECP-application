const express = require("express");
const app = express();
const bp = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();


app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use("/", require("./Routes"));

require("./Config/mongoConnection");

const port = process.env.PORT;

app.listen(port, () => {
  console.log("server is listening");
});
