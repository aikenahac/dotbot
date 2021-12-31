import {
  SlashCommandBuilder,
  SlashCommandStringOption,
} from '@discordjs/builders';
import { Interaction } from 'discord.js';
import { Help } from '../../utils/embeds';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows help.')
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName('selection')
        .setDescription('Which help do you want do display?')
        .addChoice('Help for misc commands', 'misc')
        .addChoice('Help for music commands', 'music')
        .addChoice('Help for moderation commands', 'moderation')
        .addChoice('Help for special commands', 'special'),
    ),
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const selection: string = await interaction.options.getString('selection');

    switch (selection) {
      case 'misc':
        interaction.reply({
          embeds: [Help.miscHelpEmbed()],
        });
        break;
      case 'music':
        interaction.reply({
          embeds: [Help.musicHelpEmbed()],
        });
        break;
      case 'moderation':
        interaction.reply({
          embeds: [Help.moderationHelpEmbed()],
        });
        break;
      case 'special':
        interaction.reply({
          embeds: [Help.specialHelpEmbed()],
        });
    }
  },
};
