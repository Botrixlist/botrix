const { readdirSync } = require ('fs')
const { join } = require ('path')
const filePath = join(__dirname, '..', 'bot', 'commands');

module.exports.run = (client) => {
    for (const cmd of readdirSync(filePath).filter(cmd => cmd.endsWith('.js'))) {
        const prop = require (`${filePath}/${cmd}`);
        client.commands.set(prop.help.name, prop);

        if (prop.help.aliases) for (const alias of prop.help.aliases) {
            client.aliases.set(alias, prop);
        }
    }
}