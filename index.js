const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.on('ready', () => {
  console.log(`Modaresan Bot Is Ready! ${client.user.tag}!`);
});

client.on("ready", () => {

  function chNickname() {
    const targetguild = client.guilds.cache.get("622882860159991812")
    const me = targetguild.members.cache.get(client.user.id)
    let name = ["M", "MO", "MOD", "MODA", "MODAR", "MODARE", "MODARES", "MODARESA", "MODARESAN"]
    // let name = ["M","❤","M","M❤M"]
    for (let i = 0; i < name.length; i++)
      me.setNickname(name[i])
  }; setInterval(chNickname, 10000)


  client.user.setStatus('online')
  const guild = client.guilds.cache.get("622882860159991812");
  let status_num = 0
  setInterval(function () {
    if (status_num == 0) {
      client.user.setActivity(`تعداد کاربران ${guild.memberCount}`, { type: "WATCHING" })
      status_num += 1;
    }
    else if (status_num === 1) {
      client.user.setActivity('🔍m!help', { type: "LISTENING" });
      status_num++;
    }
    else {
      client.user.setActivity('Created By Major', { type: "PLAYING" });
      status_num = 0;
    }
  }, 3000);

  //client.user.setPresence({
  // status: 'idle',     //sets status button to green   
  //  activity: {
  //    name: '    🔍 M!help ',    //This is the custom text  
  //   type: 'PLAYING'
  //  }
  //});
  //PingBot
  client.on('message', message => {
    if (message.content.toLowerCase() === `${prefix}ping`) {
      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`Ping Bot 🐱‍🏍 : ${Math.round(message.client.ws.ping)}`)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
      message.channel.send(embed);
    }
  });

  //join voice 
  const channel = client.channels.cache.get("794206856801026068");
  if (!channel) return console.error("The channel does not exist!");
  channel.join().then(connection => {
    console.log("Successfully connected.");
    // Self Deafen
    connection.voice.setSelfDeaf(true);

  }).catch(e => {

    // Oh no, it errored! Let's log it to console :)
    console.error(e);
  });
});

//embed 
client.on('message', message => {
  // If the message is "how to embed"

  if (message.content.toLowerCase() === `${prefix}help`) {
    const embed = new Discord.MessageEmbed()

      .setColor('#0099ff')//color
      .setTitle('Command List')
      //.setURL('https://discord.gg/3MDur5mRsA')
      .setAuthor('Modaresan Bot ', 'https://cdn.discordapp.com/icons/622882860159991812/03a1a0dbd8959712614d0b99569c2f70.gif?size=1024', 'https://discord.gg/3MDur5mRsA')
      .setDescription('👇👇👇قابلیت های بات مدرسان شریف ...👇👇👇')
      .setThumbnail('https://cdn.discordapp.com/avatars/819674358007070770/a27c995c893d2a5af20f11f1da6a4cbb.png?size=1024')
      .addFields(
        { name: '👇🤖moderator command🤖👇', value: '**m!kick @Target**' },
        { name: 'CLEAR CHAT ', value: 'm!clear||m!c' },
        { name: '✔HOW TO CLEAR CHAT !?✔', value: 'm!help clear' },
        { name: ' 🖼 SHOW YOUR AVATAR 🖼 ', value: '**m!avatar**' },
        { name: '📡SHOW YOUR ACCOUNT INFORMATION📡', value: '**m!user** ' },
        { name: '📣SHOWS YOU SERVER INFORMATION📣', value: '**m!server**' },
        { name: '🩺SHOW TO YOU PING BOT🩺', value: '**m!ping**' },

        { name: '\u200B', value: '\u200B' }
      )
      .addField('☄ More possibility will be added soon ... ☄', '🤍Just some patience... 💛', true)
      .setImage('https://media.discordapp.net/attachments/795010214218825738/795171357792665610/a_03a1a0dbd8959712614d0b99569c2f70.gif')
      .setTimestamp()
      .setFooter('developed by major', 'https://cdn.discordapp.com/avatars/805824634985250856/3073680628dd5c497228b7696c2cc81e.png?size=1024');

    message.channel.send(embed);
  }
});


//Avatar Using
client.on('message', message => {

  if (message.content.toLowerCase() === `${prefix}avatar`) {
    // Send the user's avatar URL
    if (!message.mentions.users.size)

      message.reply(message.author.displayAvatarURL());

  }


  //server info
  process.setMaxListeners(0);
  client.on('message', message => {
    if (message.content.toLowerCase() === `${prefix}server`) {
      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Server Info")
        .setImage(message.guild.iconURL)
        .setDescription(`${message.guild}'s information`)
        .addField("Owner", `The owner of this server is ${message.guild.owner}`)
        .addField("👮‍♂️Member Count", `This server has ${message.guild.memberCount} members`)
        .addField("Emoji Count", `This server has ${message.guild.emojis.cache.size} emojis`)
        .addField("🔐Roles Count", `This server has ${message.guild.roles.cache.size} roles`)
      message.channel.send(embed)
    }
  })


  //user info
  if (message.content.toLowerCase() === `${prefix}user`) {
    message.channel.send(`Your username: ${message.author.username}\nYour ID: 
    ${message.author.id}\nUserProfile: ${message.author.displayAvatarURL()}`);

  }

  //kick user 
  else if (message.content.toLowerCase() === `${prefix}kick`) {
    // grab the "first" mentioned user from the message
    // this will return a `User` object, just like `message.author`
    const taggedUser = message.mentions.users.first();
    if (!message.mentions.users.size) {
      return message.reply('you need to tag a user in order to kick them!');
    }
    message.channel.send(`You wanted to kick: ${taggedUser.username}`);
  }
});
//clear chat
client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content
    .toLowerCase()
    .slice(prefix.length)
    .trim()
    .split(/\s+/);
  const [command, input] = args;

  if (command === 'clear' || command === 'c') {
    //prem error
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.channel
        .send(
          "You cant use this command since you're missing `manage_messages` perm",
        );
    }

    if (isNaN(input)) {
      return message.channel
        .send('enter the amount of messages that you would like to clear')
        .then((sent) => {
          setTimeout(() => {
            sent.delete();
          }, 2500);
        });
    }

    if (Number(input) < 0) {
      return message.channel
        .send('enter a positive number')
        .then((sent) => {
          setTimeout(() => {
            sent.delete();
          }, 2500);
        });
    }

    // add an extra to delete the current message too
    const amount = Number(input) > 100
      ? 101
      : Number(input) + 1;

    message.channel.bulkDelete(amount, true)
      .then((_message) => {
        message.channel
          // do you want to include the current message here?
          // if not it should be ${_message.size - 1}
          .send(`Bot cleared \`${_message.size}\` messages :broom:`)
          .then((sent) => {
            setTimeout(() => {
              sent.delete();
            }, 2500);
          });
      });
  }
  //help clear commadn
  if (command === 'help' && input === 'clear') {
    const newEmbed = new Discord.MessageEmbed()
      .setColor('#00B2B2')
      .setTitle('**Clear Help**')
      .setDescription(
        `This command clears messages for example \`${prefix}clear 5\` or \`${prefix}c 5\`.`,
      )
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL(),
      )
      .setTimestamp();

    message.channel.send(newEmbed);
  }
});
client.login(token)

