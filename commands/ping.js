module.exports = {
	name: 'ping',
  cooldown: 0,
	description: 'Ping!',
	execute(message, args) {
		message.channel.send('ping');
	},
};