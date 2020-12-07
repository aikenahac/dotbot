import Discord from "discord.js";

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

    static kickUser(message, reason) {
      if (message.member.hasPermission("KICK_MEMBERS") || message.member.hasPermission("ADMINISTRATOR")) {
        let userKicked = message.mentions.users.first().id;
        
        message.guild.member(`${userKicked}`).kick(reason);

        const successEmbed = new Discord.MessageEmbed()
          .setTitle('Success:')
          .addField(
            'Successfully kicked:',
            `<@${userKicked}> with reason: ${reason}`,
            false
          )
          .setColor('#43B581')
  
        return message.channel.send(successEmbed);
      } else {
        const errorEmbed = new Discord.MessageEmbed()
          .setTitle('Error:')
          .addField(
            'Insufficient permissions:',
            `You don\'t have the necessary permissions to kick users.`,
            false
          )
          .setColor('#DD1627')
        return message.channel.send(errorEmbed);
      }
    }

    static banUser(message, reason) {
      if (message.member.hasPermission("KICK_MEMBERS") || message.member.hasPermission("ADMINISTRATOR")) {
        let userBanned = message.mentions.users.first().id;
        
        message.guild.member(`${userBanned}`).kick(reason);

        const successEmbed = new Discord.MessageEmbed()
          .setTitle('Success:')
          .addField(
            'Successfully banned:',
            `<@${userBanned}> with reason: ${reason}`,
            false
          )
          .setColor('#43B581')
  
        return message.channel.send(successEmbed);
      } else {
        const errorEmbed = new Discord.MessageEmbed()
          .setTitle('Error:')
          .addField(
            'Insufficient permissions:',
            `You don\'t have the necessary permissions to ban users.`,
            false
          )
          .setColor('#DD1627')
        return message.channel.send(errorEmbed);
      }
    }
}