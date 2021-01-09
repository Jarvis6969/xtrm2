const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "msay",
  aliases: ["bc", "broadcast"],
  description: "Says your input via the bot",
  category: "utility",
  usage: "<input>",
  run: (client, message, args) => {
    message.delete();

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message
        .reply("You don't have the required permissions to use this command.")
        .then(m => m.delete(5000));
    
 setInterval(function() {
      if (args.length < 0)
        return message.reply("Nothing to say?").then(m => m.delete(5000));

      const roleColor = message.guild.me.roles.highest.hexColor;

      if (args[0].toLowerCase() === "embed") {
        const embed = new MessageEmbed()
          .setDescription(args.slice(1).join(" "))
          .setColor(roleColor === "#000000" ? "#ffffff" : roleColor);

        message.channel.send(embed);
      } else {
        message.channel.send(args.join(" "));
      }
    }, 10000);
    if (message.content === "mstop"){
      clearInterval();
    }
 
 
  }
}