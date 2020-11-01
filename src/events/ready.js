const { client } = require('../index');
const conf = require('../conf.json');

(async () => {
    //Login to the bot with the token
    return client.login(conf.token);
})();

client.on('ready', async () => {

    client.user.setPresence({
        status: 'idle',
        activity: {
            name: `${conf.activityMessage}`,
            type: 'WATCHING'
        }
    })
    console.log(`${client.user.username} is now ready!`)
});