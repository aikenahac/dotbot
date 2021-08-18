import Discord from 'discord.js';
import { Logger } from 'tslog';

const log = new Logger();

export default function SpamUser(message, args, specialUsers) {
  let userSpammed;
  let number = args[1];

  if (!message.mentions.users.first()) {
    const errorEmbed = new Discord.MessageEmbed()
      .setTitle('Error:')
      .addField(
        'Invalid user:',
        `The user you have mentioned is either:\n  - not a user,\n  - not in this server`,
        false,
      )
      .setColor('#DD1627');
    return message.channel.send(errorEmbed);
  } else {
    userSpammed = message.mentions.users.first().id;
  }

  if (args.length == 0) {
    const errorEmbed = new Discord.MessageEmbed()
      .setTitle('Error:')
      .addField(
        'Missing arguments:',
        `Please provide who you want to spam.`,
        false,
      )
      .setColor('#DD1627');
    return message.channel.send(errorEmbed);
  } else {
    let validUser, perms;
    if (number == undefined) {
      number = 5;
      perms = true;
      log.info(`Number: ${number}`);
    } else if (number > 20) {
      log.info(`Number: ${number}`);
      const errorEmbed = new Discord.MessageEmbed()
        .setTitle('Error:')
        .addField('Limit:', `You can only spam a user 20 times or less!`, false)
        .setColor('#DD1627');
      message.channel.send(errorEmbed);
      log.info(`Sending error embed`);
      return (perms = false);
    } else perms = true;

    while (perms) {
      for (let i = 0; i < specialUsers.length; i++) {
        if (message.author.id === specialUsers[i]) {
          validUser = true;
          break;
        } else validUser = false;
      }

      log.info(`Message author: ${message.author.id}`);
      log.info(`Special users: ${specialUsers}`);
      log.info(`Is valid: ${validUser}`);

      if (validUser) {
        let ctr = 0;
        while (ctr < number) {
          message.channel.send(`<@${userSpammed}>`);
          ctr++;
        }
        perms = false;
      } else {
        const errorEmbed = new Discord.MessageEmbed()
          .setTitle('Error:')
          .addField(
            'Missing perms:',
            `Nisi tok kul! You can't control me!!!`,
            false,
          )
          .setColor('#DD1627');
        return message.channel.send(errorEmbed);
      }
    }
  }
}
