exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
    message.channel.send("Template created by JasonWet (JasonWet#9999) - https://github.com/jasonwet")
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
};

exports.help = {
    name: "credits",
    category: "Miscelaneous",
    description: "Template Credits Command",
    usage: "credits"
};