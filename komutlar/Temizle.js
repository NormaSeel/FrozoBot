const Discord = require('discord.js');


exports.run = function(client, message) {
message.channel.bulkDelete(99);
message.channel.send("99 mesaj sildim").then(msg => {
	msg.delete(1000)
})

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sil'],
  permLevel: 3
};

exports.help = {
  name: 'temizle',
  description: 'Belirtilen miktarda mesaj siler',
  usage: 'temizle <miktar>'
};
