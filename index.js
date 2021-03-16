const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Bot is Run ${client.user.tag}!`);
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
      status: 'idle',     //sets status button to green   
      activity: {  
       name: '     UpdatePreView!📊',    //This is the custom text  
       type: 'WATCHING'}
      });
    client.on('message', msg => {
        if (msg.content === 'ping') {
          msg.reply(':watermelon: cant connect to server...');
        }
      });
      const channel = client.channels.cache.get("794206856801026068");
      if (!channel) return console.error("The channel does not exist!");
      channel.join().then(connection => {
          console.log("Successfully connected.");
         connection.voice.setSelfDeaf(true);
      }).catch(e => {
  
          // Oh no, it errored! Let's log it to console :)
          console.error(e);
      });
  });
  client.on('message', message => {
        // If the message is "what is my avatar"
        if (message.content === 'avatar') {
          // Send the user's avatar URL
          message.reply(message.author.displayAvatarURL());
        }
      });
      


client.login('ODE5Njc0MzU4MDA3MDcwNzcw.YEqDOw.cYgEN5vazWQg3BxZfEJt13iYd0s');