import { EmbedBuilder } from 'discord.js';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';

const conf: any = load(readFileSync('./config.yml', 'utf8'));

export function sendResult(result: number) {
  let text: string = '';

  switch (result) {
    case 1:
      text = 'heads';
      break;
    default:
      text = 'tails';
  }
  const headsEmbed = new EmbedBuilder()
    .setColor(conf.embedColor)
    .setDescription(`You flipped ${text}!`)
    .setTimestamp();

  return headsEmbed;
}
