module.exports = {
	name: 'setbirthday',
  	cooldown: 0,
	description: 'Set your birthday in the database',
	execute(message, args) {

		message.channel.send("**In the following message, write your birthday in the form __MM/DD__.** \n > Type `cancel` to exit the command.");
		const filter_log = m => m.author.id === message.author.id;
	    const collec_log = message.channel.createMessageCollector(filter_log, {
	      max: 1,
	      time: 120000});
	   
	    let completed_time = true;
	    
	    collec_log.on("collect", m => {
	      if (m.content === "cancel") {
	        completed_time = false;
	        message.channel.send("Action cancelled by user.");
	        collec_log.stop();
	        return;
	      } else {
	        m.react("\u2705");
	        console.log(`Collected ${m.content}`);
	      }
	    });
	    
	    var month = 0;
	    var day = 0;
	    var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];
	    var months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	    collec_log.on("end", collected => {

	    	var birthday = collec_log.collected.array();
	    	month = parseInt(birthday[0].toString().split("\\")[0]);
	    	day = parseInt(birthday[1].toString().split("\\")[1]);

	    	// error messages
	    	if (month < 1 || month > 12) {
	    		message.channel.send("There was an error processing the month! Please try again.");
	    		return;
	    	} else if (day < 1 || month > 31) {
	    		message.channel.send("There was an error processing the day! Please try again.");
	    		return;
	    	} else if (day > ListofDays[parseInt(month)-1]) {
	    		message.channel.send("That is not a valid day of that month! Please try again.");
	    		return;
	    	}

	    	var datestring = months[month-1] + day;

	    	message.channel.send("To confirm, your birthday is **" + datestring + "**? ***Note that this cannot be changed once you select ✅ to confirm, so please double check!***").then(sent => {

	        	sent.react("✅");
	        	sent.react("❌");

	        	const filter_confirm = (reaction, user) => {
	            	return ((arr_confirm.includes(reaction.emoji.name) && user.id === message.author.id));
	          	};

		        const collector_confirm = sent.createReactionCollector(filter_confirm, {
		            maxEmojis: 1,
		            time: 45000
		        });

		        collector_confirm.on("collect", (reaction, reactionCollector) => {
		            collected_confirm = reaction.emoji.name;
		
		        });

		        collector_confirm.on("end", collected => {
		        	if (collected_confirm == "✅") {
		            	//TODO input into SQL
		            	message.channe.send("Thanks for inputting your birthday! You can check other birthdays using `mg!birthdays`.")
		            	return;
		            } else {
		            	message.channel.send("Exiting command...")
		            	return;
		            }

		        });
		    });

	    })

	}
};