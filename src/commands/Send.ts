import Discord from 'discord.js';
import { Logger } from 'tslog';

const log = new Logger();

export default function SendMessage(message, args, specialUsers) {
  const msgToSend = args.join(' ');

  if (args.length == 0) {
    const errorEmbed = new Discord.MessageEmbed()
      .setTitle('Error:')
      .addField(
        'Missing arguments:',
        `Please provide what you want me to say`,
        false,
      )
      .setColor('#DD1627');
    return message.channel.send(errorEmbed);
  }

  let validUser;
  for (let i = 0; i < specialUsers.length; i++) {
    if (message.author.id === specialUsers[i]) {
      validUser = true;
      break;
    } else validUser = false;
  }

  log.info(`Message author: ${message.author.id}`);
  log.info(`Is valid: ${validUser}`);

  if (validUser) {
    log.info('sending custom message');
    message.delete();
    return message.channel.send(msgToSend);
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
