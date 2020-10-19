const { client } = require('../index');
const config = require('../config.json');
const { connect } = require('mongoose');

(async () => {
    //Connect to the MongoDB
    await connect(config.databaseURL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    //Login to the bot with the token
    return client.login(config.token);
})();

client.on('ready', async () => {

    client.user.setPresence({
        status: 'idle',
        activity: {
            name: 'Everything',
            type: 'WATCHING'
        }
    })
    console.log(`${client.user.username} is now READY!`)
});