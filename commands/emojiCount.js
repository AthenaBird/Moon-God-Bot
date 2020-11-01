const SQLite = require("better-sqlite3");
const sql_emojis = new SQLite("./databases/emojis.sqlite");
const Discord = require("discord.js");

module.exports = {
	name: 'emojicount',
  cooldown: 0,
	description: 'Display emoji leaderboard',
	execute(message, args, client) {
		const top10 = sql_emojis.prepare("SELECT * FROM emojis ORDER BY count DESC LIMIT 10;").all();
    console.log(top10);
    // Now shake it and show it! (as a nice embed, too!)
    var embed = new Discord.RichEmbed()
      .setTitle("__**Emoji Count Leaderboard**__ ")
      .setDescription("Our top 10 emoji count leaders since 4/10/20!")
      .setColor("0x00AE86")
      .setFooter("Does not include reacts or ANIMATED emojis in count.")
        
    var counter = 1;
    try {
      for(const data of top10) {
        console.log(data.id);
        var emoji_id = data.id.substring(0, 18);

          var emoji_obj = client.emojis.get(emoji_id);
          embed.addField("**" + counter + ") " + emoji_obj + " " + data.name + "**", `Count: ${data.count}`);
          counter++;
      }
      message.channel.send(embed);
      
    } catch (error) {
        //console.log(error);
      
    }
	}
};
