const prefix = require('../config.json').prefix
module.exports = async (client, message) => {
    // This ignore other bots that send a message so that there is no interference or command loops
    if (message.author.bot) return;

    //Checks if the bot has been mentioned. If the bot is mentioned it outputs the prefix
    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
        return message.reply(`My prefix is \`${prefix}\``);
    }

    // This ignore messages that do not start with our prefix so that it doesn't attempt to go through all the command steps when it should know it is not a command
    if (message.content.indexOf(prefix) !== 0) return;


    // Here is where we seperate our command and arguements
    // e.g. if we have the message "+say Hello World" , we get the following...
    // command = say
    // args = ["Hello", "World"]
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Check whether the command, or alias, exist in the collections defined
    if (client.commands.has(command)) {
        const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

        // Log that the command has been used
        client.logger.log(cmd)

        // Check if the command is able to be run in a DM Channel
        if (!message.guild && cmd.conf.guildOnly === true) return message.channel.send("This command can only be run in a guild.");

        try {
            cmd.run(client, message, args)
            client.logger.cmd(`[CMD] ${message.author.username} (${message.author.id}) ran command ${cmd}`);
        } catch(err) {
            // Catches the error and replies saying that it is not a command
            if (command === undefined) {
                message.delete().catch()
                message.channel.send('That is not a command').then(message => message.delete({timeout: 5000}), msg => msg.delete({timeout: 5000}))
            } else
                client.logger.error(err, "error")
        }
    }
};