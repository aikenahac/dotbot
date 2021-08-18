import Discord from 'discord.js';
import { Logger } from 'tslog';

const log = new Logger();

export default function BanUser(message, args) {
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

  log.info('attempting ban');
  if (
    message.member.hasPermission('BAN_MEMBERS') &&
    message.guild.me.hasPermission('BAN_MEMBERS')
  ) {
    let userBanned = message.mentions.users.first().id;

    if (
      botRoles[0].position > userRoles.position ||
      defaultRole.position > userRoles.position
    ) {
      if (senderRoles.position < userRoles.position) {
        const errorEmbed = new Discord.MessageEmbed()
          .setTitle('Error:')
          .addField(
            'Role error:',
            `<@${userBanned}> has a higher role than you, you fucktard.`,
            false,
          )
          .setColor('#DD1627');

        return message.channel.send(errorEmbed);
      } else {
        message.guild
          .member(`${userBanned}`)
          .ban({ days: 7, reason: `${reason}` });
        const successEmbed = new Discord.MessageEmbed()
          .setTitle('Success:')
          .addField(
            'Successfully banned:',
            `<@${userBanned}> with reason: ${reason}`,
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
          `<@${userBanned}> has a higher role than me`,
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
        `You don\'t have the necessary permissions to ban users or I don't.`,
        false,
      )
      .setColor('#DD1627');
    return message.channel.send(errorEmbed);
  }
}
