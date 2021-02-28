import Discord, { Message } from 'discord.js';
import dotenv from 'dotenv';
import OAuth from 'oauth';

import CommandHandler from './commands';
import MusicHandler from './music';

import { tunnel } from './config.json';

dotenv.config();

const queue = new Map();

const client = new Discord.Client();

const token = process.env.TOKEN_DISCORD;
const prefix = process.env.PREFIX;

const twitter_api_key = process.env.API_KEY_TWITTER;
const twitter_app_secret = process.env.APP_SECRET_TWITTER;

const twitter_user_access_token = process.env.TWITTER_ACCESS_TOKEN;
const twitter_user_secret = process.env.TWITTER_USER_SECRET;

let status = '';

let specialUsers = ['315446934502506497', '693392512521469973', '485111024404660235', '316963808792805376', '262846982588989450', '329309152872759297', '691930634733748226'];

const oauth = new OAuth.OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	twitter_api_key,
	twitter_app_secret,
	'1.0A',
	null,
	'HMAC-SHA1'
);

client.login(token);

client.once('ready', () => {
    console.log('Ready!');
});
client.once('reconnecting', () => {
    console.log('Reconnecting!');
});
client.once('disconnect', () => {
    console.log('Disconnect!');
});

client.on('ready', () => {
	console.log('Logged in as ' + client.user.tag);
	tunnel.forEach(channelId => initWebhooks(channelId))
	client.user.setActivity(
		{
			name: 'your problems',
			type: 'LISTENING'
		}
	);
});

client.on('message', message => {
	try {
		if (message.webhookID || !tunnel.includes(message.channel.id)) return null;
		
		const channels = tunnel.filter(id => id !== message.channel.id);

		channels.forEach(async channelId => {
			const channel = client.channels.cache.get(channelId) as Discord.TextChannel;

			const webhooks = await channel.fetchWebhooks();
			const webhook = webhooks.find(webhook => (webhook.owner as Discord.User).id  === client.user.id && webhook.name === 'DotBot-Hole')
			webhook.send(message.content || '', {
				username: message.author.username,
				avatarURL: message.author.avatarURL(),
				embeds: message.embeds
			})
		})
	} catch (error) {
		console.log("Uh oh you fucked up w/ the wormhole fucktard.")
		console.log("This is the error: " + error);
	}

	const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();
	const serverQueue = queue.get(message.guild.id);

	if(message.content.toLowerCase().includes("we ded") && !message.author.bot) {
		return message.channel.send("we ded");
	}

	else if (!message.content.startsWith(prefix) || message.author.bot) return;

	else if (command == "help") {
		CommandHandler.helpMenu(message);
	}

	else if (command == "shelp") {
		CommandHandler.specialHelp(message);
	}

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
			CommandHandler.sendMessage(message, args.join(" "), specialUsers);
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
		let userSpammed;

		if (!message.mentions.users.first()) {
			const errorEmbed = new Discord.MessageEmbed()
				.setTitle('Error:')
				.addField(
					'Invalid user:',
					`The user you have mentioned is either:\n  - not a user,\n  - not in this server`,
					false
				)
				.setColor('#DD1627')
			return message.channel.send(errorEmbed);
		} else {
			userSpammed = message.mentions.users.first().id;
		}

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
			CommandHandler.spamUser(message, userSpammed, args[1], specialUsers);
		}
	}

	else if (command == 'tweet') {
		status = args.join(' ');

		CommandHandler.personalTweet(
			twitter_user_access_token,
			twitter_user_secret,
			status,
			message,
			oauth
		)
	}

	else if (command == "play") return MusicHandler.execute(message, serverQueue, queue);
	else if (command == "skip") return MusicHandler.skip(message, serverQueue);
	else if (command == "stop" || command == "die") return MusicHandler.stop(message, serverQueue);

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

async function initWebhooks(channelId) {
	try {
		const channel = client.channels.cache.get(channelId) as Discord.TextChannel;
		const webhooks = await channel.fetchWebhooks();
		const myWebhooks = await webhooks.filter(webhook =>{
			if (!(webhook.owner as Discord.User).id) return;
			return (webhook.owner as Discord.User).id === client.user.id && webhook.name === "DotBot-Hole";

		})
		myWebhooks.forEach(webhook => webhook.delete(`DotBot is ded`))

		await channel.createWebhook('DotBot-Hole', {
			avatar: 'https://cdn.discordapp.com/avatars/785432195413049374/fcabae17c37bf92aa220d8ed254ad09b.png',
		})
	} catch (err) { 
		console.log(`Error in webhook creation: \n${err}`)
	}
}
