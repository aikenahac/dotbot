import Discord from "discord.js";
import { Logger } from 'tslog';

import {
	helpEmbed,
	helpEmbedUtils,
	helpEmbedMusic,
	specialHelpEmbed
} from "./helper";

const log = new Logger();

export function helpMenu(message, args) {
	switch (args[0]) {
		case 'utils':
			message.channel.send(helpEmbedUtils(message));
			break;
		case 'music':
			message.channel.send(helpEmbedMusic(message));
			break;
		default:
			message.channel.send(helpEmbed(message));
	}
}

export function specialHelp(message) {
	return message.channel.send(specialHelpEmbed(message));
}

export function clearFunction(args, message) {
	log.info("attempting message clear");

	const noofMsg = args[0];

	if (args.length > 1) {
		return message.channel.send(`Please set only one argument ${message.author}`);
	} else if (args.length == 0) {
		return message.channel.send(`Please set how many messages you would like to delete`);
	} else if (message.channel.type == "dm") {
		return message.reply("You can't clear here, sorry");
	} else {
		if (noofMsg == 0) {
			return message.reply("One does not simply delete 0 messages!");
		} else if(!message.member.hasPermission("MANAGE_MESSAGES")){
			const errorEmbed = new Discord.MessageEmbed()
				.setTitle('Error:')
				.addField(
					'Insufficient permissions:',
					`You don\'t have the necessary permissions to manage messages.`,
					false
				)
				.setColor('#DD1627')
			return message.channel.send(errorEmbed);
		} else {
			message.delete();
			let noOfMessages: number = parseInt(noofMsg);
			message.channel.bulkDelete(noOfMessages);
		}
	}
}

export function kickUser(message, args) {
	let botRoles = message.guild.me.roles.cache.array();
	let userRoles = message.mentions.members.first().roles.highest;
	let senderRoles = message.member.roles.highest;
	let defaultRole = message.guild.roles.cache.find(role => role.name === "[db!] DotBot");

	let reason = (args.slice(1)).join(" ");

	if (reason == "") {
		reason = "No reason provided";
	}

	log.info("attempting kick");

	if (message.member.hasPermission("KICK_MEMBERS") && message.guild.me.hasPermission("KICK_MEMBERS")) {
		let userKicked = message.mentions.users.first().id;
		let ownerID = message.guild.ownerID;
		if (userKicked == ownerID) {
			const errorEmbed = new Discord.MessageEmbed()
				.setTitle('Error:')
				.addField(
					'Really?',
					`One does not simply kick the owner.`,
					false
				)
				.setColor('#DD1627')

			return message.channel.send(errorEmbed);
		} else if (botRoles[0].position > userRoles.position || defaultRole.position > userRoles.position) {
			if (senderRoles.position < userRoles.position) {
				const errorEmbed = new Discord.MessageEmbed()
					.setTitle('Error:')
					.addField(
						'Role error:',
						`<@${userKicked}> has a higher role than you, you fucktard.`,
						false
					)
					.setColor('#DD1627')

				return message.channel.send(errorEmbed);
			} else if (senderRoles.position == userRoles.position ){
				const errorEmbed = new Discord.MessageEmbed()
					.setTitle('Error:')
					.addField(
						'Role error:',
						`<@${userKicked}> has the same role as you, you fucktard.`,
						false
					)
					.setColor('#DD1627')

				return message.channel.send(errorEmbed);
			} else if(botRoles[0].position == userRoles.position) {
				const errorEmbed = new Discord.MessageEmbed()
					.setTitle('Error:')
					.addField(
						'Role error:',
						`<@${userKicked}> has the same role as me.`,
						false
					)
					.setColor('#DD1627')

				return message.channel.send(errorEmbed);
			}else {
				message.guild.member(`${userKicked}`).kick(reason);
				const successEmbed = new Discord.MessageEmbed()
					.setTitle('Success:')
					.addField(
						'Successfully kicked:',
						`<@${userKicked}> with reason: ${reason}`,
						false
					)
					.setColor('#43B581')

				return message.channel.send(successEmbed);
			}
		} else {
			const errorEmbed = new Discord.MessageEmbed()
				.setTitle('Error:')
				.addField(
					'Role error:',
					`<@${userKicked}> has a higher role than me`,
					false
				)
				.setColor('#DD1627')

			return message.channel.send(errorEmbed);
		}
	} else {
		const errorEmbed = new Discord.MessageEmbed()
			.setTitle('Error:')
			.addField(
				'Insufficient permissions:',
				`You don\'t have the necessary permissions to kick users.`,
				false
			)
			.setColor('#DD1627')
		return message.channel.send(errorEmbed);
	}
}

export function banUser(message, args) {
	let botRoles = message.guild.me.roles.cache.array();
	let userRoles = message.mentions.members.first().roles.highest;
	let senderRoles = message.member.roles.highest;
	let defaultRole = message.guild.roles.cache.find(role => role.name === "[db!] DotBot");

	let reason = (args.slice(1)).join(" ");

	if (reason == "") {
		reason = "No reason provided";
	}

	log.info("attempting ban");
	if (message.member.hasPermission("BAN_MEMBERS") && message.guild.me.hasPermission("BAN_MEMBERS")) {
		let userBanned = message.mentions.users.first().id;

		if (botRoles[0].position > userRoles.position || defaultRole.position > userRoles.position) {
			if (senderRoles.position < userRoles.position) {
				const errorEmbed = new Discord.MessageEmbed()
					.setTitle('Error:')
					.addField(
						'Role error:',
						`<@${userBanned}> has a higher role than you, you fucktard.`,
						false
					)
					.setColor('#DD1627')

				return message.channel.send(errorEmbed);
			} else {
				message.guild.member(`${userBanned}`).ban({ days: 7, reason: `${reason}` });
				const successEmbed = new Discord.MessageEmbed()
					.setTitle('Success:')
					.addField(
						'Successfully banned:',
						`<@${userBanned}> with reason: ${reason}`,
						false
					)
					.setColor('#43B581')

				return message.channel.send(successEmbed);
			}
		} else {
			const errorEmbed = new Discord.MessageEmbed()
				.setTitle('Error:')
				.addField(
					'Role error:',
					`<@${userBanned}> has a higher role than me`,
					false
				)
				.setColor('#DD1627')

			return message.channel.send(errorEmbed);
		}
	} else {
		const errorEmbed = new Discord.MessageEmbed()
			.setTitle('Error:')
			.addField(
				'Insufficient permissions:',
				`You don\'t have the necessary permissions to ban users or I don't.`,
				false
			)
			.setColor('#DD1627')
		return message.channel.send(errorEmbed);
	}
}

export function sendMessage(message, args, specialUsers) {
	const msgToSend = args.join(" ");

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
	}

	let validUser;
	for ( let i = 0; i < specialUsers.length; i++ ) {
		if (message.author.id === specialUsers[i]) {
			validUser = true;
			break;
		}
		else validUser = false;
	}

	log.info(`Message author: ${message.author.id}`);
	log.info(`Is valid: ${validUser}`);

	if (validUser) {
		log.info("sending custom message");
		message.delete();
		return message.channel.send(msgToSend);
	} else {
		const errorEmbed = new Discord.MessageEmbed()
			.setTitle('Error:')
			.addField(
				'Missing perms:',
				`Nisi tok kul! You can't control me!!!`,
				false
			)
			.setColor('#DD1627')
		return message.channel.send(errorEmbed);
	}
}

export function spamUser(message, args, specialUsers) {
	let userSpammed;
	let number = args[1];

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
		let validUser, perms;
		if (number == undefined) {
			number = 5;
			perms = true;
			log.info(`Number: ${number}`);
		} else if (number > 20) {
			log.info(`Number: ${number}`);
			const errorEmbed = new Discord.MessageEmbed()
				.setTitle('Error:')
				.addField(
					'Limit:',
					`You can only spam a user 20 times or less!`,
					false
				)
				.setColor('#DD1627')
			message.channel.send(errorEmbed);
			log.info(`Sending error embed`);
			return perms = false;
		} else perms = true;

		while (perms) {
			for ( let i = 0; i < specialUsers.length; i++ ) {
				if (message.author.id === specialUsers[i]) {
					validUser = true;
					break;
				}
				else validUser = false;
			}

			log.info(`Message author: ${message.author.id}`);
			log.info(`Special users: ${specialUsers}`);
			log.info(`Is valid: ${validUser}`);

			if (validUser) {
				let ctr = 0;
				while (ctr < number) {
					message.channel.send(`<@${userSpammed}>`)
					ctr++;
				}
				perms = false;
			} else {
				const errorEmbed = new Discord.MessageEmbed()
					.setTitle('Error:')
					.addField(
						'Missing perms:',
						`Nisi tok kul! You can't control me!!!`,
						false
					)
					.setColor('#DD1627')
				return message.channel.send(errorEmbed);
			}
		}
	}
}
