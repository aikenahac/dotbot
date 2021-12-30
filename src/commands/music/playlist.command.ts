import { SlashCommandBuilder } from '@discordjs/builders';
import { Interaction } from 'discord.js';
import { MusicPlayer } from '../../utils';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('playlist')
    .setDescription('Plays a playlist.')
    .addStringOption((option) =>
      option.setName('playlist').setDescription('Which playlist?'),
    ),
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const playlist: string = await interaction.options.getString('playlist');

    await MusicPlayer.playlist(interaction, playlist);
  },
};
