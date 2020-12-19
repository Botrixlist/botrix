const chalk = require("chalk");

module.exports = async (client) => {
  client.user.setPresence({
    activity: { name: "https://botrix.cc/", type: "WATCHING" },
    status: "idle",
  });

  setInterval(() => {
    client.user.setPresence({
      activity: { name: "https://botrix.cc/", type: "WATCHING" },
      status: "idle",
    });
    chalk.greenBright("[BOT UPDATE] The bot presence has been updated.");
  }, 300000);

  console.log(
    chalk.greenBright("[BOT READY] Bot connected to the Discord API.")
  );

  client.mongodb = require("../../helpers/mongo");
  client.mongodb.init();
};
