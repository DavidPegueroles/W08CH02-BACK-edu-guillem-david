require("dotenv").config();
const express = require("express");
const {
  showTuits,
  newTuit,
  deleteTuit,
  showTuit,
  likeTuit,
} = require("../controllers/tuitahControllers");

const router = express.Router();

router.get("/list", showTuits);
router.get("/:id", showTuit);
router.post("/new", newTuit);
router.delete("/delete/:id", deleteTuit);
router.patch("/like/:id", likeTuit);

module.exports = router;
