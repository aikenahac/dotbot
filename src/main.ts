import Discord from 'discord.js';
import dotenv from 'dotenv';
import OAuth from 'oauth';
import CommandHandler from './commands';


dotenv.config();

const client = new Discord.Client();

const token = process.env.TOKEN_DISCORD;
const prefix = process.env.PREFIX;

const twitter_api_key = process.env.API_KEY_TWITTER;
const twitter_app_secret = process.env.APP_SECRET_TWITTER;

const twitter_personal_api_key = process.env.TWITTER_PERSONAL_API_KEY;
const twitter_personal_app_secret = process.env.TWITTER_PERSONAL_APP_SECRET;

const twitter_user_access_token = process.env.TWITTER_ACCESS_TOKEN;
const twitter_user_secret = process.env.TWITTER_USER_SECRET;

const twitter_personal_access_token = process.env.TWITTER_PERSONAL_ACCESS_TOKEN;
const twitter_personal_user_secret = process.env.TWITTER_PERSONAL_USER_SECRET;

const channelID = process.env.ACHANNEL;

let status = '';

const oauth = new OAuth.OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	twitter_api_key,
	twitter_app_secret,
	'1.0A',
	null,
	'HMAC-SHA1'
);

const oauthPersonal = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  twitter_personal_api_key,
  twitter_personal_app_secret,
  '1.0A',
	null,
	'HMAC-SHA1'
)

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

  else if (message.channel.id == channelID && !message.content.startsWith(`${prefix}`) && !message.author.bot) {
    CommandHandler.algebruhTweet(
      twitter_user_access_token,
      twitter_user_secret,
      message,
      oauth
    )
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

  else if (command == "kick") {
    let botRoles = message.guild.me.roles.cache.array();
    let userRoles = message.mentions.members.first().roles.highest;
    let senderRoles = message.member.roles.highest;
    let defaultRole = message.guild.roles.cache.find(role => role.name === "[db!] DotBot");

    let reason = (args.slice(1)).join(" ");

    if (reason == "") {
      reason = "No reason provided";
    }
    CommandHandler.kickUser(message, reason, botRoles, userRoles, senderRoles, defaultRole);
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
    let defaultRole = message.guild.roles.cache.find(role => role.name === "[db!] DotBot");

    let reason = (args.slice(1)).join(" ");

    if (reason == "") {
      reason = "No reason provided";
    }
    CommandHandler.banUser(message, reason, botRoles, userRoles, senderRoles, defaultRole);
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
    } else if (message.author.id === '315446934502506497'){
      CommandHandler.sendMessage(message, args.join(" "));
    } else {
      const errorEmbed = new Discord.MessageEmbed()
        .setTitle('Error:')
        .addField(
          'Missing perms:',
          `Nisi moj očka! You can't control me!!!`,
          false
        )
        .setColor('#DD1627')
      return message.channel.send(errorEmbed);
    }
  }

  else if (command == "spam") {
    let userSpammed = message.mentions.users.first().id;

    if (args.length == 0) {
      const errorEmbed = new Discord.MessageEmbed()
        .setTitle('Error:')
        .addField(
          'Missing arguments:',
          `Please provide who you want to spam.`,
          false
        )
        .setColor('#DD1627')
      return message.channel.send(errorEmbed);
    } else {
      CommandHandler.spamUser(message, userSpammed, args[1]);
    }
  }

  else if (command == 'tweet') {
    status = args.join(' ');

    CommandHandler.personalTweet(
      twitter_personal_access_token,
      twitter_personal_user_secret,
      status,
      message,
      oauthPersonal
    )
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