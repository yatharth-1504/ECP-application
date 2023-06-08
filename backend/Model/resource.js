const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    // photo: {
    //   type: String,
    // },
    // createdBy: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "User",
    // },
  },
  { timestamps: true }
);

let Resource = mongoose.model("Resource", resourceSchema);

module.exports = Resource;
