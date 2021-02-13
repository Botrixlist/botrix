const config = require("../../../config.json");
const mongoose = require("mongoose");
const chalk = require("chalk");

module.exports = {
  init: () => {
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4,
    };
    mongoose.connect(config.MongoDbServer, dbOptions);
    mongoose.set("useFindAndModify", false);
    mongoose.Promise = global.Promise;

    mongoose.connection.on("connected", () => {
      console.log(
        chalk.greenBright("[BOT DB READY]"),
        "Bot linked with MongoDB"
      );
    });

    mongoose.connection.on("err", (err) => {
      console.error(
        chalk.redBright("[BOT DB ISSUE]"),
        `Mongoose connection error: \n${err.stack}`
      );
    });

    mongoose.connection.on("disconnected", () => {
      console.log(
        chalk.redBright("[BOT DB ISSUE]"),
        `Mongoose connection lost`
      );
    });
  },
};
