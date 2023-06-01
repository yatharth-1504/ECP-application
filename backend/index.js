const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use("/", require("./Routes"));

require("./Config/mongoConnection");

const port = process.env.PORT;

app.listen(port, () => {
  console.log("server is listening");
});
