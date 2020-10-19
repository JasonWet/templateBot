const Discord = require('discord.js');

const client = new Discord.Client({
    disableEveryone: true
});

client.commands = new Discord.Collection();

module.exports = { client: client };
require('./handlers')(client);