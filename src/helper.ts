import fs from "fs";
import text2png from 'text2png';
import Discord from "discord.js";

export function deleteTempImage(message) {
    fs.unlinkSync( `src/tweetMedia/${message.author.id}.png`);
}

export function generateImage(message) {
    const author = message.author.tag;
    const content = message.content;

    fs.writeFileSync(`src/tweetMedia/${message.author.id}.png`, text2png(`Tweeted by: ${author}\n${content}`, {
        font: '40px Montserrat',
        localFontPath: 'src/tweetMedia/Montserrat-Regular.ttf',
        localFontName: 'Montserrat',
        backgroundColor: 'black',
        color: '#38C4E0',
        lineSpacing: 10,
        padding: 20
    }))
}

export const helpEmbed = (message) => new Discord.MessageEmbed()
    .setTitle(`Help commands:`)
    .setURL('https://github.com/aikenahac/dotbot')
    .setAuthor('Aiken Tine Ahac', 'https://avatars.githubusercontent.com/u/30961404?s=460&v=4', 'https://github.com/aikenahac/')
    .setThumbnail('https://cdn.discordapp.com/avatars/785432195413049374/fcabae17c37bf92aa220d8ed254ad09b.webp')
    .addField(
        'Prefix:',
        'Use the db! prefix for your commands'
    )
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'Utils', value: 'Use db!help utils for more info.' },
        { name: 'Music', value: 'Use db!help music for more info.' },
        { name: '\u200B', value: '\u200B' },
    )
    .addField(
        'Additional info',
        'Arguments marked with * are optional\nCommands marked with ** require permissions'
    )
    .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL)
    .setTimestamp()
    .setColor('#F1C40F')

export const helpEmbedUtils = (message) => new Discord.MessageEmbed()
    .setTitle(`Utils help commands:`)
    .setURL('https://github.com/aikenahac/dotbot')
    .setAuthor('Aiken Tine Ahac', 'https://avatars.githubusercontent.com/u/30961404?s=460&v=4', 'https://github.com/aikenahac/')
    .setThumbnail('https://cdn.discordapp.com/avatars/785432195413049374/fcabae17c37bf92aa220d8ed254ad09b.webp')
    .addField(
        'Prefix:',
        'Use the db! prefix for your commands'
    )
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'help', value: 'Displays this help section' },
        { name: 'shelp', value: 'Displays the special help section' },
        { name: 'clear', value: 'Clears the specified number of messages: `db!clear [number]* |**`' },
        { name: 'kick', value: 'Kicks specified user: `db!kick [user] [reason]* |**`' },
        { name: 'ban', value: 'Bans specified user: `db!ban [user] [reason]* |**`' },
        { name: '\u200B', value: '\u200B' },
    )
    .addField(
        'Additional info',
        'Arguments marked with * are optional\nCommands marked with ** require permissions'
    )
    .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL)
    .setTimestamp()
    .setColor('#F1C40F')

export const helpEmbedMusic = (message) => new Discord.MessageEmbed()
    .setTitle(`Music help commands:`)
    .setURL('https://github.com/aikenahac/dotbot')
    .setAuthor('Aiken Tine Ahac', 'https://avatars.githubusercontent.com/u/30961404?s=460&v=4', 'https://github.com/aikenahac/')
    .setThumbnail('https://cdn.discordapp.com/avatars/785432195413049374/fcabae17c37bf92aa220d8ed254ad09b.webp')
    .addField(
        'Prefix:',
        'Use the db! prefix for your commands'
    )
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'play', value: 'Plays a song `db!play [song]*`' },
        { name: 'playlist', value: 'Plays a playlist `db!playlist [playlistURL]*`' },
        { name: 'playlist-shuffle', value: 'Shuffles a playlist `db!playlist-shuffle [playlistURL]*`' },
        { name: 'song', value: 'Displays current track `db!song`' },
        { name: 'clear-queue', value: 'Clears queue `db!clear-queue`' },
        { name: 'skipto', value: 'Skips to specified second of track `db!skipto [seconds]*`' },
        { name: 'queue', value: 'Displays queue `db!queue`' },
        { name: 'skip', value: 'Skips current track `db!skip`' },
        { name: 'remove', value: 'Removes track from queue `db!remove [trackID]*`' },
        { name: 'pause', value: 'Pauses current track `db!pause`' },
        { name: 'resume', value: 'Resumes paused track `db!resume`' },
        { name: 'stop', value: 'Clears queue and leaves call `db!stop`' },
        { name: 'shuffle', value: 'Shuffles queue `db!shuffle`' },
        { name: 'loop-song', value: 'Toggles looping of current song `db!loop-song`' },
        { name: 'loop', value: 'Toggles looping of queue `db!loop`' },
        { name: 'volume', value: 'Changes volume `db!volume [number (Between 0 and 200)]`' },
        { name: 'progress', value: 'Displays progress bar `db!progress`' },
        { name: '\u200B', value: '\u200B' },
    )
    .addField(
        'Additional info',
        'Arguments marked with * are optional\nCommands marked with ** require permissions'
    )
    .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL)
    .setTimestamp()
    .setColor('#F1C40F')

export const specialHelpEmbed = (message) => new Discord.MessageEmbed()
    .setTitle(`Comands for special ppl:`)
    .setURL('https://github.com/aikenahac/dotbot')
    .setAuthor('Aiken Tine Ahac', 'https://avatars.githubusercontent.com/u/30961404?s=460&v=4', 'https://github.com/aikenahac/')
    .setThumbnail('https://qtxasset.com/fiercebiotech/1568212087/connor-wells-534089-unsplash.jpg/connor-wells-534089-unsplash.jpg')
    .addField(
        'Prefix:',
        'Use the db! prefix for your commands'
    )
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'spam', value: 'Spams specified user: `db!spam [user] [number]*`' },
        { name: 'say', value: 'Makes the bot say something: `db!say [message]`' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Additional info', value: 'Arguments marked with * are optional' }
    )
    .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL)
    .setTimestamp()
    .setColor('#FF5D96')