import Discord from 'discord.js';

export const SpecialHelpEmbed = (message) =>
  new Discord.MessageEmbed()
    .setTitle(`Comands for special ppl:`)
    .setURL('https://github.com/aikenahac/dotbot')
    .setAuthor(
      'Aiken Tine Ahac',
      'https://avatars.githubusercontent.com/u/30961404?s=460&v=4',
      'https://github.com/aikenahac/',
    )
    .setThumbnail(
      'https://qtxasset.com/fiercebiotech/1568212087/connor-wells-534089-unsplash.jpg/connor-wells-534089-unsplash.jpg',
    )
    .addField('Prefix:', 'Use the db! prefix for your commands')
    .addFields(
      { name: '\u200B', value: '\u200B' },
      {
        name: 'spam',
        value: 'Spams specified user: `db!spam [user] [number]*`',
      },
      { name: 'say', value: 'Makes the bot say something: `db!say [message]`' },
      { name: '\u200B', value: '\u200B' },
      {
        name: 'Additional info',
        value: 'Arguments marked with * are optional',
      },
    )
    .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL)
    .setTimestamp()
    .setColor('#FF5D96');
