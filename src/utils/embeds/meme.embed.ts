import { MessageEmbed } from 'discord.js';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';

const conf: any = load(readFileSync('./config.yml', 'utf8'));

function sendImageResult(
  subRedditName: string,
  title: string,
  link: string,
  image: string,
) {
  const imageEmbed = new MessageEmbed()
    .setTitle(subRedditName)
    .setImage(image)
    .setColor(conf.embedColor)
    .setDescription(`[${title}](${link})`)
    .setURL(`https://reddit.com/${subRedditName}`)
    .setTimestamp();

  return imageEmbed;
}

export default sendImageResult;
