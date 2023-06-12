import { SlashCommandBuilder } from '@discordjs/builders';
import { Interaction } from 'discord.js';
import { MusicPlayer } from '../../utils';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('playlist')
    .setDescription('Plays a playlist.')
    .addStringOption((option) =>
      option
        .setName('playlist')
        .setDescription('YouTube playlist URL.')
        .setRequired(true),
    ),
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const playlist: string = (await interaction.options.get('playlist')
      .value) as string;

    await MusicPlayer.playlist(interaction, playlist);
  },
};
