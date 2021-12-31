import { SlashCommandBuilder } from '@discordjs/builders';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';
import { Interaction, MessageEmbed, User } from 'discord.js';

const conf: any = load(readFileSync('./config.yml', 'utf8'));

const specialUsers: string[] = conf.specialUsers;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('spam')
    .setDescription('Spams a user with pings...')
    .addUserOption((option) =>
      option.setName('user').setDescription('Who do you want to spam?'),
    )
    .addNumberOption((option) =>
      option
        .setName('amount')
        .setDescription('How many times do you want to spam?'),
    ),
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const userSpammed: User = await interaction.options.getUser('user');
    const amount: number = (await interaction.options.getNumber('amount')) || 5;

    let validUser;
    for (let i = 0; i < specialUsers.length; i++) {
      if (interaction.user.id === specialUsers[i]) {
        validUser = true;
        break;
      } else validUser = false;
    }

    if (validUser) {
      interaction.reply({
        content: 'Spamming user.',
        ephemeral: true,
      });

      let ctr = 0;
      while (ctr < amount) {
        interaction.channel.send(`${userSpammed}`);
        ctr++;
      }
    } else {
      const errorEmbed = new MessageEmbed()
        .setTitle('Error:')
        .addField(
          'Missing perms:',
          `Nisi tok kul! You can't control me!!!`,
          false,
        )
        .setColor('#DD1627');
      return interaction.reply({
        embeds: [errorEmbed],
        ephemeral: true,
      });
    }
  },
};
