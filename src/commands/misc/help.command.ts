import { SlashCommandBuilder } from '@discordjs/builders';
import { Interaction } from 'discord.js';
import { Help } from '../../utils/embeds';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows help.')
    .addStringOption((option) =>
      option
        .setName('selection')
        .setDescription('Which help do you want do display?')
        .addChoices(
          { name: 'Help for misc commands', value: 'misc' },
          { name: 'Help for music commands', value: 'music' },
          { name: 'Help for moderation commands', value: 'moderation' },
          { name: 'Help for special commands', value: 'special' },
        ),
    ),
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const selection: string = interaction.options.get('selection')
      .value as string;

    console.log(selection);

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
