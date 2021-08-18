import Discord from 'discord.js';
import { Logger } from 'tslog';

const log = new Logger();

export default function ClearFunction(args, message) {
  log.info('attempting message clear');

  const noofMsg = args[0];

  if (args.length > 1) {
    return message.channel.send(
      `Please set only one argument ${message.author}`,
    );
  } else if (args.length == 0) {
    return message.channel.send(
      `Please set how many messages you would like to delete`,
    );
  } else if (message.channel.type == 'dm') {
    return message.reply("You can't clear here, sorry");
  } else {
    if (noofMsg == 0) {
      return message.reply('One does not simply delete 0 messages!');
    } else if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      const errorEmbed = new Discord.MessageEmbed()
        .setTitle('Error:')
        .addField(
          'Insufficient permissions:',
          `You don\'t have the necessary permissions to manage messages.`,
          false,
        )
        .setColor('#DD1627');
      return message.channel.send(errorEmbed);
    } else {
      message.delete();
      let noOfMessages: number = parseInt(noofMsg);
      message.channel.bulkDelete(noOfMessages);
    }
  }
}
