const SQLite = require("better-sqlite3");
const sql_cuddles = new SQLite("./databases/cuddles.sqlite");

module.exports = {
	name: 'cuddle',
  cooldown: '10',
	description: 'Cuddle someone (use a mention)!',
	execute(message, args) {
    
    var mentioned = message.mentions.members.first();
    if (mentioned === undefined) {
      message.channel.send("Please mention who you would like to cuddle. And no, you can't cuddle yourself.");
      return;
    } else if (mentioned === "632078521929433088") {
      message.channel.send("**EWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW**");
      return;
    } else {
      mentioned = args[0];
       if (mentioned.startsWith("<@") && mentioned.endsWith(">")) {
          mentioned = mentioned.slice(2, -1);
        }
      if (mentioned.startsWith("!")) {
        mentioned = mentioned.slice(1);
      }
      
      console.log(mentioned);
      
      if(mentioned.toString() === message.author.id.toString()) {
        message.channel.send("You might want to, but you can't cuddle yourself!");
        return;
      }
      
    }
    
    const cuddle_rps = sql_cuddles.prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'cuddles';"
    ).get();
    
    const setCuddles = sql_cuddles.prepare(
    "INSERT OR REPLACE INTO cuddles (id, user, guild, sent, received) VALUES (@id, @user, @guild, @sent, @received)");
    
    const getCuddles = sql_cuddles.prepare(
    "SELECT * FROM cuddles WHERE user = ? AND guild = ?"
    );
    
    //Check first: sender is in the database
    
    //if (message.guild) {
    var cuddles = getCuddles.get(message.author.id, message.guild.id);
    if (!cuddles) {
      message.channel.send("This is your first sent cuddle!")
      cuddles = {
        id: `${message.guild.id}-${message.author.id}`,
        user: message.author.id,
        guild: message.guild.id,
        sent: 0,
        received: 0
      };
    }
    
    cuddles.sent = cuddles.sent + 1;
    setCuddles.run(cuddles);
  //}
    
    //Check second: receiver is in the database
	  var receiver = getCuddles.get(mentioned, message.guild.id);
      if (!receiver) {
        message.channel.send("You are the first person to cuddle them!");
        receiver = {
          id: `${message.guild.id}-${mentioned}`,
          user: mentioned,
          guild: message.guild.id,
          sent: 0,
          received: 0
        };    
         
        }
    receiver.received = receiver.received + 1;
    setCuddles.run(receiver);
    
    message.reply("**you cuddled** <@" + mentioned + ">! *uwu*");
  }
};