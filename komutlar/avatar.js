const Discord = require('discord.js');


exports.run = function(client, message) {

   const embed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setImage(message.author.avatarURL)

    message.channel.send(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['a'],
  permLevel: 3
};

exports.help = {
  name: 'avatar',
  description: 'Avatarınızı Gösterir',
  usage: 'avatar'
};
