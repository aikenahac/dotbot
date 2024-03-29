import { SlashCommandBuilder } from '@discordjs/builders';
import { GuildMember, Interaction, PermissionsBitField } from 'discord.js';
import { sendActionEmbed } from '../../utils/embeds';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a user from the server.')
    .addUserOption((option) =>
      option.setName('target').setDescription('Kick target.').setRequired(true),
    )
    .addStringOption((option) =>
      option.setName('reason').setDescription('Reason for the kick.'),
    ),
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const target = await interaction.options.getUser('target');
    const reason: string = (await interaction.options.get('reason')
      .value) as string;

    const member: GuildMember = await interaction.guild.members.fetch(
      interaction.user.id,
    );

    if (member.permissions.has(PermissionsBitField.Flags.KickMembers, true)) {
      await interaction.guild.members.kick(target, reason);

      interaction.reply({
        embeds: [
          sendActionEmbed(target.id, interaction.user.id, reason, 'kick'),
        ],
      });
    } else {
      interaction.reply({
        content: `You're missing the permissions to kick people.`,
        ephemeral: true,
      });
    }
  },
};
