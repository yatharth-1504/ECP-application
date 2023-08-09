const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    course: {
      type: String,
    }
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

let Notice = mongoose.model("Notice", noticeSchema);

module.exports = Notice;
