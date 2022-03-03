const Tuit = require("../../database/models/Tuit");

const showTuits = async (req, res) => {
  const tuits = await Tuit.find();
  res.json({ tuits });
};

const showTuit = async (req, res) => {
  const { id } = req.params;
  const tuit = await Tuit.findById(id);
  res.json({ tuit });
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
    next(error);
  }
};

const likeTuit = async (req, res, next) => {
  const { id } = req.params;
  try {
    const tuit = await Tuit.findById(id);
    tuit.likes += 1;
    await tuit.save();
    res.json("You liked that!");
  } catch (error) {
    error.message = "An error occurred while liking the tuit";
    error.status = 400;
    next(error);
  }
};

module.exports = { showTuits, showTuit, newTuit, deleteTuit, likeTuit };
