const nodemailer = require("nodemailer");

module.exports.studentPass = (length) => {
  var result = "";
  var characters = "abcdefghijklmnopqrstuvwxyz1234567890_[]{}()";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports.mail = async (params) => {
  let config = {
    name: "example.com",
    secure: true,
    service: "gmail",
    auth: {
      user: process.env.TEST_MAIL, // change in env
      pass: process.env.TEST_PASS, // change in env
    },
    from: "testingserve3@gmail.com", // change here
  };

  let transporter = nodemailer.createTransport(config);

  let info = await transporter.sendMail({
    from: "testingserve3@gmail.com", // change here
    to: params.email,
    subject: "Login Password",
    text: "Succesfully registered with us", // plain text body
    html: `
    <div
      class="container"
      style="max-width: 90%; margin: auto; padding-top: 20px"
    >
      <h2>Welcome to ECP-education.</h2>
      <h4>You are officially In ✔</h4>
      <p style="margin-bottom: 30px;">Here is your password for login. </p>
      <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.OTP}</h1>
  </div>
  `,
  });
};
