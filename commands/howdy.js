module.exports = {
	name: 'howdy',
	description: 'Howdy!!',
	execute(message, args, client) {
    function getUserID(mention) {
      if (!mention) return;

      if (mention.startsWith("<@") && mention.endsWith(">")) {
        mention = mention.slice(2, -1);
      }
      if (mention.startsWith("!")) {
        mention = mention.slice(1);
      }

      let guild = client.guilds.get("425866519650631680");

      return guild.member(mention);
      
    }
    
    
		let user = getUserID(args[0]);
    user.send("Howdy!");
	},
};