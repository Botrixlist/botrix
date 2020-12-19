const bots = require('../../models/bots');
const user = require('../../models/user');

async function recomendBasedOnUser(uersID){
    return new Promise(async function (resolve, reject)  {

        let user_ = await user.findOne({ userid: uersID.id });
        let bot = await bots.find({ });
        
        if(!user_ || user_.recentViews.length == 0) resolve(bot[Math.floor((Math.random() * bot.length) + 1)]);
    
        let tagDict = new Object();
        tagDict.data = {};
    
        bot.forEach(bot_ => {
            if(bot_.inRecomendationQueue == false) return;
            bot_.botTags.forEach(tag => {
                console.log(tag);
                if(!tagDict.data[tag.toLowerCase()]){
                    tagDict.data[tag.toLowerCase()] = {
                        key: 0,
                        name: tag,
                        botidToGetRecomended: bot_.botid
                    }
                }
            });
        });
    
        user_.recentViews.forEach(viewedBot => {
            viewedBot.botTags.forEach(viewedBotTag => {
                let tagIndex = tagDict.data[viewedBotTag.toLowerCase].key += 1;
    
                tagDict.data[viewedBotTag.toLowerCase].key = tagIndex;
            });
        });
        
        
    
        resolve(tagDict);
    })
    
}

module.exports = recomendBasedOnUser;
