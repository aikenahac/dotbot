import { SlashCommandBuilder } from '@discordjs/builders';
import { sendMuteAction } from '../../utils/embeds';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';
import { Logger } from 'tslog';
import { Interaction, PermissionsBitField } from 'discord.js';

const log = new Logger();

const conf: any = load(readFileSync('./config.yml', 'utf8'));

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Unmutes a person.')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user to unmute.')
        .setRequired(true),
    ),
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const user = await interaction.options.getUser('user');

    const member = await interaction.guild.members.fetch(interaction.user.id);
    const muted = await interaction.guild.members.fetch(user.id);

    const role = interaction.guild.roles.cache.find(
      (r: any) => r.id === `${conf.muteRole}`,
    );

    if (member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      muted.roles
        .remove(role)
        .then(() => {
          interaction.reply({
            embeds: [
              sendMuteAction(user.id, interaction.user.id, '/', 'unmute'),
            ],
          });
        })
        .catch((e: any) => {
          log.info('There was an error.');

          return interaction.reply({
            content: `Sorry, I ran into an error.`,
            ephemeral: true,
          });
        });
    } else {
      interaction.reply({
        content: `You're missing the permissions to mute people.`,
        ephemeral: true,
      });
    }
  },
};
