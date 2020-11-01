module.exports = {
	name: 'unsnapmyself',
  cooldown: 43200,
	description: 'Un exile yourself to the shadowrealm',
	execute(message, args) {
    
    let snapped = message.guild.roles.find(
      role => role.name === "SNAPPED");
    let verified = message.guild.roles.find(
      role => role.name === "Verified");
    let member = message.member;
    member.removeRole(snapped).catch(console.error);
    member.addRole(verified).catch(console.error);
        
    message.channel.send("Go back from whence you came, <@" + message.member.id + ">");
      

	},
};