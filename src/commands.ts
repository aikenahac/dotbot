export default class CommandHandler {
    static clearFunction(noofMsg, message) {
      if (noofMsg == 0) {
        return message.reply("One does not simply delete 0 messages!");
      } else {
        message.delete();

        let noOfMessages: number = parseInt(noofMsg);

        message.channel.bulkDelete(noOfMessages);
      }
    }

    static kickUser(message) {
      if (message.member.hasPermission("KICK_MEMBERS") || message.member.hasPermission("ADMINISTRATOR")) {
        let userKicked = message.mentions.users.first().id;
        
        message.guild.member(`${userKicked}`).kick();
  
        return message.channel.send(`Kicked <@${userKicked}> on the command of <@${message.author}>`);
      } else {
        return message.channel.send(`Sorry <@${message.author}>, you have no perms sucka!`);
      }
    }
}