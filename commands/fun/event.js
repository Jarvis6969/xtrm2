const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "event",
  description: "Flip A Coin!",
  usage: "Coinflip",
  run: async (client, message, args) => {
    //Start
    message.delete();
    const coins = [" Heal to Death \n\n**RULES**\n  Take Poco and play A normal match, You need to kill anyone. Teaming Permanently prohibited, if found teaming, You shall be banned. Gadget and super are allowed. Any Star Power is allowed.",
                   "Sharpshooter Event", "Knockback brawl", "Melee brawl", "Roll and Roll", "Unexpected gift","V-aim event", "Hide and seek"];

    let result = Math.floor(Math.random() * coins.length);

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`Event For Xtrm Family`)
      .addField(`**Map**` , coins[result])
      .addField(`**Mode**` , `Showdown`)
      .setFooter(`Command used by ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};