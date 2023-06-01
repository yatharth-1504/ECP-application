const Notice = require("../Model/notice");
const jwt = require("jsonwebtoken");

module.exports.createNotice = async (req, res) => {
  try {
    const notice = new Notice({
      title: req.body.title,
      description: req.body.description,
      photo: req.body.photo,
    });
    const noticeCreated = await notice.save();

      return res.status(200).send({
        
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
