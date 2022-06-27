import {
  Client,
  Collection,
  Intents,
  Interaction,
  Message,
  GuildMember,
  Channel,
} from 'discord.js';
import dotenv from 'dotenv';
import { Player } from 'discord-music-player';
import { Logger } from 'tslog';
import { readdirSyncRecursive } from './utils';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';

const conf: any = load(readFileSync('./config.yml', 'utf8'));

dotenv.config();

export const client: any = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
  ],
});

const log = new Logger();

const token = process.env.TOKEN;

const player: Player = new Player(client, {
  leaveOnEmpty: false,
  deafenOnJoin: true,
  leaveOnEnd: false,
  leaveOnStop: true,
  quality: 'high',
  timeout: 0,
  volume: 100,
});

client.player = player;

client.commands = new Collection();
const commandFiles: string[] = readdirSyncRecursive('./src/commands', '.ts');

commandFiles.forEach((file: string) => {
  const command = require(`.${file}`);
  if (command.data) client.commands.set(command.data.name, command);
});

client.on('ready', () => {
  log.info('Logged in as ' + client.user.tag);
  client.user.setActivity({
    name: '/help',
    type: 'LISTENING',
  });
});

client.on('guildMemberAdd', async (member: GuildMember) => {
  if (member.guild.id === '990929676077768704') {
    member.roles.add('990936077189672970');
  }
});

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return;

  log.info(
    `[${message.author.username}] ➤ ${message.content} [${message.guild.name}]`,
  );
});

client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.channel!.type != 'GUILD_TEXT') return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction, client);
  } catch (error: any) {
    log.error(error);

    if (error.httpStatus === 401) {
      return interaction.reply({
        content: `Sorry, but I'm missing some permissions for this command.`,
        ephemeral: true,
      });
    }

    return interaction.reply({
      content: `Sorry, I ran into an error.`,
      ephemeral: true,
    });
  }
});

client.login(token);
