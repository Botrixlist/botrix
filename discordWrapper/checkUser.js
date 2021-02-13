const unirest = require("unirest");



function checkUser(token, userid){
    return new Promise(async function(resolve, reject) {
        await unirest
        .get(`https://discord.com/api/users/${userid}`)
        .headers({
            Authorization: `Bot ${token}`,
        })
        .end(function (user) {
            resolve(user);
            console.log("owo");
        });
    });
}

module.exports = { checkUser};