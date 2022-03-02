require("dotenv").config();
const express = require("express");
const { showTuits, newTuit } = require("../controllers/tuitahControllers");

const router = express.Router();

router.get("/list", showTuits);
router.post("/new", newTuit);

module.exports = router;
