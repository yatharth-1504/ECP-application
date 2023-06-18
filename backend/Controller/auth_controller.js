const Student = require("../Model/student");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { studentPass, mail, autoGenPass, half_hour } = require("../Util/index");

module.exports.studentSignIn = async (req, res) => {
  await Student.findOne({ email: req.body.email })
    .then((student) => {
      var passwordIsValid = bcryptjs.compareSync(
        req.body.password,
        student.password
      );
      if (!passwordIsValid) {
        return res.status(401).send("Invalid Credentials");
      }
      var token = jwt.sign(
        { email: student.email },
        process.env.JWT_SECRET_KEY
      );
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
    if (req.body.email !== adminEmail)
      return res.satus(200).send("Invalid Email");
    let passwordIsValid = req.body.password === process.env.ADMIN_PASSWORD;
    if (!passwordIsValid) {
      return res.status(401).send("Invalid Credentials");
    }
    let token = jwt.sign({ email: adminEmail }, process.env.JWT_SECRET_KEY);
    return res.status(200).send({ status: true, token: token });
  } catch (e) {
    return res.satus(200).send(err);
  }
};

module.exports.studentRegisteration = async (req, res) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (req.decoded.email != adminEmail) throw new Error("Unauthorised!");
    let pass = studentPass(8);
    console.log(pass);
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
      password: bcryptjs.hashSync(
        pass,
        bcryptjs.genSaltSync(Number(process.env.ITERATIONS))
      ),
    });
    const studentCreated = await student.save();
    mail({ email: studentCreated.email, OTP: pass });
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

module.exports.getStudents = async (req, res) => {
  if (req.decoded.email === process.env.ADMIN_EMAIL) {
    return res
      .status(200)
      .send({ students: await Student.find().sort({ createdAt: -1 }) });
  } else {
    throw new Error("Unauthorised");
  }
};

module.exports.getMe = async (req, res) => {
  try {
    const currentUser = await Student.findOne({ email: req.decoded.email });
    return res.status(200).send({ currentUser });
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.__otp = async (req, res) => {
  await Student.findOne({ email: req.body.email })
    .then(async (user) => {
      if (req.body.otp) {
        const current_date = new Date();
        const otp_time = new Date(user.otp_time);
        if (current_date.getTime() - otp_time.getTime() > half_hour)
          return res.status(500).send("OTP expired");
        if (user.otp != req.body.otp)
          return res.status(500).send("Invalid OTP");
        user.valid_otp = true;
        const userUpdated = await user.save();
        if (!!userUpdated) return res.status(200).send("OTP verified");
      } else {
        let otp = autoGenPass(Number(process.env.OTP_LENGTH));
        const otp_time = new Date();
        mail({ email: user.email, OTP: otp });
        console.log("here");
        user.otp = otp;
        user.otp_time = otp_time;
        const userUpdated = await user.save();
        if (!!userUpdated) return res.status(200).send("OTP updated");
        return res.status(500).send("Error in updating user");
      }
    })
    .catch(() => {
      return res.status(404).send("Invalid Email");
    });
};

module.exports.resetPassword = async (req, res) => {
  await Student.findOne({ email: req.body.email })
    .then(async (user) => {
      console.log(user);
      if (!user.valid_otp) return res.status(500).send("Verify OTP first");
      user.password = bcryptjs.hashSync(
        req.body.new_password,
        bcryptjs.genSaltSync(Number(process.env.ITERATIONS))
      );
      user.valid_otp = false;
      const userUpdated = await user.save();
      if (!!userUpdated) return res.status(200).send("Password updated");
      return res.status(500).send("Error in saving User");
    })
    .catch(() => res.status(404).send("Invalid Email"));
};
