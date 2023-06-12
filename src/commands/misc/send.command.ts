import { SlashCommandBuilder } from '@discordjs/builders';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';
import { Interaction, EmbedBuilder } from 'discord.js';

const conf: any = load(readFileSync('./config.yml', 'utf8'));

const specialUsers: string[] = conf.specialUsers;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('send')
    .setDescription("Sends messages. That's it...")
    .addStringOption((option) =>
      option
        .setName('content')
        .setDescription('What do you want me to say?')
        .setRequired(true),
    ),
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const content: string = (await interaction.options.get('content')
      .value) as string;

    let validUser;
    for (let i = 0; i < specialUsers.length; i++) {
      if (interaction.user.id === specialUsers[i]) {
        validUser = true;
        break;
      } else validUser = false;
    }

    if (validUser) {
      interaction.reply({
        content: 'Sent message',
        ephemeral: true,
      });
      return interaction.channel.send(content);
    } else {
      const errorEmbed = new EmbedBuilder()
        .setTitle('Error:')
        .addFields({
          name: 'Missing perms:',
          value: `Nisi tok kul! You can't control me!!!`,
          inline: false,
        })
        .setColor('#DD1627');
      return interaction.reply({
        embeds: [errorEmbed],
        ephemeral: true,
      });
    }
  },
};
