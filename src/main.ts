import Discord from 'discord.js';
import dotenv from 'dotenv';
import { parse } from 'path';
import CommandHandler from './commands';


dotenv.config();

const client = new Discord.Client();

const token = process.env.TOKEN;
const prefix = process.env.PREFIX;

client.on('guildMemberAdd', (guildMember) => {
  guildMember.roles.set(['496717215756845056']);
});

client.login(token);

client.on('ready', () => {
  console.log('Logged in as ' + client.user.tag);
});

client.on('message', message => {

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  else if (command == "clear") {
    if (args.length > 1) {
      return message.channel.send(`Please set only one argument ${message.author}`);
    } else if (args.length == 0) {
      return message.channel.send(`Please set how many messages you would like to delete`);
    } else if (message.channel.type == "dm") {
      return message.reply("You can't bulk delete here, sorry");
    }else{
      CommandHandler.clearFunction(args[0], message);
    }
  }

  else if (command == "print") {
    if (args.length == 0) {
      return message.channel.send("Whose ID do you want?");
    } else {
      console.log(`User ID: ${message.mentions.users.first().id}`);
      return message.channel.send(`User: ${args}`);
    }
  }

  else if (command == "kick") {
    CommandHandler.kickUser(message);
  }
});