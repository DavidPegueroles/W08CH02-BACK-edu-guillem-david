const Tuit = require("../../database/models/Tuit");

const showTuits = async (req, res) => {
  const tuits = await Tuit.find();
  res.status(200).json({ tuits });
};

module.exports = { showTuits };
