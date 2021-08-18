import Discord from 'discord.js';

export const HelpEmbed = (message) =>
  new Discord.MessageEmbed()
    .setTitle(`Help commands:`)
    .setURL('https://github.com/aikenahac/dotbot')
    .setAuthor(
      'Aiken Tine Ahac',
      'https://avatars.githubusercontent.com/u/30961404?s=460&v=4',
      'https://github.com/aikenahac/',
    )
    .setThumbnail(
      'https://cdn.discordapp.com/avatars/785432195413049374/fcabae17c37bf92aa220d8ed254ad09b.webp',
    )
    .addField('Prefix:', 'Use the db! prefix for your commands')
    .addFields(
      { name: '\u200B', value: '\u200B' },
      { name: 'Utils', value: 'Use db!help utils for more info.' },
      { name: 'Music', value: 'Use db!help music for more info.' },
      { name: 'Miscellaneous', value: 'Use db!help misc for more info.' },
      { name: '\u200B', value: '\u200B' },
    )
    .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL)
    .setTimestamp()
    .setColor('#F1C40F');
