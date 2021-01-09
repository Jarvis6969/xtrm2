const discord = require("discord.js");

module.exports = {
  name: "addrole",
  usage: "<target user,s @> <the role name>",
  category: "moderation",
  run: async (client, message, args) => {
    
     if (!message.guild.me.hasPermission("ADMINISTRATOR"))
      return message.channel.send("I don't have enough permission to do that !");

    if (!message.member.hasPermission("MANAGE_ROLES" || "ADMINISTRATOR"))
      return message.channel.send("You don't have permissions for that!");
    
    const target = message.mentions.users.first();

    if (!target) {
      message.reply("please specify the user");
      return;
    }

    args.shift();

    const roleName = args.join(" ");
    const { guild } = message;

    const role = guild.roles.cache.find(role => {
      return role.name === roleName;
    });
    if (!role) {
      message.reply("please specify the role");
      return;
    }
    if (!role) {
      message.reply("there is no role with the name ${roleName}");
      return;
    }

    const member = guild.members.cache.get(target.id);
    member.roles.add(role);

    message.reply(`"${roleName}" role has been added to the user`);
  }
};
