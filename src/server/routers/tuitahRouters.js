require("dotenv").config();
const express = require("express");
const { showTuits } = require("../controllers/tuitahControllers");

const router = express.Router();

router.get("/list", showTuits);

module.exports = router;
