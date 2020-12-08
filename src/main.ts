import Discord from 'discord.js';
import dotenv from 'dotenv';
import { type } from 'os';
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
  client.user.setActivity(
    {
      name: 'your problems',
      type: 'LISTENING'
    }
  );
});

client.on('message', message => {
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if(message.content.toLowerCase().includes("we ded") && !message.author.bot) {
    return message.channel.send("we ded");
  }

  else if (!message.content.startsWith(prefix) || message.author.bot) return;

  else if (command == "clear") {
    if (args.length > 1) {
      return message.channel.send(`Please set only one argument ${message.author}`);
    } else if (args.length == 0) {
      return message.channel.send(`Please set how many messages you would like to delete`);
    } else if (message.channel.type == "dm") {
      return message.reply("You can't clear here, sorry");
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
    let botRoles = message.guild.me.roles.cache.array();
    let userRoles = message.mentions.members.first().roles.highest;
    let senderRoles = message.member.roles.highest;

    let reason = (args.slice(1)).join(" ");

    if (reason == "") {
      reason = "No reason provided";
    }
    CommandHandler.kickUser(message, reason, botRoles, userRoles, senderRoles);
  }
  
  else if (command == "args") {
    if (args.length == 0) {
      return message.channel.send("Whose ID do you want?");
    } else {
      let reason = (args.slice(1)).join(" ");
      
      console.log(`User ID: ${message.mentions.users.first().id}`);
      console.log(reason);
      if (reason == "") console.log("null");
    }
  }

  else if (command == "ban") {
    let botRoles = message.guild.me.roles.cache.array();
    let userRoles = message.mentions.members.first().roles.highest;
    let senderRoles = message.member.roles.highest;

    let reason = (args.slice(1)).join(" ");

    if (reason == "") {
      reason = "No reason provided";
    }
    CommandHandler.banUser(message, reason, botRoles, userRoles, senderRoles);
  }

  else if (command == "say") {
    if (args.length == 0) {
      const errorEmbed = new Discord.MessageEmbed()
        .setTitle('Error:')
        .addField(
          'Missing arguments:',
          `Please provide what you want me to say`,
          false
        )
        .setColor('#DD1627')
      return message.channel.send(errorEmbed);
    } else {
      CommandHandler.sendMessage(message, args.join(" "));
    }
  }

  else {
    const errorEmbed = new Discord.MessageEmbed()
      .setTitle('Error:')
      .addField(
        'Command error:',
        `Unknown or unspecified command`,
        false
      )
      .setColor('#DD1627')
    return message.channel.send(errorEmbed);
  }
});