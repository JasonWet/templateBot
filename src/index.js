const fs = require('fs');
const Discord = require('discord.js');
const { connect } = require('mongoose');
//Get the prefix and token from the conf.json
const { token } = require('./conf.json');
//Get the GuildModel from the models directory
const GuildModel = require('./models/Guild');
//Register the client and include partials for reactions
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER']});
client.commands = new Discord.Collection();
//Find the command files
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
//Read the command files and fetch the command name
for (const file of commandFiles) {
   const command = require(`./commands/${file}`);
   client.commands.set(command.name, command);
}
//Used Database Variables
let id;
let prefix;
//client on ready event (when the bot starts)
client.once('ready', () => {
   //Log to console that the bot is ready
   console.log(`${client.user.username} is now ready!`);
   (async () => {
      try {
         const req = await GuildModel.findOne({id: client.guilds.cache.map(guild => guild.id)});
         id = req.id;
         prefix = req.prefix;
      } catch (e) {
         console.log(e.stack)
      }
   })();
});
//Guild Create Event (When the bot joins a guild it logs the guild into the database)
client.on('guildCreate',  async guild => {
   try {
      const doc = new GuildModel({ id: guild.id });
      //Log the guild into the database (save)
      await doc.save();
      //Tell console a guild has been created
      console.log(`Guild Created (${guild.id})`)
   } catch (e) {
      console.log(e.stack)
   }
});
//Message Listener
client.on('message', message => {
   //If a message does not start with the prefix don't run it as a command
   if (!message.content.startsWith(prefix) || message.author.bot) return;
   //Set the command prefix
   const args = message.content.slice(prefix.length).split(/ +/);
   const commandName = args.shift().toLowerCase();

   //Gets the commands by the name within the commands file
   const command = client.commands.get(commandName)
      || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
   //If it has the prefix but is not a command, return it and not run a command
   if (!command) return;

   //Try to execute the command, if it doesn't work send the error message
   try {
      command.execute(message, args);
      console.log(`${message.author.username} ran the command ${botPrefix}${commandName}`)
   } catch (error) {
      console.error(error);
      //Sent when a command does not work and sends the error to the console
      message.reply('there was an error trying to execute that command!');
   }
});

//Message Reaction Add Event (When a user adds a reaction to a message)
client.on('messageReactionAdd', async (reaction, user) => {

});
//Guild Member Add Event (When a user joins a guild)
client.on(`guildMemberAdd`, async member => {

});
//Guild Member Leave Event (When a user leaves a guild)
client.on(`guildMemberRemove`, async member => {

});
//Connections + Logins
(async () => {
   //Connect to the MongoDB
   await connect('Database URL', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
   });
   //Login to the bot with the token
   return client.login(token);
})();