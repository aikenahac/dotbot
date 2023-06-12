import { SlashCommandBuilder } from '@discordjs/builders';
import { Interaction } from 'discord.js';
import { sendRandom } from '../../utils/embeds';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('random')
    .setDescription("Returns a random number. That's it...")
    .addNumberOption((option) =>
      option.setName('min').setDescription('Minimum value.'),
    )
    .addNumberOption((option) =>
      option.setName('max').setDescription('Maximum value.'),
    ),
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    let min: number =
      ((await interaction.options.get('min')).value as number) || 0;
    let max: number =
      ((await interaction.options.get('max')).value as number) || 100;

    min = Math.ceil(min);
    max = Math.floor(max);

    const random: number = Math.floor(Math.random() * (max - min) + min);

    await interaction.reply({
      embeds: [sendRandom(random)],
    });
  },
};
