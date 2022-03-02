const Tuit = require("../../database/models/Tuit");

const showTuits = async (req, res) => {
  const tuits = await Tuit.find();
  res.json({ tuits });
};

const newTuit = async (req, res, next) => {
  try {
    const toCreateTuit = req.body;
    const postedTuit = await Tuit.create(toCreateTuit);
    res.status(201).json(postedTuit);
  } catch (error) {
    const newError = new Error("Invalid tuit");
    newError.status = 400;
    next(newError);
  }
};

module.exports = { showTuits, newTuit };
