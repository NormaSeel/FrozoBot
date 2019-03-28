const Discord = require('discord.js');

const hook = new Discord.WebhookClient('560758913658650635', 'XKs5QvyWeg4MfxywDPfmpbsTZdkjUxOuLJ8iq09R6ds3cfFakCGQOa6UPM6LtHqVqVA4');

hook.send('!Sunucu Özel Botu Yeniden Başlatıldı Veya Açıldı!');

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Web', 'Hook'],
  permLevel: 3
};


exports.help = {
  name: 'web',
  description: 'WebHook Oluşrurur.',
  usage: 'Web [oluştur]'
};
