require("dotenv").config();
const debug = require("debug")("social:root");
const chalk = require("chalk");
const connectDB = require("./db");
const { app } = require("./server/index");
const serverUp = require("./server/serverUp");

const DBlink = process.env.MONGODB_STRING;
const port = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB(DBlink);
    await serverUp(port, app);
    debug(chalk.greenBright(`Server-up in ${port}`));
  } catch (error) {
    debug(chalk.redBright(`Error: `, error.message));
  }
})();
