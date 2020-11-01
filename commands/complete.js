module.exports = {
	name: 'complete',
  cooldown: 10,
	description: 'Completes a sentence using alpha centuari',
	execute(message, args, client) {
		client.channels.get("574453676513558528").send("ac!complete " + "%%" + message.channel.id + " " + args.join(" "));
	},
};