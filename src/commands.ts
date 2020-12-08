import Discord from "discord.js";

export default class CommandHandler {
    static clearFunction(noofMsg, message) {
      console.log("attempting message clear");
      if (noofMsg == 0) {
        return message.reply("One does not simply delete 0 messages!");
      } else if(!message.member.hasPermission("MANAGE_MESSAGES")){
        const errorEmbed = new Discord.MessageEmbed()
          .setTitle('Error:')
          .addField(
            'Insufficient permissions:',
            `You don\'t have the necessary permissions to manage messages.`,
            false
          )
          .setColor('#DD1627')
        return message.channel.send(errorEmbed);
      } else {
        message.delete();

        let noOfMessages: number = parseInt(noofMsg);

        message.channel.bulkDelete(noOfMessages);
      }
    }

    static kickUser(message, reason, botRoles, userRoles, senderRoles) {
      console.log("attempting kick");
      if (message.member.hasPermission("KICK_MEMBERS") || message.member.hasPermission("ADMINISTRATOR")) {
        let userBanned = message.mentions.users.first().id;
        let ownerID = message.guild.ownerID;

        if (userBanned == ownerID) {
          const errorEmbed = new Discord.MessageEmbed()
            .setTitle('Error:')
            .addField(
              'Really?',
              `One does not simply ban the owner.`,
              false
            )
            .setColor('#DD1627')
            
          return message.channel.send(errorEmbed);
        } else if (botRoles[0].position > userRoles.position) {
          if (senderRoles.position < userRoles.position) {
            const errorEmbed = new Discord.MessageEmbed()
              .setTitle('Error:')
              .addField(
                'Role error:',
                `<@${userBanned}> has a higher role than you, you fucktard.`,
                false
              )
              .setColor('#DD1627')
              
            return message.channel.send(errorEmbed);
          } else if (senderRoles.position == userRoles.position ){
            const errorEmbed = new Discord.MessageEmbed()
              .setTitle('Error:')
              .addField(
                'Role error:',
                `<@${userBanned}> has the same role as you, you fucktard.`,
                false
              )
              .setColor('#DD1627')
              
            return message.channel.send(errorEmbed);
          } else if(botRoles[0].position == userRoles.position) {
            const errorEmbed = new Discord.MessageEmbed()
              .setTitle('Error:')
              .addField(
                'Role error:',
                `<@${userBanned}> has the same role as me.`,
                false
              )
              .setColor('#DD1627')
              
            return message.channel.send(errorEmbed);
          }else {
            message.guild.member(`${userBanned}`).ban(reason);

            const successEmbed = new Discord.MessageEmbed()
              .setTitle('Success:')
              .addField(
                'Successfully kicked:',
                `<@${userBanned}> with reason: ${reason}`,
                false
              )
              .setColor('#43B581')
              
            return message.channel.send(successEmbed);
          }
        } else {
          const errorEmbed = new Discord.MessageEmbed()
            .setTitle('Error:')
            .addField(
              'Role error:',
              `<@${userBanned}> has a higher role than me`,
              false
            )
            .setColor('#DD1627')
            
          return message.channel.send(errorEmbed);
        }
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

    static banUser(message, reason, botRoles, userRoles, senderRoles) {
      console.log("attempting ban");
      if (message.member.hasPermission("KICK_MEMBERS") || message.member.hasPermission("ADMINISTRATOR")) {
        let userBanned = message.mentions.users.first().id;
        
        if (botRoles[0].position > userRoles.position) {
          if (senderRoles.position < userRoles.position) {
            const errorEmbed = new Discord.MessageEmbed()
              .setTitle('Error:')
              .addField(
                'Role error:',
                `<@${userBanned}> has a higher role than you, you fucktard.`,
                false
              )
              .setColor('#DD1627')
              
            return message.channel.send(errorEmbed);
          } else {
            message.guild.member(`${userBanned}`).ban(reason);

            const successEmbed = new Discord.MessageEmbed()
              .setTitle('Success:')
              .addField(
                'Successfully banned:',
                `<@${userBanned}> with reason: ${reason}`,
                false
              )
              .setColor('#43B581')
              
            return message.channel.send(successEmbed);
          }
        } else {
          const errorEmbed = new Discord.MessageEmbed()
            .setTitle('Error:')
            .addField(
              'Role error:',
              `<@${userBanned}> has a higher role than me`,
              false
            )
            .setColor('#DD1627')
            
          return message.channel.send(errorEmbed);
        }
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

    static sendMessage(message, msgToSend) {
      console.log("sending custom message");
      message.delete();
      return message.channel.send(msgToSend);
    }
}