import { MessageEmbed } from 'discord.js';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';

const conf: any = load(readFileSync('./config.yml', 'utf8'));

function sendMuteAction(
  muter: string,
  muted: string,
  reason: string,
  action: string,
) {
  let actionType: string = '';

  switch (action) {
    case 'mute':
      actionType = `<@${muter}> muted <@${muted}>.`;
      break;
    case 'unmute':
      actionType = `<@${muter}> unmuted <@${muted}>.`;
      break;
  }

  const actionEmbed = new MessageEmbed()
    .setColor(conf.embedColor)
    .addField('New mute', actionType, false)
    .addField('Reason', `${reason}`, false)
    .setTimestamp();

  return actionEmbed;
}

export default sendMuteAction;
