const Tuit = require("../../database/models/Tuit");

const showTuits = async (req, res) => {
  const tuits = await Tuit.find();
  res.json({ tuits });
};

module.exports = { showTuits };
