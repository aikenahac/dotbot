import { SlashCommandBuilder } from '@discordjs/builders';
import { Interaction } from 'discord.js';
import { MusicPlayer } from '../../utils';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips a track.'),
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    await MusicPlayer.skip(interaction);
  },
};
