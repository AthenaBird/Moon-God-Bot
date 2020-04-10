const SQLite = require("better-sqlite3");
const sql_cuddles = new SQLite("./databases/cuddles.sqlite");

module.exports = {
	name: 'cuddlescore',
  cooldown: '0',
	description: 'Check your cuddle score here!',
	execute(message, args) {
    
    
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
      cuddles = {
        id: `${message.guild.id}-${message.author.id}`,
        user: message.author.id,
        guild: message.guild.id,
        sent: 0,
        received: 0
      };
    }
    
    setCuddles.run(cuddles);
    
    message.reply(`You currently have been cuddled **${cuddles.received}** times and have cuddled **${cuddles.sent}** times!`);
    
  //}

  
  }
};