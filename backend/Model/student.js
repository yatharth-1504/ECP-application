const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  studentPhone: {
    type: String,
    required: true,
  },
  parentPhone: {
    type: String,
    required: true,
  },
  studySubject: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  apartment: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  classMode: {
    type: String,
    required: true,
  },
});

let Student = mongoose.model("Student", studentSchema);

module.exports = Student;
