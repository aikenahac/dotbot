import { SlashCommandBuilder } from '@discordjs/builders';
import { sendClearEmbed } from '../../utils/embeds';
import { Logger } from 'tslog';
import {
  ChannelType,
  GuildMember,
  Interaction,
  PermissionsBitField,
} from 'discord.js';

const log = new Logger();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clear messages from a channel.')
    .addNumberOption((option) =>
      option
        .setName('count')
        .setDescription('The amount of messages to delete.'),
    ),
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;
    if (interaction.channel!.type != ChannelType.GuildText) return;

    const count: number =
      (interaction.options.get('count').value as number) || 5;

    const member: GuildMember = await interaction.guild.members.fetch(
      interaction.user.id,
    );

    if (member.permissions.has(PermissionsBitField.Flags.KickMembers, true)) {
      if (count === 0) {
        await interaction.reply({
          content: `You can't delete 0 messages.`,
          ephemeral: true,
        });

        return;
      }

      interaction.channel
        .bulkDelete(count)
        .then(() => {
          interaction.reply({
            embeds: [sendClearEmbed(count)],
          });
        })
        .catch((e: any) => {
          log.error(e);

          interaction.reply({
            content: `I ran into an error: ${e.message}`,
            ephemeral: true,
          });
        });
    } else {
      interaction.reply({
        content: `You're missing the permissions to clear messages.`,
        ephemeral: true,
      });
    }
  },
};
