import { MessageEmbed } from 'discord.js';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';

const conf: any = load(readFileSync('./config.yml', 'utf8'));

function sendInfoEmbed(member: any) {
  const warningEmbed = new MessageEmbed()
    .setColor(conf.embedColor)
    .setTitle(`${member.nickname || member.user.username}`)
    .setThumbnail(`${member.user.avatarURL()}`)
    .addFields(
      { name: '\u200B', value: '\u200B' },
      { name: 'Full username', value: `${member.user.tag}`, inline: false },
      { name: 'Joined at', value: `${member.joinedAt}`, inline: false },
      { name: 'Created at', value: `${member.user.createdAt}`, inline: false },
      { name: '\u200B', value: '\u200B' },
      {
        name: 'Roles',
        value: `${member.roles.member._roles
          .map((role: any) => `<@&${role}>`)
          .join('\n')}`,
        inline: false,
      },
    )
    .setTimestamp();

  return warningEmbed;
}

export default sendInfoEmbed;
