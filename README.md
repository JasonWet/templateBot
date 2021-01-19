# templateBot

A Discord.js Bot Template

templateBot containes 2 production ready branches. The master branch which is the base template and the database branch which uses MongoDB.

### Requirements

- `git` command line ([Linux](https://git-scm.com/download/linux)/[Mac](https://git-scm.com/download/mac)/[Windows](https://git-scm.com/download/win))
- `node.js` [v12.x+](https://nodejs.org/en/)

### Getting Started

1. Make sure you have the requirements listed above downloaded and installed.
2. Navigate to the [Discord Developer](https://discord.com/developers/) website and login.
3. Navigate to the [applications](https://discord.com/developers/applications) page and click **New Application** at the top right of the page.
4. Name your new applications and then click **create**.
5. Navigate to the **Bot** tab on the left side navigation bar.
6. Click **Add Bot** then click **Yes, do it**.

###### Bot Token
- Once you have created your Bot Application and are on the Bot page within your application your will see an area saying **TOKEN**. Your token is the key that will be used to login to your discord bot within the application. You will need this later for the initial setup so keep in mind where it is located.

###### Privileged Gateway Intents
- Privileged Gateway Intents are what they say they are on the page. There are currently at the creation of these documents 2 intents. Presence Intent and Server Members Intent. If you are going to be adding anything to your bot that requires access to one of these intents you will have to enable it on this page.

###### Invite Link
- To invite your bot application to your server you will need to use an invite link such as **https://discordapp.com/oauth2/authorize?client_id=123456789&scope=bot&permissions=8**. There are different persmission levels you can give your bot. You can either invite your bot with a set permission level which will create a new role for the bot as some public bots do or you can invite the bot with no permission level which will require you to manually provide the bot with a role with the set permissions you want to give it. 

- To get your invite link you will take the following link, **https://discordapp.com/oauth2/authorize?client_id=123456789&scope=bot**, and use this to get the bot into your server. That is not all though. You need to define what bot application to invite when you use this link. To do that you will need to navigate to the **General Information** tab within your Bot Application and copy the **Client ID**. Once you have copied that you will need to replace the section that is labeled **CLIENT_ID_HERE** with the numbers you have just copied. https://discordapp.com/oauth2/authorize?client_id=CLIENT_ID_HERE&scope=bot Once you have done that you can use that link and invite your Bot Aplication to your server.

### Installation/Setup

Using command prompt/terminal, navigate to your project directory and run the following.

`git clone ...`

Once you have done that and it has finished downloading...

- You are going to need to navigate into the directory that was just created when you cloned the repo. Once you have navigated to the new directory you will need to run `npm install`

###### Defining the Bot Token
- Now that you have everything installed you need to define the token within the code. To do that you need to navigate to the **config.json** REMINDER: ALWAYS KEEP YOUR TOKEN PRIVATE. Once you have opened the **config.json** you will need to copy the TOKEN that was mentioned earlier found in the Bot Section of the Bot Application and paste it in the section of the file that says the following
```js 
"token": "TOKEN_GOES_HERE",
```

###### Starting the Bot
- Now that you have everything setup lets start the bot for the first time! Lets go back to command prompt/terminal and run `npm run start`. Once you have run that command let it load and then DONE your bot is started and running.

#### Issues...

If you come across any issues please open an issue on this repo or DM me on Discord @ **JasonWet#9999** or you can join my discord server @ **discord.gg/ndSEuKR**


### Useful Notes

###### Logger
- In this template we use a custom logger that is brought over from the AnIdiotsGuide guideBot. This logger is used to format all logs in the nicest and most useful way possible making it easy to read and understand. 
- Using the logger is simple. Instead of using ```js Console.log("Log")``` we use ```js client.logger.log("Log")```
###### Functions
- In this template we use a functions modules that allows us to create commonly used functions in a single place and allow them to be useable across all of our code. This is helpful to lower the clutter when it comes to reused code. For Exmaple if you are using trying to await a response you can use the function which would allow you to remove a large chunk of code from each step that requires you to await a response.