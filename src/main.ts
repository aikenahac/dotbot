import Discord from 'discord.js';
import dotenv from 'dotenv';
import { Player } from 'discord-music-player';
import { Logger } from 'tslog';
import { specialUsers } from './config.json';
import {
  helpMenu,
  specialHelp,
  clearFunction,
  kickUser,
  banUser,
  sendMessage,
  spamUser,
  coinFlip,
  sendRedditMeme,
  sendRule34,
} from './commands';

import {
  play,
  playlist,
  nowPlaying,
  clearQueue,
  seekTime,
  queue,
  skip,
  remove,
  pause,
  resume,
  stop,
  shuffle,
  loopSong,
  loopQueue,
  setVolume,
  progress,
} from './music';

dotenv.config();

export const client = new Discord.Client();

const log = new Logger();

const token = process.env.TOKEN_DISCORD;
const prefix = process.env.PREFIX;

const player: Player = new Player(client, {
  leaveOnEmpty: false,
  deafenOnJoin: true,
  leaveOnEnd: false,
  leaveOnStop: true,
  quality: 'high',
  timeout: 0,
  volume: 100,
});

client.login(token).then(() => log.info('Logged in!'));

client.on('ready', () => {
  log.info('Logged in as ' + client.user.tag);
  client.user
    .setActivity({
      name: 'db!help',
      type: 'LISTENING',
    })
    .then(() => log.info('Activity set!'));
});

player
  .on('songAdd', (message, queue, song) => {
    const songEmbed = new Discord.MessageEmbed()
      .setTitle(`${song.name} by ${song.author} was added to queue`)
      .setURL(`${song.url}`)
      .setAuthor(
        'Aiken Tine Ahac',
        'https://avatars.githubusercontent.com/u/30961404?s=460&v=4',
        'https://github.com/aikenahac/',
      )
      .setThumbnail(`${song.thumbnail}`)
      .setFooter(`Requested by ${song.requestedBy}`)
      .setTimestamp()
      .setColor('#FF5D96');

    message.channel.send(songEmbed);
  })
  .on('songFirst', (message, song) => {
    const songEmbed = new Discord.MessageEmbed()
      .setTitle(`Now playing ${song.name} by ${song.author}`)
      .setURL(`${song.url}`)
      .setAuthor(
        'Aiken Tine Ahac',
        'https://avatars.githubusercontent.com/u/30961404?s=460&v=4',
        'https://github.com/aikenahac/',
      )
      .setThumbnail(`${song.thumbnail}`)
      .setFooter(`Requested by ${song.requestedBy}`)
      .setTimestamp()
      .setColor('#FF5D96');

    message.channel.send(songEmbed);
  })
  .on('playlistAdd', (message, queue, playlist) => {
    const playlistEmbed = new Discord.MessageEmbed()
      .setTitle(
        `${playlist.title} playlist with ${playlist.videoCount} songs has been added to the queue.`,
      )
      .setAuthor(
        'Aiken Tine Ahac',
        'https://avatars.githubusercontent.com/u/30961404?s=460&v=4',
        'https://github.com/aikenahac/',
      )
      .setThumbnail(
        'https://qtxasset.com/fiercebiotech/1568212087/connor-wells-534089-unsplash.jpg/connor-wells-534089-unsplash.jpg',
      )
      .setTimestamp()
      .setColor('#FF5D96');

    message.channel.send(playlistEmbed);
  });

client.on('message', async (message) => {
  log.info(
    `[${message.author.username}] ➤ ${message.content} [${message.guild.name}]`,
  );

  if (
    message.channel.id === '761291813070831659' &&
    (message.content.includes('http:') ||
      message.content.includes('paypal.com') ||
      message.content.includes('paypal.me'))
  ) {
    await message.delete();
  }
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (message.content.toLowerCase().includes('we ded') && !message.author.bot) {
    return message.channel.send('we ded');
  } else if (!message.content.startsWith(prefix) || message.author.bot) return;

  switch (command) {
    case 'help':
      helpMenu(message, args);
      break;
    case 'shelp':
      specialHelp(message);
      break;
    case 'clear':
      clearFunction(args, message);
      break;
    case 'kick':
      kickUser(message, args);
      break;
    case 'ban':
      banUser(message, args);
      break;
    case 'say':
      sendMessage(message, args, specialUsers);
      break;
    case 'spam':
      spamUser(message, args, specialUsers);
      break;
    case 'play':
      await play(message, player, args);
      break;
    case 'playlist':
      await playlist(message, player, args, false);
      break;
    case 'playlist-shuffle':
      await playlist(message, player, args, true);
      break;
    case 'song':
      await nowPlaying(message, player);
      break;
    case 'clear-queue':
      clearQueue(message, player);
      break;
    case 'skipto':
      await seekTime(message, player, args);
      break;
    case 'queue':
      queue(message, player);
      break;
    case 'skip':
      skip(message, player);
      break;
    case 'remove':
      remove(message, player, args);
      break;
    case 'pause':
      pause(message, player);
      break;
    case 'resume':
      resume(message, player);
      break;
    case 'stop':
    case 'die':
    case 'kys':
    case 'remove-urself':
    case 'umri':
    case 'crkn':
    case 'adios':
      stop(message, player);
      break;
    case 'shuffle':
      shuffle(message, player);
      break;
    case 'loop-song':
      loopSong(message, player);
      break;
    case 'loop':
      loopQueue(message, player);
      break;
    case 'volume':
      setVolume(message, player, args);
      break;
    case 'progress':
      progress(message, player);
      break;
    case 'coinflip':
      coinFlip(message);
      break;
    case 'meme':
      sendRedditMeme(message);
      break;
    case 'r34':
      sendRule34(message);
      break;
    default:
      const errorEmbed = new Discord.MessageEmbed()
        .setTitle('Error:')
        .addField('Command error:', `Unknown or unspecified command`, false)
        .setColor('#DD1627');
      return message.channel.send(errorEmbed);
  }
});
