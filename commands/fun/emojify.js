const BaseCommand = require('../../handlers/command.js');
const request = require('request');

module.exports ={
  name: 'emojify',
  category: 'fun',
  usage: '-emojify text',
  run: async (message, client, args) => {
        var options = {
            uri: 'https://emoji.getdango.com/api/emoji?q=' + encodeURIComponent(args.splice(1, args.length).join(' ')),
            headers: {
                'User-Agent': 'blargbot/1.0 (ratismal)'
            }
        };
        request(options, (err, res, body) => {
            if (!err && res.statusCode == 200) {
                var emojis = JSON.parse(body);
                var toSend = '';
                for (var i = 0; i < emojis.results.length && i < 8; i++) {
                    toSend += emojis.results[i].text;
                }
                message.channel.send(message, toSend);
            }
        });
    }
}