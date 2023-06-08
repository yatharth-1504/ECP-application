const Resource = require("../Model/resource");
const jwt = require("jsonwebtoken");

module.exports.createResource = async (req, res) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (req.decoded.email != adminEmail) throw new Error("Unauthorised!");
    const resource = new Resource({
      title: req.body.title,
      description: req.body.description,
    });
    const resourceCreated = await resource.save();
    return res.status(200).send({
      resourceCreated,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

module.exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    return res.status(200).send({
      resources: resources,
    });
  } catch (error) {
    return res.status(500).send({
      message: err.message,
    });
  }
};
