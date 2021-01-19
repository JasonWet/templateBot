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

// Commands and Aliases placed in a collection
client.commands = new Enmap();
client.aliases = new Enmap();

const init = async () => {

    /*
    * LOADING EVENT & COMMANDS
    *
    * COMMANDS - Loads our commands and aliases into memory for use all around while the bot is running
    * EVENTS - Loads our events such as our ready event
    *
    */
    // COMMANDS
    // Find each sub directory within the commands directory
    await fs.readdirSync("./commands/").forEach(dir => {
        const cmdFiles = fs.readdirSync(`./commands/${dir}/`)
        client.logger.log(`Loading a total of ${cmdFiles.length} commands from the directory ${dir}`);
        cmdFiles.forEach(f => {
            // Find and sort all command files within the sub directories
            if (!f.endsWith(".js")) return;
            if(cmdFiles.length <= 0) return client.logger.log(`No commands found in ${dir}`)
            try {
                client.logger.log(`Loading Command: ${f}`);
                const props = require(`./commands/${dir}/${f}`);
                if (props.init) {
                    props.init(client);
                }
                // Set the command names & aliases based off of the information provided in the command files
                client.commands.set(props.help.name, props);
                props.conf.aliases.forEach(alias => {
                    client.aliases.set(alias, props.help.name);
                });
                return false;
                // Catch if the command is not able to be loaded
            } catch (e) {
                return `Unable to load command ${f}: ${e}`;
            }
        });
    });
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