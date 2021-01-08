module.exports = (client) => {
    /*
SINGLE-LINE AWAIT MESSAGE
Grabs a single reply from the user that initiated the commands.
USAGE
const response = await client.awaitReply(msg, "Favourite Color?");
msg.reply(`Oh, I really love ${response} too!`);
*/
    client.awaitReply = async (msg, question, limit = 60000) => {
        const filter = m => m.author.id === msg.author.id;
        await msg.channel.send(question);
        try {
            const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
            return collected.first().content;
        } catch (e) {
            return false;
        }
    };
// Loads commands once the file is resolved

client.loadCommand = (commandName, dir) => {
    try {
        client.logger.log(`Loading Command: ${commandName}`);
        const props = require(`./../commands/${dir}/${commandName}`);
        if (props.init) {
            props.init(client);
        }
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
        return false;
    } catch (e) {
        return `Unable to load command ${commandName}: ${e}`;
    }
};

// <Array>.random() returns a single random element from an array
// [1, 2, 3, 4, 5].random() can return 1, 2, 3, 4 or 5.
    Object.defineProperty(Array.prototype, "random", {
        value: function() {
            return this[Math.floor(Math.random() * this.length)];
        }
    });

    // <String>.toPropercase() returns a proper-cased string such as:
    // "Mary had a little lamb".toProperCase() returns "Mary Had A Little Lamb"
    Object.defineProperty(String.prototype, "toProperCase", {
        value: function() {
            return this.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        }
    });

// These 2 process methods will catch exceptions and give *more details* about the error and stack trace.
    process.on("uncaughtException", (err) => {
        const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
        client.logger.error(`Uncaught Exception: ${errorMsg}`);
        console.error(err);
        // Always best practice to let the code crash on uncaught exceptions.
        // Because you should be catching them anyway.
        process.exit(1);
    });

    process.on("unhandledRejection", err => {
        client.logger.error(`Unhandled rejection: ${err}`);
        console.error(err);
    });

}