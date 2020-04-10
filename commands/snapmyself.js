module.exports = {
	name: 'snapmyself',
  cooldown: 43200,
	description: 'Exile yourself to the shadowrealm',
	execute(message, args) {
    
    let snapped = message.guild.roles.find(
      role => role.name === "SNAPPED");
    let verified = message.guild.roles.find(
      role => role.name === "reVerified");
    let member = message.member;
    member.addRole(snapped).catch(console.error);
    member.removeRole(verified).catch(console.error);
        
    message.channel.send("Goodbye, <@" + message.member.id + ">");
      

	},
};