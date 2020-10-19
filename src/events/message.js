const { client } = require('../index');
const config = require('../config.json');

client.on('message', async (message) => {
//<==><==><==><==><==><==><==><==><==><==><==><==>COMMAND<==><==><==><==><==><==><==><==><==><==><==><==><==>
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
//===================================================
    const prefixes = ['.', `<@${client.user.id}>`]
    let prefix = false;
    for(const thisPrefix of prefixes)
        if(message.content.startsWith(thisPrefix)) prefix = thisPrefix;
//===================================================
    let argument = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = argument.shift().toLowerCase()

    let command
    if (client.commands.has(cmd))
        command = client.commands.get(cmd)
//===================================================
    message.content = message.content.toLowerCase()
    if (!message.content.startsWith(prefix))
        return;
//===================================================
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