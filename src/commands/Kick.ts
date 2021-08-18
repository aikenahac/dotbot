import Discord from 'discord.js';
import { Logger } from 'tslog';

const log = new Logger();

export default function KickUser(message, args) {
  const botRoles = message.guild.me.roles.cache.array();
  const userRoles = message.mentions.members.first().roles.highest;
  const senderRoles = message.member.roles.highest;
  const defaultRole = message.guild.roles.cache.find(
    (role) => role.name === '[db!] DotBot',
  );

  let reason = args.slice(1).join(' ');

  if (reason == '') {
    reason = 'No reason provided';
  }

  log.info('attempting kick');

  if (
    message.member.hasPermission('KICK_MEMBERS') &&
    message.guild.me.hasPermission('KICK_MEMBERS')
  ) {
    const userKicked = message.mentions.users.first().id;
    const ownerID = message.guild.ownerID;

    if (userKicked == ownerID) {
      const errorEmbed = new Discord.MessageEmbed()
        .setTitle('Error:')
        .addField('Really?', `One does not simply kick the owner.`, false)
        .setColor('#DD1627');

      return message.channel.send(errorEmbed);
    } else if (
      botRoles[0].position > userRoles.position ||
      defaultRole.position > userRoles.position
    ) {
      if (senderRoles.position < userRoles.position) {
        const errorEmbed = new Discord.MessageEmbed()
          .setTitle('Error:')
          .addField(
            'Role error:',
            `<@${userKicked}> has a higher role than you, you fucktard.`,
            false,
          )
          .setColor('#DD1627');

        return message.channel.send(errorEmbed);
      } else if (senderRoles.position == userRoles.position) {
        const errorEmbed = new Discord.MessageEmbed()
          .setTitle('Error:')
          .addField(
            'Role error:',
            `<@${userKicked}> has the same role as you, you fucktard.`,
            false,
          )
          .setColor('#DD1627');

        return message.channel.send(errorEmbed);
      } else if (botRoles[0].position == userRoles.position) {
        const errorEmbed = new Discord.MessageEmbed()
          .setTitle('Error:')
          .addField(
            'Role error:',
            `<@${userKicked}> has the same role as me.`,
            false,
          )
          .setColor('#DD1627');

        return message.channel.send(errorEmbed);
      } else {
        message.guild.member(`${userKicked}`).kick(reason);
        const successEmbed = new Discord.MessageEmbed()
          .setTitle('Success:')
          .addField(
            'Successfully kicked:',
            `<@${userKicked}> with reason: ${reason}`,
            false,
          )
          .setColor('#43B581');

        return message.channel.send(successEmbed);
      }
    } else {
      const errorEmbed = new Discord.MessageEmbed()
        .setTitle('Error:')
        .addField(
          'Role error:',
          `<@${userKicked}> has a higher role than me`,
          false,
        )
        .setColor('#DD1627');

      return message.channel.send(errorEmbed);
    }
  } else {
    const errorEmbed = new Discord.MessageEmbed()
      .setTitle('Error:')
      .addField(
        'Insufficient permissions:',
        `You don\'t have the necessary permissions to kick users.`,
        false,
      )
      .setColor('#DD1627');
    return message.channel.send(errorEmbed);
  }
}
