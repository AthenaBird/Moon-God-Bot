module.exports = {
	name: 'sleep',
  cooldown: 0,
	description: 'Test!',
	execute(message, args) {
    if (message.author.id == "198581553834622977") {
		  message.channel.send('Hey, I know you have good intentions trying to give me advice on how to sleep earlier but i\'ve tried many different methods and especially all the recommended and common ones. It gets annoying sometimes when people keep telling me the same thing and I know they don\'t work. I will be going to the doctors once AGAIN after COVID/Quarantine ends so if you could please hold on to your responses that would be greatly appreciated.\n\n"Hoe don\'t do it." -Yen ');

    } else {
      message.channel.send('Goodnight sweaties')
      message.delete(50)
    }
  },
};