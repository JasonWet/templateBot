const { client } = require('../index');
const conf = require('../conf.json');
const GuildModel = require('../models/Guild')

client.on('guildCreate', async (guild) => {
    try {
        const doc = new GuildModel({ id: guild.id });
        await doc.save();

        console.log(`Guild Created: ${guild.name} (${guild.id})`)
    } catch (e) {
        console.log(e.stack)
    }
});