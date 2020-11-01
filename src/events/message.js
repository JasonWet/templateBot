const { client } = require('../index');
const conf = require('../conf.json');

client.on('message', async (message) => {
    /*
        Other Message Events
     */

        //GO HERE

    /*
        Execute Command
     */
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);

    const prefixes = [`${conf.prefix}`, `<@${client.user.id}>`]
    let prefix = false;
    for(const thisPrefix of prefixes)
        if(message.content.startsWith(thisPrefix)) prefix = thisPrefix;

    let argument = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = argument.shift().toLowerCase()

    let command
    if (client.commands.has(cmd))
        command = client.commands.get(cmd)

    if (message.content.startsWith(prefix)) {
        message.content = message.content.toLowerCase()
    }
    if (!message.content.startsWith(prefix))
        return;

    try {
        command.run(client, message, args, prefix)
    } catch(err) {
        if (command == undefined) {
            message.delete().catch()
            message.channel.send('That is not a command').then(message => message.delete({timeout: 5000}), msg => msg.delete({timeout: 5000}))
        } else
            console.error(err)
    }
});