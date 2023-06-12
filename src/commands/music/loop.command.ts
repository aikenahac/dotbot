import {
  SlashCommandBuilder,
  SlashCommandStringOption,
} from '@discordjs/builders';
import { Interaction } from 'discord.js';
import { MusicPlayer } from '../../utils';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('loop')
    .setDescription('Removes the loop.')
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName('action')
        .setDescription('What to do.')
        .addChoices(
          { name: 'Loop current song', value: 'song' },
          { name: 'Loop entire queue', value: 'queue' },
          { name: 'Stop loop', value: 'stop' },
        )
        .setRequired(true),
    ),
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const action: string = (await interaction.options.get('action')
      .value) as string;

    switch (action) {
      case 'song':
        await MusicPlayer.enableLoop(interaction);
        break;
      case 'queue':
        await MusicPlayer.enableQueueLoop(interaction);
        break;
      case 'stop':
        await MusicPlayer.disableLoop(interaction);
    }
  },
};
