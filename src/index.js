const express = require("express");
const url = require("url");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routing = require("./routes/index");
const passport = require("passport");
const session = require("express-session");
const Strategy = require("passport-discord").Strategy;
const bodyParser = require("body-parser");
const config = require("./config.json");
var cookieParser = require("cookie-parser");
const Discord = require("discord.js");
const { Collection } = require("discord.js");
const MemoryStore = require("memorystore")(session);
const cors = require("cors");
require("dotenv").config();
const rateLimit = require("express-rate-limit");
var MongoStore = require('rate-limit-mongo');
const glob = require("glob");
(async () => {
  const sitemap = require("express-sitemap")();
  let client = new Discord.Client();
  let serverClient = new Discord.Client();

  //setting up mongoose
  await mongoose.connect(config.MongoDbServer, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  serverClient.on("ready", () => {
    console.log(`${serverClient.user.tag} Is online and tracking guilds!`);
  });

  //connecting to the discord bot
  client.on("ready", () => {
    console.log(
      `Discord Client attached to express, logged in as: ${client.user.tag} \nBTX Internal Blockchian online and awaiting requests. \nBotrix Network online.`
    );
  });

  client.commands = new Collection();
  client.aliases = new Collection();
  client.limits = new Collection();
  client.config = config;

  serverClient.commands = new Collection();
  serverClient.aliases = new Collection();
  serverClient.limits = new Collection();
  serverClient.config = config;

  const serverCommand = require("./bslBot/structures/command");
  serverCommand.run(serverClient);

  const serverEvents = require("./bslBot/structures/event");
  serverEvents.run(serverClient);

  console.log("Connected to database on " + config.MongoDbServer);
  var app = express();

  const apiLimiter = rateLimit({
  store: new MongoStore({
     uri: config.MongoDbServer,
     collectionName: "rate-limits",
     expireTimeMs:  60 * 60 * 1000, // 1 hour window
     resetExpireDateOnChange: true
     }),
       windowMs: 60 * 60 * 1000, // 1 hour window
       max: 4,
       message:
   ({ error: true, message:  "Too many requests, you have been rate limited. Please try again in one hour." })
   });


  //init our auth
  passport.use(
    new Strategy(
      {
        clientID: config.id,
        clientSecret: config.clientSecret,
        callbackURL: `${config.domain}/callback`,
        scope: ["identify", "guilds"],
      },
      (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => done(null, profile));
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));

  app.use(
    session({
      store: new MemoryStore({ checkPeriod: 86400000 }),
      secret:
        "#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use("/api", apiLimiter);
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cors());

  //setting the app settings
  app.set("view engine", "ejs");
  app.set("client", client);
  app.set("serverClient", serverClient);
  app.set("views", "./src/views");
  app.disable("x-powered-by");
  app.disable("server");
  const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
  };

  //authentication endpoints
  app.get(
    "/login",
    (req, res, next) => {
      req.session.backURL = req.get("Referer");
      res.cookie("referer", req.get("Referer"));
      if (req.session.backURL) {
        req.session.backURL = req.session.backURL;
      } else if (req.get("Referrer")) {
        const parsed = url.parse(req.get("Referrer"));
        if (parsed.hostname === app.locals.domain) {
          req.session.backURL = parsed.path;
        }
      } else {
        req.session.backURL = "/";
      }
      next();
    },
    passport.authenticate("discord")
  );

  app.get("/arc-sw.js", function (req, res) {
    res.type("application/javascript");
    res.send(
      '!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=100)}({100:function(e,t,r){"use strict";r.r(t);var n=r(3);if("undefined"!=typeof ServiceWorkerGlobalScope){var o="https://arc.io"+n.k;importScripts(o)}else if("undefined"!=typeof SharedWorkerGlobalScope){var c="https://arc.io"+n.i;importScripts(c)}else if("undefined"!=typeof DedicatedWorkerGlobalScope){var i="https://arc.io"+n.b;importScripts(i)}},3:function(e,t,r){"use strict";r.d(t,"a",function(){return n}),r.d(t,"f",function(){return c}),r.d(t,"j",function(){return i}),r.d(t,"i",function(){return a}),r.d(t,"b",function(){return d}),r.d(t,"k",function(){return f}),r.d(t,"c",function(){return p}),r.d(t,"d",function(){return s}),r.d(t,"e",function(){return l}),r.d(t,"g",function(){return m}),r.d(t,"h",function(){return v});var n={images:["bmp","jpeg","jpg","ttf","pict","svg","webp","eps","svgz","gif","png","ico","tif","tiff","bpg"],video:["mp4","3gp","webm","mkv","flv","f4v","f4p","f4bogv","drc","avi","mov","qt","wmv","amv","mpg","mp2","mpeg","mpe","m2v","m4v","3g2","gifv","mpv"],audio:["mid","midi","aac","aiff","flac","m4a","m4p","mp3","ogg","oga","mogg","opus","ra","rm","wav","webm","f4a","pat"],documents:["pdf","ps","doc","docx","ppt","pptx","xls","otf","xlsx"],other:["swf"]},o="arc:",c={COMLINK_INIT:"".concat(o,"comlink:init"),NODE_ID:"".concat(o,":nodeId"),CDN_CONFIG:"".concat(o,"cdn:config"),P2P_CLIENT_READY:"".concat(o,"cdn:ready"),STORED_FIDS:"".concat(o,"cdn:storedFids"),SW_HEALTH_CHECK:"".concat(o,"cdn:healthCheck"),WIDGET_CONFIG:"".concat(o,"widget:config"),WIDGET_INIT:"".concat(o,"widget:init"),WIDGET_UI_LOAD:"".concat(o,"widget:load"),BROKER_LOAD:"".concat(o,"broker:load"),RENDER_FILE:"".concat(o,"inlay:renderFile"),FILE_RENDERED:"".concat(o,"inlay:fileRendered")},i="serviceWorker",a="/".concat("shared-worker",".js"),d="/".concat("dedicated-worker",".js"),f="/".concat("arc-sw-core",".js"),u="".concat("arc-sw",".js"),p=("/".concat(u),"/".concat("arc-sw"),"arc-db"),s="key-val-store",l=2**17,m="".concat("https://overmind.arc.io","/api/propertySession"),v="".concat("https://warden.arc.io","/mailbox/propertySession")}});'
    );
  });

  app.get(
    "/callback",
    passport.authenticate("discord", { failureRedirect: "/" }),
    (req, res) => {
      if (req.cookies) {
        const url = req.headers.referrer;
        req.session.backURL = null;
        res.redirect(req.cookies.referer);
      } else {
        res.redirect("/");
      }
    }
  );

  app.get("/logout", function (req, res) {
    // We destroy the session.
    req.session.destroy(() => {
      // We logout the user.
      req.logout();
      // We redirect user to index.
      res.redirect("/");
    });
  });

  app.use("/", express.static("./src/static"));
  app.use(bodyParser());
  app.use("/", routing);
  app.use(express.static(__dirname + "/public"));
  app.use(cookieParser());

  client.login(config.Token);
  serverClient.login(config.ServerToken);
  app.listen(config.port);

  app.use(function (req, res) {
    let data = {
      user: req.data,
      wallet: req.session,
    };
    res.render("error/404", data);
  });

  app.use(function (error, req, res, next) {
    res.send("500: Internal Server Error", 500);
    console.log(error);
  });
})();
