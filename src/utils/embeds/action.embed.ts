import { EmbedBuilder } from 'discord.js';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';

const conf: any = load(readFileSync('./config.yml', 'utf8'));

function sendActionEmbed(
  member: string,
  moderator: string,
  reason: string,
  type: string,
) {
  let field1: string = '';
  let field2: string = '';

  switch (type) {
    case 'warn':
      field1 = 'Warned';
      field2 = 'Warned by';
      break;
    case 'kick':
      field1 = 'Kicked';
      field2 = 'Kicked by';
      break;
    case 'ban':
      field1 = 'Banned';
      field2 = 'Banned by';
      break;
    case 'softban':
      field1 = 'Softbanned';
      field2 = 'Softbanned by';
      break;
  }

  const actionEmbed = new EmbedBuilder()
    .setColor(conf.embedColor)
    .addFields(
      { name: field1, value: `<@${member}>`, inline: false },
      { name: field2, value: `<@${moderator}>`, inline: false },
      { name: 'Reason', value: reason, inline: false },
    )
    .setTimestamp();

  return actionEmbed;
}

export default sendActionEmbed;
