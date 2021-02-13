const { Router } = require("express");
const bots = require("../models/bots");
const user = require("../models/user");
const wallet = require("../models/wallet");
const rewards = require("../models/rewards");
const config = require("../config.json");
const { session } = require("passport");
const marked = require("marked");

var route = new Router();

route.use("/:id", async (req, res, next) => {
  let walletUser;
  if (req.user) walletUser = await wallet.findOne({ userid: req.user.id });
  var bot = await bots.findOne({ botid: req.params.id });
  var amountOfViews = (bot.views += 1);
  await bots.updateOne(
    { botid: req.params.id },
    { $set: { views: amountOfViews } }
  );
  let b;
  let person;
  try {
    person = await req.app
      .get("client")
      .guilds.cache.get(config.GUILD_ID)
      .members.fetch(bot.owners[0]);
    let c = await req.app
      .get("client")
      .guilds.cache.get(config.GUILD_ID)
      .members.fetch(bot.botid);

    if (c) c = c.presence.status;
    else c = "offline";
    switch (c) {
      case "online":
        b = "#32ff00";
        break;
      case "idle":
        b = "#ffaa00";
        break;
      case "dnd":
        b = "#ff0000";
        break;
      case "offline":
      default:
        b = "#8c8c8c";
        break;
    }
  } catch (e) {
    b = "#8c8c8c";
    console.log(e);
  }
  let admin = false;
  if (req.user) {
    if (config.ADMIN_USERS.includes(req.user.id)) admin = true;

    const userObject = await user.findOne({ userid: req.user.id });

    if (userObject) {
      await user.updateOne(
        { userid: req.user.id },
        { $push: { recentViews: bot } }
      );
    }
  }

  let reward = await rewards.find({});

  let rendered = marked(bot.long);
  let badgesDict = new Object();
  badgesDict.data = {};

  bot.badges.forEach(async (badge) => {
    if (!badgesDict.data[badge.name.toLowerCase()]) {
      badgesDict.data[badge.name.toLowerCase()] = {
        key: 0,
        name: badge.name.toLowerCase(),
      };
    } else {
      let key = (badgesDict.data[badge.name.toLowerCase()].key += 1);

      badgesDict.data[badge.name.toLowerCase()].key = key;
    }
  });

  const ordered = {};
  Object.keys(badgesDict)
    .sort()
    .forEach(function (key) {
      ordered[key] = badgesDict[key];
    });

  const orderedArr = [];

  for (const tag in ordered.data) {
    if (ordered.data[tag]) {
      orderedArr.push({ name: tag, key: ordered.data[tag].key });
    }
  }

  isOwner = false;
  
  if (req.user) {
    if (bot.owners.includes(req.user.id)) {
      isOwner = true;
    }
  }

  let data = {
    bot: bot,
    user: req.user,
    borderColor: b,
    author: person,
    wallet: req.session,
    long: rendered,
    isAdmin: admin,
    wallet: req.session,
    rewards: reward,
    badges: orderedArr,
    isOwner: isOwner,
  };

  res.render("bot", data);
});

module.exports = route;
