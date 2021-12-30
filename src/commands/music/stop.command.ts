import { SlashCommandBuilder } from '@discordjs/builders';
import { Interaction } from 'discord.js';
import { MusicPlayer } from '../../utils';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops the thing.'),
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    await MusicPlayer.stop(interaction);
  },
};
