const { readdirSync } = require ("fs")
const { join } = require ("path")
const filePath2 = join(__dirname, "..", "events");
const eventFiles2 = readdirSync(filePath2);
const BotrixLogs = console.log;

module.exports = (client) => {
    client.user.setPresence({ activity: { name: 'https://botrix.cc/servers', type: "WATCHING" }, status: 'idle' })
}
