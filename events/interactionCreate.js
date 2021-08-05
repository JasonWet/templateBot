module.exports = async (client, interaction) => {
    if (!interaction.isCommand()) return;
  
    try {
      client.interactions.get(interaction.commandName)?.execute(interaction);
    } catch (err) {
      console.error(err);
    }
  };