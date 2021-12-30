import { SlashCommandBuilder } from '@discordjs/builders';
import { Interaction } from 'discord.js';
import { MusicPlayer } from '../../utils';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shuffle')
    .setDescription('Shuffles the queue.'),
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    await MusicPlayer.shuffle(interaction);
  },
};
