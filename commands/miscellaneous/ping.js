exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
    const msg = await message.channel.send("Ping?");
    msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
};

exports.help = {
    name: "ping",
    category: "Miscellaneous",
    description: "Displays your latency",
    usage: "ping"
};