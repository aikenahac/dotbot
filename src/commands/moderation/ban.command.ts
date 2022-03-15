import { SlashCommandBuilder } from '@discordjs/builders';
import { GuildMember, Interaction } from 'discord.js';
import { sendActionEmbed } from '../../utils/embeds';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans a user from the server.')
    .addUserOption((option) =>
      option.setName('target').setDescription('Ban target.').setRequired(true),
    )
    .addStringOption((option) =>
      option.setName('reason').setDescription('Reason for the ban.'),
    ),
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const target = await interaction.options.getUser('target');
    const reason: string = await interaction.options.getString('reason');

    const member: GuildMember = await interaction.guild.members.fetch(
      interaction.user.id,
    );

    if (member.permissions.has('BAN_MEMBERS', true)) {
      await interaction.guild.members.ban(target, { reason });

      interaction.reply({
        embeds: [
          sendActionEmbed(target.id, interaction.user.id, reason, 'ban'),
        ],
      });
    } else {
      interaction.reply({
        content: `You're missing the permissions to ban people.`,
        ephemeral: true,
      });
    }
  },
};
