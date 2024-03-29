import { EmbedBuilder } from 'discord.js';
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

  const actionEmbed = new EmbedBuilder()
    .setColor(conf.embedColor)
    .addFields(
      { name: 'New mute', value: actionType, inline: false },
      { name: 'Reason', value: reason, inline: false },
    )
    .setTimestamp();

  return actionEmbed;
}

export default sendMuteAction;
