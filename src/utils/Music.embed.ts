import Discord from 'discord.js';

export const HelpEmbedMusic = (message) =>
  new Discord.MessageEmbed()
    .setTitle(`Music help commands:`)
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
      { name: 'play', value: 'Plays a song `db!play [song]*`' },
      {
        name: 'playlist',
        value: 'Plays a playlist `db!playlist [playlistURL]*`',
      },
      {
        name: 'playlist-shuffle',
        value: 'Shuffles a playlist `db!playlist-shuffle [playlistURL]*`',
      },
      { name: 'song', value: 'Displays current track `db!song`' },
      { name: 'clear-queue', value: 'Clears queue `db!clear-queue`' },
      {
        name: 'skipto',
        value: 'Skips to specified second of track `db!skipto [seconds]*`',
      },
      { name: 'queue', value: 'Displays queue `db!queue`' },
      { name: 'skip', value: 'Skips current track `db!skip`' },
      {
        name: 'remove',
        value: 'Removes track from queue `db!remove [trackID]*`',
      },
      { name: 'pause', value: 'Pauses current track `db!pause`' },
      { name: 'resume', value: 'Resumes paused track `db!resume`' },
      { name: 'stop', value: 'Clears queue and leaves call `db!stop`' },
      { name: 'shuffle', value: 'Shuffles queue `db!shuffle`' },
      {
        name: 'loop-song',
        value: 'Toggles looping of current song `db!loop-song`',
      },
      { name: 'loop', value: 'Toggles looping of queue `db!loop`' },
      {
        name: 'volume',
        value: 'Changes volume `db!volume [number (Between 0 and 200)]`',
      },
      { name: 'progress', value: 'Displays progress bar `db!progress`' },
      { name: '\u200B', value: '\u200B' },
    )
    .addField(
      'Additional info',
      'Arguments marked with * are optional\nCommands marked with ** require permissions',
    )
    .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL)
    .setTimestamp()
    .setColor('#F1C40F');
