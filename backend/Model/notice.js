const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  // photo: {
  //   type: String,
  // },
  // createdBy: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "User",
  // },
});

let Notice = mongoose.model("Notice", noticeSchema);

module.exports = Notice;
