const Discord = module.require('discord.js');

module.exports.run = (client, message, args) => {
    message.channel.send('Test')
}

module.exports.config = {
    command: 'test',
    aliases: []
}