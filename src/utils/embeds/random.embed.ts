import { MessageEmbed } from 'discord.js';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';

const conf: any = load(readFileSync('./config.yml', 'utf8'));

function sendRandom(num: number) {
  const numberEmbed = new MessageEmbed()
    .setColor(conf.embedColor)
    .setDescription(`You got: ${num}`)
    .setTimestamp();

  return numberEmbed;
}

export default sendRandom;
