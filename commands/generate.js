module.exports = {
	name: 'generate',
  cooldown: 10,
	description: 'Generates a sentence using alpha centuari',
	execute(message, args, client) {    
		client.channels.get("574453676513558528").send("ac!generate " + "%%" + message.channel.id);
	},
};