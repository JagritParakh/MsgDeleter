const config = require('./config.json')
const {Client, GatewayIntentBits} = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
})
let variableWhichICantName = false

client.on('messageCreate', message => {
    if(message.content === `${config.prefix} on`){
        if(variableWhichICantName === true){
          message.reply("Command is already running")
        }else{
          variableWhichICantName = true
        message.reply("Ok I pull up 😤")
        console.log("Status:", variableWhichICantName)
        }
    }else if (message.content === `${config.prefix} off` && message.author.username !== config.username){
        if(variableWhichICantName === false){
          message.reply("Command is not running")
        }else{
        variableWhichICantName = false
        message.reply("But I wanna pull up 😢 ||its off dw||")
        console.log("Status:", variableWhichICantName)
        }
    }

    if(variableWhichICantName === true){
        if(message.author.username === config.username || !message.author.id === config.user_id){
            message.delete()
            console.log(`${message.author.username} is messaging again`)
        }
    }
  if(message.content === `<@${config.bot_id}>`){
    message.reply("My prefix is `" + config.prefix + "`")
    message.channel.send("Do `" + config.prefix + " help` to get a list of cmds")
    }
  if(message.content === `${config.prefix} help`){
    message.channel.send("Do `" + config.prefix + " on` to **start deleting the messages** \n Do `"+ config.prefix + " off` to **stop the on-going command** \n Do `" + config.prefix + " status` to **see whether command is running or not**")
    }
  if(message.content === `${config.prefix} status`){
    if(variableWhichICantName === true){
        message.reply("Bot is **working**")
    }else if(variableWhichICantName === false){
        message.reply("Bot is **not working**")
    }
    }
    });
client.on('ready', async() => {
    console.log("Client has logged in!")
    client.user.setActivity("Delete them messages 😩", {
  type: "WATCHING"
});
})
client.login(config.token)

//let cmd = (message.content.split(" ").slice(1).join(" ")).toLowerCase()