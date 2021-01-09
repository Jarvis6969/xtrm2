const discord = require("discord.js");

module.exports = {

  name: "support",

  category: "info",
  
  usage: "support",

  description: "Get the invite link of the bot's support server",

  run: async (client, message, args) => { 

  

    let embed = new discord.MessageEmbed()

    .setTitle('YOU CAN JOIN SUPPORT SERVER OF THIS BOT BY THE LINK BELOW')

    .setDescription(`[JOIN SUPPORT SERVER ](https://discord.gg/fNw6ahd)`)

    .setColor("RANDOM")

    .setFooter(`Bot developed by Mayank#9471`)

    .setTimestamp(message.timestamp = Date.now())

    

    message.channel.send(embed)

    

    

  }

}