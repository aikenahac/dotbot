import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

import { Logger } from 'tslog';
import { config } from 'dotenv';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';
import { readdirSyncRecursive } from './utils';

config();

const conf: any = load(readFileSync('./config.yml', 'utf8'));

const clientToken = process.env.TOKEN || '';

const clientID = conf.clientID || '';
const guildID = conf.guildID || '';

const log = new Logger();

const commands: string[] = [];
const commandFiles = readdirSyncRecursive('./src/commands', '.ts');

commandFiles.forEach((file: string) => {
  const command = require(`.${file}`);

  if (command.data) commands.push(command.data.toJSON());
});

const rest = new REST({ version: '9' }).setToken(clientToken);

rest
  .put(Routes.applicationGuildCommands(clientID, guildID), {
    body: commands,
  })
  .then(() => log.info('Successfully registered application commands.'))
  .catch(console.error);
