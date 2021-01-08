exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
    message.channel.send("This is a Template Command")
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
};

exports.help = {
    name: "template",
    category: "Miscelaneous",
    description: "Command Template",
    usage: "template"
};