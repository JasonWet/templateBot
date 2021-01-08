module.exports = async client => {
    // Log that the bot is now online
    client.logger.log(`${client.user.tag} is now ready. Serving ${client.users.cache.size} user(s) in ${client.guilds.cache.size} guild(s)`, "ready")

    // Set the bots activity
    client.user.setActivity(`Built with TemplateBot`, {type: "CUSTOM_STATUS"})
}