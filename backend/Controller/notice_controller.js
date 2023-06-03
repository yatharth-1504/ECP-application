const Notice = require("../Model/notice");
const jwt = require("jsonwebtoken");

module.exports.createNotice = async (req, res) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (req.decoded.email != adminEmail) throw new Error("Unauthorised!");
    const notice = new Notice({
      title: req.body.title,
      description: req.body.description,
    });
    const noticeCreated = await notice.save();
    return res.status(200).send({
      noticeCreated,
    });
  } catch (error) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

module.exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find();
    return res.status(200).send({
      notices: notices,
    });
  } catch (error) {
    return res.status(500).send({
      message: err.message,
    });
  }
};
