const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');//Lordcreative
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');//Lordcreative
const { Client, Util } = require('discord.js');
const weather = require('weather-js')//Lordcreative//Lordcreative
const fs = require('fs');
const db = require('quick.db');//Lordcreative
const http = require('http');
const express = require('express');//Lordcreative
require('./util/eventLoader.js')(client);
const path = require('path');//Lordcreative
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');


const app = express();//Lordcreative
app.get("/", (request, response) => {
  console.log(Date.now() + "Lord Creative | Youtube Channel");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};//Lordcreative

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
        });//Lordcreative
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
        } catch (e) {
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
        } catch (e) {
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
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   lordCreative(chalk.bgBlue.green(e.replace(regTokenfynx 'that was redacted')));
// }); //DEVİLHOUSE//

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//---------------------------------KOMUTLAR---------------------------------\\


client.on('guildMemberAdd', async member => {
  await member.addRole(`KAYITSIZ ROL İD`) //id yazan yere verilecek rol (unregistered)
  await member.setNickname(`İsim | Yaş`) //yeni gelen kullanıcının adını değiştirme
let member2 = member.user 
let zaman = new Date().getTime() - member2.createdAt.getTime()
var user = member2 
var takizaman = [];
if(zaman < 604800000) {
takizaman = '<a:teh:729375080387182603> Tehlikeli'
} else {
takizaman = `<a:tamam:717296560765141075> Güvenli`}require("moment-duration-format");
 let zaman1 = new Date().getTime() - user.createdAt.getTime()
 const gecen = moment.duration(zaman1).format(` YY [Yıl,] DD [Gün,] HH [Saat,] mm [Dakika,] ss [Saniye]`) 
 let dbayarfalanfilan = await db.fetch(`takidbayar${member.guild.id}`)
 let message = member.guild.channels.find(x => x.id === `KANAL İD `) //id yazan kısma kanal id'si [orn: register-chat]
  const taki = new Discord.RichEmbed()
 .setTitle(
     "Fynx Topluluğuna Hoş Geldin"
   )
   .setDescription(`<a:hogel:717781593132892303>**・** **Sunucumuza Hoş geldin** ${member} 
   
<a:supreme:720246535517896778>**・Seninle Beraber** ${message.guild.memberCount} **Kişiyiz**

<a:yn:692871968739033140>**・** **Kaydının Yapılması İçin İsmini ve Yaşını Yaz**

<a:elms:698240537978994728>**・**<@&705459476358234134> **Rolündeki Yetkililer Seninle İlgilenecektir**

<a:boost:692837267567542333>**・** **Sunucumuzun Sınırsız Davet Bağlantısı** https://discord.gg/Hfdu33H


<a:ntro:692828377899597826>**・** **Hesap Açılalı** ${gecen} **Olmuş**
<a:elmas:692838040657461278>**・** **Bu Kullanıcı** **|** **${takizaman}**
`)
.setColor('#6278c5')
message.send(taki)
 
         });