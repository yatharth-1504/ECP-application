const Student = require("../Model/student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { studentPass } = require("../Util/index");

module.exports.studentSignIn = async (req, res) => {
  await Student.findOne({ email: req.body.email })
    .then((student) => {
      console.log(student);
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        student.password
      );
      if (!passwordIsValid) {
        return res.status(401).send("Invalid Credentials");
      }
      var token = jwt.sign({ _id: student._id }, process.env.JWT_SECRET_KEY);
      return res.status(200).send({
        student: student,
        loginSatus: true,
        error: null,
        id: student._id,
        jwtToken: token,
      });
    })
    .catch((err) =>
      res.status(500).send({
        loginSatus: false,
        error: err.message,
        id: null,
        jwtToken: null,
      })
    );
};

module.exports.adminSignIn = async (req, res) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (req.body.email !== adminEmail) throw new Error("Invalid Email");
    let passwordIsValid = req.body.password === process.env.ADMIN_PASSWORD;
    if (!passwordIsValid) {
      return res.status(401).send("Invalid Credentials");
    }
    let token = jwt.sign({ email: adminEmail }, process.env.JWT_SECRET_KEY);
    return res.status(200).send({ status: true, token: token });
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.studentRegisteration = async (req, res) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (req.decoded.email != adminEmail) throw new Error("Unauthorised!");
    let pass = studentPass(8);
    consosle.log(pass);
    const student = new Student({
      name: req.body.name,
      photo: req.body.photo,
      fatherName: req.body.fatherName,
      email: req.body.email,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      studentPhone: req.body.studentPhone,
      parentPhone: req.body.parentPhone,
      studySubject: req.body.studySubject,
      course: req.body.course,
      address: req.body.address,
      apartment: req.body.apartment,
      city: req.body.city,
      state: req.body.state,
      postalCode: req.body.postalCode,
      country: req.body.country,
      classMode: req.body.classMode,
      password: bcrypt.hashSync(
        pass,
        bcrypt.genSaltSync(Number(process.env.ITERATIONS))
      ),
    });
    const studentCreated = await student.save();
    // mail({ email: studentCreated.email, OTP: pass });
    return res.status(200).send({
      student: studentCreated,
      message: "Student Created Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: err.message,
      student: null,
    });
  }
};
