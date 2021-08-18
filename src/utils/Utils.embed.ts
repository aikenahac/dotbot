import Discord from 'discord.js';

export const HelpEmbedUtils = (message) =>
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
      { name: 'help', value: 'Displays this help section' },
      { name: 'shelp', value: 'Displays the special help section' },
      {
        name: 'clear',
        value:
          'Clears the specified number of messages: `db!clear [number]* |**`',
      },
      {
        name: 'kick',
        value: 'Kicks specified user: `db!kick [user] [reason]* |**`',
      },
      {
        name: 'ban',
        value: 'Bans specified user: `db!ban [user] [reason]* |**`',
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
