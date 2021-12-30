import { Queue, RepeatMode, Song } from 'discord-music-player';
import { GuildMember, Interaction, MessageEmbed } from 'discord.js';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';
import { client } from '../main';
import { Logger } from 'tslog';

const conf: any = load(readFileSync('./config.yml', 'utf8'));

const log = new Logger();

export default class MusicPlayer {
  static async play(interaction: Interaction, track: string) {
    if (!interaction.isCommand()) return;

    const queue: Queue = client.player.createQueue(interaction.guildId);
    const guildQueue: Queue = client.player.getQueue(interaction.guildId);

    const member: GuildMember = await interaction!.guild!.members.fetch(
      interaction.user.id,
    );

    await queue.join(member.voice.channel);

    if (track === null)
      return interaction.reply({
        content: "You don't know how to use slash commands, do you?",
        ephemeral: true,
      });

    await interaction.reply('Adding track to queue...');

    const song: Song | any = await queue.play(track).catch((e: any) => {
      log.error(e);
      if (!guildQueue) queue.stop();
    });

    const embed = new MessageEmbed()
      .setColor(conf.embedColor)
      .setTitle(`${song.name}`)
      .setDescription(`by ${song.author}`)
      .setThumbnail(song.thumbnail)
      .setTimestamp();

    interaction.editReply({
      embeds: [embed],
    });
  }

  static async playlist(interaction: Interaction, playlist: string) {
    if (!interaction.isCommand()) return;

    const queue: Queue = client.player.createQueue(interaction.guildId);
    const guildQueue: Queue = client.player.getQueue(interaction.guildId);

    const member: GuildMember = await interaction!.guild!.members.fetch(
      interaction.user.id,
    );

    if (playlist === null)
      return interaction.reply({
        content: "You don't know how to use slash commands, do you?",
        ephemeral: true,
      });

    await queue.join(member.voice.channel);

    await interaction.reply('Adding playlist to queue...');

    const pl: any = await queue.playlist(playlist).catch((_: any) => {
      if (!guildQueue) queue.stop();
    });

    const embed = new MessageEmbed()
      .setColor(conf.embedColor)
      .setTitle(`${pl.name}`)
      .setDescription(`by ${pl.author}`)
      .setTimestamp();

    interaction.editReply({
      embeds: [embed],
    });
  }

  static async pause(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const guildQueue: Queue = client.player.getQueue(interaction.guildId);

    await guildQueue.setPaused(true);

    const embed = new MessageEmbed()
      .setColor(conf.embedColor)
      .setDescription(`Paused playback.`)
      .setTimestamp();

    interaction.reply({
      embeds: [embed],
    });
  }

  static async resume(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const guildQueue: Queue = client.player.getQueue(interaction.guildId);

    await guildQueue.setPaused(false);

    const embed = new MessageEmbed()
      .setColor(conf.embedColor)
      .setDescription(`Resumed playback.`)
      .setTimestamp();

    interaction.reply({
      embeds: [embed],
    });
  }

  static async skip(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const guildQueue: Queue = client.player.getQueue(interaction.guildId);

    await guildQueue.skip();

    const embed = new MessageEmbed()
      .setColor(conf.embedColor)
      .setDescription(`Skipped this track.`)
      .setTimestamp();

    interaction.reply({
      embeds: [embed],
    });
  }

  static async stop(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const guildQueue: Queue = client.player.getQueue(interaction.guildId);

    await guildQueue.stop();

    const embed = new MessageEmbed()
      .setColor(conf.embedColor)
      .setDescription(`Stopped.`)
      .setTimestamp();

    interaction.reply({
      embeds: [embed],
    });
  }

  static async disableLoop(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const guildQueue: Queue = client.player.getQueue(interaction.guildId);

    await guildQueue.setRepeatMode(RepeatMode.DISABLED);

    const embed = new MessageEmbed()
      .setColor(conf.embedColor)
      .setDescription(`Removing the loop.`)
      .setTimestamp();

    interaction.reply({
      embeds: [embed],
    });
  }

  static async enableLoop(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const guildQueue: Queue = client.player.getQueue(interaction.guildId);

    await guildQueue.setRepeatMode(RepeatMode.SONG);

    const embed = new MessageEmbed()
      .setColor(conf.embedColor)
      .setDescription(`Looping the song.`)
      .setTimestamp();

    interaction.reply({
      embeds: [embed],
    });
  }

  static async enableQueueLoop(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const guildQueue: Queue = client.player.getQueue(interaction.guildId);

    await guildQueue.setRepeatMode(RepeatMode.QUEUE);

    const embed = new MessageEmbed()
      .setColor(conf.embedColor)
      .setDescription(`Looping the queue.`)
      .setTimestamp();

    interaction.reply({
      embeds: [embed],
    });
  }

  static async clearQueue(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const guildQueue: Queue = client.player.getQueue(interaction.guildId);

    await guildQueue.clearQueue();

    const embed = new MessageEmbed()
      .setColor(conf.embedColor)
      .setDescription(`Cleared the queue.`)
      .setTimestamp();

    interaction.reply({
      embeds: [embed],
    });
  }

  static async shuffle(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const guildQueue: Queue = client.player.getQueue(interaction.guildId);

    await guildQueue.shuffle();

    const embed = new MessageEmbed()
      .setColor(conf.embedColor)
      .setDescription(`Shuffled the queue.`)
      .setTimestamp();

    interaction.reply({
      embeds: [embed],
    });
  }

  static async getQueue(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const guildQueue: Queue = client.player.getQueue(interaction.guildId);

    console.log(guildQueue);

    const embed = new MessageEmbed()
      .setColor(conf.embedColor)
      .setDescription(`Queue:`)
      .setTimestamp();

    guildQueue.songs.forEach((song: Song) => {
      embed.addField(song.name, `by ${song.author}`);
    });

    interaction.reply({
      embeds: [embed],
    });
  }

  static async getCurrent(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const guildQueue: Queue = client.player.getQueue(interaction.guildId);
    const song: Song = guildQueue.nowPlaying;

    const embed = new MessageEmbed()
      .setColor(conf.embedColor)
      .setTitle(`Now playing: ${song.name}`)
      .setDescription(`by ${song.author}`)
      .setThumbnail(song.thumbnail)
      .setTimestamp();

    interaction.reply({
      embeds: [embed],
    });
  }
}
