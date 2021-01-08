// Loads the discord.js library
const Discord = require("discord.js");
// Loads other used things in this file
const { promisify } = require("util");
const fs = require("fs");
const Enmap = require("enmap");
const config = require('./config.json')
// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`,
// or `bot.something`, this is what we're referring to. Your client.
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER']});

// Require our logger
client.logger = require("./modules/Logger");

// Let's start by getting some useful functions that we'll use throughout
// the bot, like logs and elevation features.
require("./modules/functions.js")(client);

// Aliases and commands are put in collections where they can be read from,
// catalogued, listed, etc.
client.commands = new Enmap();
client.aliases = new Enmap();

const init = async () => {

    // Here we load **commands** into memory, as a collection, so they're accessible
    // here and everywhere else.
    await fs.readdirSync("./commands/").forEach(dir => {
        const cmdFiles = fs.readdirSync(`./commands/${dir}/`)
        client.logger.log(`Loading a total of ${cmdFiles.length} commands from the directory ${dir}`);
        cmdFiles.forEach(f => {
            if (!f.endsWith(".js")) return;
            if(cmdFiles.length <= 0) return client.logger.log(`No commands found in ${dir}`)
            try {
                client.logger.log(`Loading Command: ${f}`);
                const props = require(`./commands/${dir}/${f}`);
                if (props.init) {
                    props.init(client);
                }
                client.commands.set(props.help.name, props);
                props.conf.aliases.forEach(alias => {
                    client.aliases.set(alias, props.help.name);
                });
                return false;
            } catch (e) {
                return `Unable to load command ${f}: ${e}`;
            }
        });
    });
    // Then we load events, which will include our message and ready event.
    const evtFiles = await fs.readdirSync("./events/");
    client.logger.log(`Loading a total of ${evtFiles.length} events.`);
    evtFiles.forEach(file => {
        const eventName = file.split(".")[0];
        client.logger.log(`Loading Event: ${eventName}`);
        const event = require(`./events/${file}`);
        // Bind the client to any event, before the existing arguments
        // provided by the discord.js event.
        // This line is awesome by the way. Just sayin'.
        client.on(eventName, event.bind(null, client));
    });

    // Here we login the client.
    client.login(config.token);

// End top-level async/await function.
};

init();