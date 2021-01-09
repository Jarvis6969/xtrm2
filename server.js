const { token, default_prefix } = require("./config.json")
const { badwords } = require("./data.json");
const { config } = require("dotenv");
const { attachment } = require("discord.js");
const discord = require("discord.js");
const fs = require("fs");
const client = new discord.Client({
  disableEveryone: true
});
const db = require("quick.db");
client.commands = new discord.Collection();
client.aliases = new discord.Collection();

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.snipes = new Map();
client.on("messageDelete", function(message, channel) {
  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author.tag,
    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : null
  });
});
const activities_list = [
  "hello",
  "hi",
  "developed by mayank"
  ];

client.on("ready", () => {
  
  client.user.setPresence({
   activity: { 
            name: `hello`,
            type: "PLAYING",
        }, 
    status: "idle"
  });
  console.log(`${client.user.username} is up and running!`);
});
function is_url(str) {
  let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (regexp.test(str)) {
    return true;
  } else {
    return false;
  }
}

client.on("message", async message => {
  if (message.author.bot) return;

  if (!message.member.hasPermission("ADMINISTRATOR")) {
    if (is_url(message.content) === true) {
      message.delete();
      return message.channel.send("You can not send link here :/");
    }

    let confirm = false;

    var i;
    for (i = 0; i < badwords.length; i++) {
      if (message.content.toLowerCase().includes(badwords[i].toLowerCase()))
        confirm = true;
    }

    if (confirm) {
      message.delete();
      return message.channel.send("You are not allowed to send badwords here");
    }
  }

  if (!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = default_prefix;

  if (!message.content.startsWith(prefix)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let cmdx = db.get(`cmd_${message.guild.id}`);

  if (cmdx) {
    let cmdy = cmdx.find(x => x.name === cmd);
    if (cmdy) message.channel.send(cmdy.responce);
  }

  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));
  
    if (command) command.run(client, message, args);
});

client.login(token);
