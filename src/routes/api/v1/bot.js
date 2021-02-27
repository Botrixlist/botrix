const {
    Router
} = require("express");
const Bots = require("../../../models/bots");
const route = Router();

route.get("/:id", async (req, res, next) => {

    res.setHeader('Content-Type', 'application/json');


    let bot = await Bots.findOne({
        botid: req.params.id
    })

    if (!bot) return res.end(JSON.stringify({
        bot: "bot id not found"
    }));
  
    let data = {
        tags: bot.botTags,
	certified: bot.certified,
	votes: bot.votes,
        usersVoted: bot.usersVoted,
	state: bot.state,
	owners: bot.owners,
	servers: bot.servers,
	shards: bot.shards,
	users: bot.users,
	views: bot.views,
	nsfw: bot.nsfw,
	bannerURL: bot.bannerURL,
	badges: bot.badges,
	id: bot.botid,
	prefix: bot.prefix,
	description: bot.description,
	logo: bot.logo,
	username: bot.username,
	library: bot.botLibrary,
	invite: bot.invite,
	longDescription: bot.long,
	website: bot.website,
	supportURL: bot.support,
	addedAt: bot.addedAt
    }


    res.end(JSON.stringify(data));

});


route.post("/:id", async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.body.servers) {
        try {
            let bot = await Bots.findOne({
                botid: req.params.id
            })
            await bot.updateOne({
                servers: req.body.servers
            });
        } catch (e) {
            return res.json({error: true, message: "Not Posted"});
        }
    }

    if (req.body.shards) {
        try {
            let bot = await Bots.findOne({
                botid: req.params.id
            })
            await bot.updateOne({
                shards: req.body.shards
            });
        } catch (e) {
            return res.json({error: true, message: "Not Posted"});
        }
    }

    if (req.body.users) {
        try {
            let bot = await Bots.findOne({
                botid: req.params.id
            })
            await bot.updateOne({
                users: req.body.users
            });
	} catch (e) {
            return res.json({error: true, message: "Not Posted"});
        }
    }

	const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
             console.log(`_______________`)
             console.log(`${ip} has updated stats for ${req.params.id} (` + req.app.get("client").users.cache.get(req.params.id).username + ")" );
             console.log(`POST: ${req.body.servers} servers, ${req.body.users} users, ${req.body.shards} shards.`);
             console.log(`______________`)
    	return res.json({error: false, message: "Successfully Posted"});

});

module.exports = route;
