import Discord from "discord.js";
import fs from "fs";
import {deleteTempImage, generateImage} from "./helper";

export default class CommandHandler {

	static clearFunction(noofMsg, message) {
		console.log("attempting message clear");

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

	static kickUser(message, reason, botRoles, userRoles, senderRoles, defaultRole) {
		console.log("attempting kick");

		if (message.member.hasPermission("KICK_MEMBERS") && message.guild.me.hasPermission("KICK_MEMBERS")) {
			let userBanned = message.mentions.users.first().id;
			let ownerID = message.guild.ownerID;
			if (userBanned == ownerID) {
				const errorEmbed = new Discord.MessageEmbed()
					.setTitle('Error:')
					.addField(
						'Really?',
						`One does not simply ban the owner.`,
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
							`<@${userBanned}> has a higher role than you, you fucktard.`,
							false
						)
						.setColor('#DD1627')
						
					return message.channel.send(errorEmbed);
				} else if (senderRoles.position == userRoles.position ){
					const errorEmbed = new Discord.MessageEmbed()
						.setTitle('Error:')
						.addField(
							'Role error:',
							`<@${userBanned}> has the same role as you, you fucktard.`,
							false
						)
						.setColor('#DD1627')
						
					return message.channel.send(errorEmbed);
				} else if(botRoles[0].position == userRoles.position) {
					const errorEmbed = new Discord.MessageEmbed()
						.setTitle('Error:')
						.addField(
							'Role error:',
							`<@${userBanned}> has the same role as me.`,
							false
						)
						.setColor('#DD1627')
						
					return message.channel.send(errorEmbed);
				}else {
					message.guild.member(`${userBanned}`).kick(reason);
					const successEmbed = new Discord.MessageEmbed()
						.setTitle('Success:')
						.addField(
							'Successfully kicked:',
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
					`You don\'t have the necessary permissions to kick users.`,
					false
				)
				.setColor('#DD1627')
			return message.channel.send(errorEmbed);
		}
	}

	static banUser(message, reason, botRoles, userRoles, senderRoles, defaultRole) {
		console.log("attempting ban");
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

	static spamUser(message, userSpammed, number, specialUsers) {
		let validUser, perms;
		if (number == undefined) {
			number = 5;
			perms = true;
			console.log(`Number: ${number}`);
		} else if (number > 20) {
			console.log(`Number: ${number}`);
			const errorEmbed = new Discord.MessageEmbed()
				.setTitle('Error:')
				.addField(
					'Limit:',
					`You can only spam a user 20 times or less!`,
					false
				)
				.setColor('#DD1627')
			message.channel.send(errorEmbed);
			console.log(`Sending error embed`);
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

			console.log(`Message author: ${message.author.id}`);
			console.log(`Special users: ${specialUsers}`);
			console.log(`Is valid: ${validUser}`);

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

	static sendMessage(message, msgToSend, specialUsers) {
		let validUser;
		for ( let i = 0; i < specialUsers.length; i++ ) {
			if (message.author.id === specialUsers[i]) {
				validUser = true;
				break;
			}
			else validUser = false;
		}
		if (validUser) {
			console.log("sending custom message");
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

	static tweetSpam(message, tweetMaster) {
		generateImage(message);
		console.log('Sent img');

		if (message.attachments.size > 0) {
			const errorEmbed = new Discord.MessageEmbed()
				.setTitle('Error:')
				.addField(
					'Sike, you thought:',
					`Ne boš mi ti slikic gor pošilju, ne ne`,
					false
				)
				.setColor('#DD1627')
			return message.channel.send(errorEmbed);
		} else if (message.content.includes('https://')) {
			const errorEmbed = new Discord.MessageEmbed()
				.setTitle('Error:')
				.addField(
					'Sike, you thought:',
					`No no, ne mi ti linkou gor pošiljat prosm.`,
					false
				)
				.setColor('#DD1627')
			return message.channel.send(errorEmbed);
		}

		const imageToSend = fs.readFileSync(`src/tweetMedia/${message.author.id}.png`);

		tweetMaster.post('media/upload', {media: imageToSend}, (error, media, response) => {
			if (error) {
				console.log(error);
			} else {
				const status = {
					status: "Tweeted from Discord!",
					media_ids: media.media_id_string
				}

				tweetMaster.post('statuses/update', status, (error, tweet, response) => {
					if(error) {
						console.log(error)
					} else {
						console.log('Tweeted from Discord!')
						deleteTempImage(message)
					}
				})
			}
		})
	}

	static personalTweet(accessToken, userSecret, status, message, oauth) {
		if (message.author.id === '315446934502506497') {
			console.log(status);
			oauth.post('https://api.twitter.com/1.1/statuses/update.json',
					accessToken,
					userSecret,
					{
						'status': status
					},
					'',
					function(err, data, res) {
							if (err) {
									console.log(err);
							} else {
									console.log(data)
									const successEmbed = new Discord.MessageEmbed()
										.setTitle('Success:')
										.addField(
											'Successfuly tweeted!:',
											`Uspešno tweetu na @aikenahac`,
											false
										)
										.setColor('#43B581')
									return message.channel.send(successEmbed);
							}
					}
			)
		} else {
			const errorEmbed = new Discord.MessageEmbed()
				.setTitle('Error:')
				.addField(
					'Missing perms:',
					`A si resno mislu da bom dovolu da tweetas na moj account?`,
					false
				)
				.setColor('#DD1627')
			return message.channel.send(errorEmbed);
		}
	}

	static helpMenu(message) {
		const helpEmbed = new Discord.MessageEmbed()
			.setTitle(`Help commands:`)
			.setURL('https://github.com/aikenahac/dotbot')
			.setAuthor('Aiken Tine Ahac', 'https://avatars.githubusercontent.com/u/30961404?s=460&v=4', 'https://github.com/aikenahac/')
			.setThumbnail('https://cdn.discordapp.com/avatars/785432195413049374/fcabae17c37bf92aa220d8ed254ad09b.webp')
			.addField(
				'Prefix:',
				'Use the db! prefix for your commands'
			)
			.addFields(
				{ name: '\u200B', value: '\u200B' },
				{ name: 'help', value: 'Displays this help section' },
				{ name: 'clear', value: 'Clears the specified number of messages: `db!clear [number]*`' },
				{ name: 'kick', value: 'Kicks specified user: `db!kick [user] [reason]*|**`' },
				{ name: 'ban', value: 'Bans specified user: `db!ban [user] [reason]*|**`' },
				{ name: '\u200B', value: '\u200B' },
				{ name: 'Additional info', value: 'Arguments marked with * are optional\nArguments marked with ** require permissions' }
			)
			.setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL)
			.setTimestamp()
			.setColor('#F1C40F')
	
		return message.channel.send(helpEmbed);
	}

	static specialHelp(message) {
		const helpEmbed = new Discord.MessageEmbed()
			.setTitle(`Comands for special ppl:`)
			.setURL('https://github.com/aikenahac/dotbot')
			.setAuthor('Aiken Tine Ahac', 'https://avatars.githubusercontent.com/u/30961404?s=460&v=4', 'https://github.com/aikenahac/')
			.setThumbnail('https://qtxasset.com/fiercebiotech/1568212087/connor-wells-534089-unsplash.jpg/connor-wells-534089-unsplash.jpg')
			.addField(
				'Prefix:',
				'Use the db! prefix for your commands'
			)
			.addFields(
				{ name: '\u200B', value: '\u200B' },
				{ name: 'spam', value: 'Spams specified user: `db!spam [user] [number]*`' },
				{ name: 'say', value: 'Makes the bot say something: `db!say [number]*`' },
				{ name: '\u200B', value: '\u200B' },
				{ name: 'Additional info', value: 'Arguments marked with * are optional' }
			)
			.setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL)
			.setTimestamp()
			.setColor('#FF5D96')
	
		return message.channel.send(helpEmbed);
	}
}