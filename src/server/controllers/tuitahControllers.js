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

const deleteTuit = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedTuit = await Tuit.findByIdAndDelete(id);
    if (deletedTuit)
      res.json(`Tuit with id ${deletedTuit.id} has been deleted`);
  } catch (error) {
    error.status = 400;
    error.message = "Bad Request";
    return next(error);
  }
};

module.exports = { showTuits, newTuit, deleteTuit };
