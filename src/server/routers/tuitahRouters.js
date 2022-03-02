require("dotenv").config();
const express = require("express");
const {
  showTuits,
  newTuit,
  deleteTuit,
} = require("../controllers/tuitahControllers");

const router = express.Router();

router.get("/list", showTuits);
router.post("/new", newTuit);
router.delete("/delete", deleteTuit);

module.exports = router;
