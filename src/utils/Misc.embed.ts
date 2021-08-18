import Discord from 'discord.js';

export const HelpEmbedMisc = (message) =>
  new Discord.MessageEmbed()
    .setTitle(`Utils help commands:`)
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
      {
        name: 'instagram',
        value: 'Displays Instagram accoun info: `db!instagram [username]`',
      },
      {
        name: 't2i',
        value: 'Turns text after command into image: `db!t2i [text]`',
      },
      { name: '\u200B', value: '\u200B' },
    )
    .addField(
      'Additional info',
      'Arguments marked with * are optional\nCommands marked with ** require permissions',
    )
    .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL)
    .setTimestamp()
    .setColor('#F1C40F');
