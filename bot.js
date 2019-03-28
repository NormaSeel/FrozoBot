const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'nasılsın') {
     msg.channel.sendMessage('https://giphy.com/gifs/2YekIxL017LaJ9zbVX')
}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
     msg.channel.sendMessage('Aleyküm Selam Hoşgeldin!')
}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'başvuru') {
     msg.channel.sendMessage('http://link.tl/22JeH')
}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'yardım') {
     msg.channel.sendMessage('**Sunucudaki komutlar ```css *nasılsın *başvuru *yaz *avatar ve sa komutlarıdır**```')
}
});

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  if (message.content.toLowerCase() === prefix + "avatar") {
    message.channel.send(message.author.avatarURL);
  }
});

client.on('message', message => {

  if (!message.guild) return;
  if (message.content.startsWith('*at')) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.kick('Kurallara UY!').then(() => {
          message.reply(`Başarıyla Atıldı ${user.tag}`);
        }).catch(err => {
          message.reply('Bu Kişi Dokunulmaz!');
          console.error(err);
        });
      } else {
        message.reply('Hata Kişi Bulunamadı');
      }
    } else {
      message.reply('Atmam İçin Birini Etiketle!');
    }
  }
});

client.on('message', message => {
  if (!message.guild) return;

  if (message.content.startsWith('*ban')) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.ban({
          reason: 'Kural İhali!',
        }).then(() => {
          message.reply(`Başarı İle Yasaklandı ${user.tag}`);
        }).catch(err => {
          message.reply('Bu Kişiyi Yasaklayamıyorum');
          console.error(err);
        });
      } else {
        message.reply('Seçtiğin Kişi Sunucuda Bulunmamakta');
      }
    } else {
      message.reply('Yasaklamam İçin Birini Seçmelisin!');
    }
  }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.BOT_TOKEN);
