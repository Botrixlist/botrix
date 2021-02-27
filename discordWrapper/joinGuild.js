const unirest = require("unirest");



function checkUser(token, userid, guildId){
    return new Promise(async function(resolve, reject) {
        await unirest
        .get(`/guilds/${guildId}/members/${userid}`)
        .headers({
            Authorization: `Bearer ${token}`,
        })
        .end(function (user) {
            resolve(user);
        });
    });
}

module.exports = checkUser;