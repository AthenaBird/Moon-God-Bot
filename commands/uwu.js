module.exports = {
	name: 'uwu',
	description: 'uwu',
	execute(message, args) {
		//if (!(message.author.id === "446932571192819713" || message.author.id === "433774411682938890" || message.author.id === "270415554995552256" || message.author.id === "324701936593141760")) return;
    message.delete(10);
    const filter = m => !m.author.bot && message.author.id === m.author.id;
    const collector = message.channel.createMessageCollector(filter, {
      time: 3000000
    });

    collector.on("collect", m => {
      var s = m.content;
      var newchar = "w";
      var newchar_upp = "W"
      s = s.split("r").join(newchar);
      s = s.split("l").join(newchar);
      s = s.split("R").join(newchar_upp);
      s = s.split("L").join(newchar_upp);
      if (s === "mg!off") {
        m.delete(10);
        collector.stop();
        return;
      } else if (m.deletable) {
        m.delete(50);
      } else {
        message.channel.send("This message is beyond my reign!");
      }

      message.channel.send("<@" + m.author.id + "> says: " + s);
    });

    collector.on("end", collected => {
      console.log(`Collected ${collected.size} items`);
    });
	},
};