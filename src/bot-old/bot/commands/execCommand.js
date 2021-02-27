const { exec } = require("child_process");
const config = require("../../../config.json");

module.exports.run = async (client, message, args) => {
  if (!config.OWNER_USERS.includes(message.author.id))
    return message.channel.send("Sorry, but you are not an admin of botrix.");

  if (!args.length)
    return message.channel.send("You must provide something to execute.");

  exec(args.join(" "), (error, stdout) => {
    const response = stdout || error;
    message.channel.send(response, { split: true, code: true });
  });
};

module.exports.help = {
  name: 'exec',
  category: 'Developer/mods',
  aliases: [],
  description: 'eval you retard',
  example: 'tf do you need an example for >.<'
}

module.exports.requirements = {
  userPerms: [],
  clientPerms: ['EMBED_LINKS'],
  approverOnly: false
}
