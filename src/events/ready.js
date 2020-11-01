const { client } = require('../index');
const conf = require('../conf.json');
const { connect } = require('mongoose');

(async () => {
    //Connect to the MongoDB
    await connect(config.databaseURI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
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