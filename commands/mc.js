const ping = require('minecraft-server-util');
const Discord = require('discord.js');

module.exports = {
	name: 'mc',
  cooldown: 0,
	description: 'Info about our minecraft server!',
	execute(message, args) {
    
   
    // Callback
    ping('144.217.199.16', 25582, (error, response) => {
    var status_color = '00FF00';
    var status = 'ONLINE'
    var onlinePlayers;
      
    if (error) {
      
      status_color = 'FF0000';
      status = 'OFFLINE'
      
      var embed = new Discord.RichEmbed()
        .setTitle("**UCSD22 Summer 2020 MC Server (Name TBD)** ")
        .setDescription("Status: 🔴 __" + status + "__ 🔴 \n The server is open **7:00 PM to 2:00 AM PST** daily.")
        .setColor(status_color)
        .setThumbnail('https://cdn.iconscout.com/icon/free/png-256/minecraft-15-282774.png')
        .addField('__Server IP__', '> *ucsd22.mc-srv.com*', false)
        .addField('__Version__', '> (Paper) 1.16.1', false)
        .addField('__Players Online__', '> 0', false)
        .setFooter("Report any bugs or problems to Irene");
    
      message.channel.send(embed);
      
      throw error;
      
    } else {
      
      var online_embed = new Discord.RichEmbed()
        .setTitle("**UCSD22 Summer 2020 MC Server (Name TBD)** ")
        .setDescription("Status: 🟢 __" + status + "__ 🟢 \n The server is open **7:00 PM to 2:00 AM PST** daily.")
        .setColor(status_color)
        .setThumbnail('https://cdn.iconscout.com/icon/free/png-256/minecraft-15-282774.png')
        .addField('__Server IP__', '> *ucsd22.mc-srv.com*', false)
        .addField('__Version__', '> (Paper) 1.16.1', false)
        .addField('__Players Online__', '> ' + response.onlinePlayers, false)
        .setFooter("Report any bugs or problems to Irene");
    
      message.channel.send(online_embed);
      
    }  
    
        
    });
    
    
    
    // currently giving errors
		/*ping('3.128.145.20', 25565, (error, response) => {
      if(error) {
        console.log(error);
        throw error;
        message.channel.send("There was a problem executing this command");
        return;
      }
      
      console.log(response); 
      
    }) */
    
    /*var session = ping.createSession();

    session.pingHost ("3.128.145.20:25565", function (error, target) {
    if (error)
        if (error instanceof ping.RequestTimedOutError)
            console.log (target + ": Not alive");
        else
            console.log (target + ": " + error.toString ());
    else
        console.log (target + ": Alive");
    }); */
  
	}, 
};