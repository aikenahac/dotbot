import { EmbedBuilder } from 'discord.js';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';

const conf: any = load(readFileSync('./config.yml', 'utf8'));

export default class Help {
  static miscHelpEmbed() {
    const embed = new EmbedBuilder()
      .setTitle(`Misc help commands:`)
      .setURL('https://github.com/aikenahac/dotbot')
      .setThumbnail(
        'https://cdn.discordapp.com/avatars/785432195413049374/fcabae17c37bf92aa220d8ed254ad09b.webp',
      )
      .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'meme', value: 'Sends a meme from reddit' },
        { name: 'conflip', value: 'Tosses a coin' },
        { name: 'random', value: 'Returns a random number' },
        { name: '||r34||', value: '||Sends a rule34 image [NSFW]||' },
        { name: '\u200B', value: '\u200B' },
      )
      .setTimestamp()
      .setColor(conf.embedColor);

    return embed;
  }

  static musicHelpEmbed() {
    const embed = new EmbedBuilder()
      .setTitle(`Music help commands:`)
      .setURL('https://github.com/aikenahac/dotbot')
      .setThumbnail(
        'https://cdn.discordapp.com/avatars/785432195413049374/fcabae17c37bf92aa220d8ed254ad09b.webp',
      )
      .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'play', value: 'Plays a song.' },
        {
          name: 'playlist',
          value: 'Plays a playlist.`',
        },
        {
          name: 'pause',
          value: 'Pauses currently playing',
        },
        { name: 'resume', value: 'Resumes currently playing' },
        { name: 'clear-queue', value: 'Clears queue' },
        {
          name: 'shuffle',
          value: 'Shuffles current queue',
        },
        { name: 'queue', value: 'Displays queue' },
        { name: 'skip', value: 'Skips current track' },
        { name: 'stop', value: 'Stops the music' },
        {
          name: 'song',
          value: 'Displays current song',
        },
        { name: 'loop', value: 'Options for loop' },
        { name: '\u200B', value: '\u200B' },
      )
      .setTimestamp()
      .setColor(conf.embedColor);

    return embed;
  }

  static moderationHelpEmbed() {
    const embed = new EmbedBuilder()
      .setTitle(`Moderation help commands:`)
      .setURL('https://github.com/aikenahac/dotbot')
      .setThumbnail(
        'https://cdn.discordapp.com/avatars/785432195413049374/fcabae17c37bf92aa220d8ed254ad09b.webp',
      )
      .addFields(
        { name: '\u200B', value: '\u200B' },
        {
          name: 'clear',
          value: 'Clears the specified number of messages',
        },
        {
          name: 'kick',
          value: 'Kicks specified user',
        },
        {
          name: 'ban',
          value: 'Bans specified user',
        },
        {
          name: 'mute',
          value: 'Mutes specified user',
        },
        {
          name: 'unmute',
          value: 'Unmutes specified user',
        },
        { name: '\u200B', value: '\u200B' },
      )
      .setTimestamp()
      .setColor(conf.embedColor);
    return embed;
  }

  static specialHelpEmbed() {
    const embed = new EmbedBuilder()
      .setTitle(`Special help commands:`)
      .setURL('https://github.com/aikenahac/dotbot')
      .setThumbnail(
        'https://qtxasset.com/fiercebiotech/1568212087/connor-wells-534089-unsplash.jpg/connor-wells-534089-unsplash.jpg',
      )
      .addFields(
        { name: '\u200B', value: '\u200B' },
        {
          name: 'spam',
          value: 'Spams specified user',
        },
        {
          name: 'send',
          value: 'Makes the bot say something',
        },
        { name: '\u200B', value: '\u200B' },
      )
      .setTimestamp()
      .setColor(conf.embedColor);
    return embed;
  }
}
