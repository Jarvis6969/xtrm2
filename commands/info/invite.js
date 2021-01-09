const discord = require("discord.js");

module.exports = {

  name: "invite",

  category: "info",
  
  usage: "invite",

  description: "Get the invite link of the bot",

  run: async (client, message, args) => { 

  

    let embed = new discord.MessageEmbed()

    .setTitle('YOU CAN INVITE THIS BOT TO YOUR SERVER FROM BELOW LINK')

    .setDescription(`[INVITE ](https://discord.com/api/oauth2/authorize?client_id=784375846252707851&permissions=2147483639&scope=bot)`)

    .setColor("RANDOM")

    .setFooter(`Bot developed by Mayank#9471`)

    .setTimestamp(message.timestamp = Date.now())

    

    message.channel.send(embed)

    

    

  }

}