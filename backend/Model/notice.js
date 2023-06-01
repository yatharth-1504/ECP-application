const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  photo: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "ADMIN",
    },
    role: {
        default: "USER",
        
    }
});

let Notice = mongoose.model("notice", noticeSchema);

module.exports = Notice;
