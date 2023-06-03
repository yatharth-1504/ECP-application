const jwt = require("jsonwebtoken");
const Student = require("../Model/student");

module.exports.verify_jwt = (req, res, next) => {
  let token = req.headers["authorization"];
  console.log(token);
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!" + err,
        decodedId: null,
      });
    }
    console.log(decoded);
    req.decoded = decoded;
    return next();
  });
};
