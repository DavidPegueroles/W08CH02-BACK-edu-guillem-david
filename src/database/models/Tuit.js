const { Schema, model } = require("mongoose");

const TuitSchema = new Schema({
  text: {
    type: String,
    required: true,
    min: 1,
    max: 200,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const Tuit = model("Tuit", TuitSchema, "tuits");

module.exports = Tuit;
