const fs = require('fs');
const {client} = require('./index');

module.exports = async () => {
    /*
        Command Handler
     */
    console.log(`=> Commands:`)
    fs.readdirSync(`./commands/`).forEach(dir => {
        let commands = fs.readdirSync(`./commands/${dir}/`).filter(f => f.endsWith(".js"));
        if(commands.length <= 0) return console.log(`No commands found in ${dir}`)
        else console.log(`Loading ${commands.length} command from the directory ${dir}`)

        commands.forEach((f) => {
            let cmd = require(`./commands/${dir}/${f}`);
            client.commands.set(cmd.config.command, cmd);
            if (cmd.config.aliases) {
                cmd.config.aliases.forEach(async function() {
                    client.commands.set(cmd.config.command, cmd);
                })
            }
        })
    });
    /*
        Event Handler
     */
    console.log(`=> Events:`)
    fs.readdir("./events/", (err, files) => {
        if (err) console.error(err);
        let events = files.filter(f => f.split(".").pop() === "js");
        if(events.length <= 0) console.log(`No events found!`)
        console.log(`Loading ${events.length} events`)
        events.forEach((f, i) => {
            require(`./events/${f}`)
        });
    });
};