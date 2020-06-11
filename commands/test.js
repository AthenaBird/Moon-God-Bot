module.exports = {
	name: 'test',
  cooldown: 0,
	description: 'Test!',
	execute(message, args) {
		message.channel.send('Yea I know generally testing sucks and all, but if you really want to think about it, it\'s only one of the ways that our current education system is able to make sure that we are able to proficiently learn the material of the class. The quarter system is really rough and moves forward at a rally fast pace, so make sure you don\'t procrastinate and try to go to office hours/discussions if you don\'t understand the material. I have a friend who does completely fine in the class itself and has a lot of nerves that get in their way when they do testing, and the best advice I can give you is to study to the point where you can teach your friends about the material, and during the tests just pretend that you\'re explaining the problem to your friend and write it down. This quarter is also really wack but it also applied to all the professors and TA\'s as this is also their first time doing something like this. Alot of classes also have comprehension quizzes but as long as you make an attempt at the reading material or any pre-work that should be done you should be fine. GL on all your first and maybe last online quarter 🙂');
	  message.delete(50);
  },
};