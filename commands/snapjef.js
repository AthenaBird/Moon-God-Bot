const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
	name: 'snapjef',
	description: 'snap\'s Jef',
	execute(message, args, client) {
		if (message.author.id !== "144994874570047488" && message.author.id !== "446932571192819713") {
      message.channel.send("Nice try loser");
      return;
    }
    
    let tech_role = message.guild.roles.find(
      role => role.name === "Technician"
     );
    let snapped = message.guild.roles.find(
      role => role.name === "SNAPPED");
    let verified = message.guild.roles.find(
      role => role.name === "Verified");
    let member = message.member
    member.addRole(snapped).catch(console.error);
    member.removeRole(verified).catch(console.error);
    member.removeRole(tech_role).catch(console.error);
        
    message.channel.send("Goodbye, Jef");
	}
};