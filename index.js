// Loads the discord.js library
const Discord = require("discord.js");
// Loads other used things in this file
const fs = require("fs");
const Enmap = require("enmap");
const config = require('./config.json')
// This is your client. Some people call it `bot`
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER']});

// Require the Logger
client.logger = require("./modules/Logger");

// Require and load useful functions used throughout the code
require("./modules/functions.js")(client);

client.aliases = new Enmap();

const init = async () => {
    // EVENTS
    const evtFiles = await fs.readdirSync("./events/");
    client.logger.log(`Loading a total of ${evtFiles.length} events.`);
    // Find each event file
    evtFiles.forEach(file => {
        const eventName = file.split(".")[0];
        client.logger.log(`Loading Event: ${eventName}`);
        const event = require(`./events/${file}`);
        // Bind the client to any event, before the existing arguments
        client.on(eventName, event.bind(null, client));
    });

    // Login to the client using our private token from https://discord.com/developers/applications
    client.login(config.token);
};

init();