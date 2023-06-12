import { EmbedBuilder } from 'discord.js';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';

const conf: any = load(readFileSync('./config.yml', 'utf8'));

function sendClearEmbed(count: number) {
  const actionEmbed = new EmbedBuilder()
    .setColor(conf.embedColor)
    .setDescription(`${count} messages deleted.`)
    .setTimestamp();

  return actionEmbed;
}

export default sendClearEmbed;
