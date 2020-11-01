const Discord = module.require('discord.js');
const conf = require('../../conf.json')

module.exports.run = (client, message, args) => {
    message.channel.send('TEST')
}

module.exports.config = {
    command: 'test',
    aliases: []
}