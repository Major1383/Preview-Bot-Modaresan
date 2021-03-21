const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');

client.on('ready', () => {
    console.log(`Modaresan Bot Is Ready! ${client.user.tag}!`);
});

client.on("ready", () => {
  
    function chNickname() {
        const targetguild = client.guilds.cache.get("622882860159991812")
     const me = targetguild.members.cache.get(client.user.id)
       let name = ["M", "MO", "MOD", "MODA", "MODAR", "MODARE","MODARES","MODARESA","MODARESAN"]
     
        for (let i = 0; i < name.length; i++)
            me.setNickname(name[i])
    }; setInterval(chNickname, 10000)
   
 
      client.user.setPresence({  
     // status: 'idle',     //sets status button to green   
      activity: {  
       name: '     UpdatePreView!📊',    //This is the custom text  
       type: 'WATCHING'}
      });
      //PingBot
      client.on('message', message => {
        if (message.content === `${prefix}ping`) {
            const embed = new Discord.MessageEmbed()
              .setColor("FF0004")
              .setAuthor(`Ping Bot 🐱‍🏍 : ${Math.round(message.client.ws.ping)}`)
              
                message.channel.send(embed);
        }
            });

          //join voice 
      const channel = client.channels.cache.get("794206856801026068");//serverId
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

  //Avatar Using
  client.on('message', message => {
    // If the message is "what is my avatar"
    if (message.content === `${prefix}avatar`) {
      // Send the user's avatar URL
      message.reply(message.author.displayAvatarURL());
    }
    //server info
    if (message.content ===`${prefix}server`){
      const embed = new Discord.MessageEmbed()
      .setColor("FF0004")
      .setAuthor( message.channel.send(`Server name: 🎉${message.guild.name}\nServer owner: 🥇${message.guild.owner}\nMember Count: ✨${message.guild.memberCount}\nId Server: 🎯${message.guild.id}`));
      
}
//user info
else if (message.content === `${prefix}user`) {
	message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}\nUserProfile: ${message.author.displayAvatarURL()}`);
}

//kick user 
if (message.content === `${prefix}kick`) {
	// grab the "first" mentioned user from the message
	// this will return a `User` object, just like `message.author`
	const taggedUser = message.mentions.users.first();
  if (!message.mentions.users.size) {
    return message.reply('you need to tag a user in order to kick them!');
  }
	message.channel.send(`You wanted to kick: ${taggedUser.username}`);
}

  });
  client.login(token)
