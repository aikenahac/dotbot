"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = __importDefault(require("discord.js"));
var CommandHandler = /** @class */ (function () {
    function CommandHandler() {
    }
    CommandHandler.clearFunction = function (noofMsg, message) {
        console.log("attempting message clear");
        if (noofMsg == 0) {
            return message.reply("One does not simply delete 0 messages!");
        }
        else if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            var errorEmbed = new discord_js_1.default.MessageEmbed()
                .setTitle('Error:')
                .addField('Insufficient permissions:', "You don't have the necessary permissions to manage messages.", false)
                .setColor('#DD1627');
            return message.channel.send(errorEmbed);
        }
        else {
            message.delete();
            var noOfMessages = parseInt(noofMsg);
            message.channel.bulkDelete(noOfMessages);
        }
    };
    CommandHandler.kickUser = function (message, reason, botRoles, userRoles, senderRoles, defaultRole) {
        console.log("attempting kick");
        if (message.member.hasPermission("KICK_MEMBERS") && message.guild.me.hasPermission("KICK_MEMBERS")) {
            var userBanned = message.mentions.users.first().id;
            var ownerID = message.guild.ownerID;
            if (userBanned == ownerID) {
                var errorEmbed = new discord_js_1.default.MessageEmbed()
                    .setTitle('Error:')
                    .addField('Really?', "One does not simply ban the owner.", false)
                    .setColor('#DD1627');
                return message.channel.send(errorEmbed);
            }
            else if (botRoles[0].position > userRoles.position || defaultRole.position > userRoles.position) {
                if (senderRoles.position < userRoles.position) {
                    var errorEmbed = new discord_js_1.default.MessageEmbed()
                        .setTitle('Error:')
                        .addField('Role error:', "<@" + userBanned + "> has a higher role than you, you fucktard.", false)
                        .setColor('#DD1627');
                    return message.channel.send(errorEmbed);
                }
                else if (senderRoles.position == userRoles.position) {
                    var errorEmbed = new discord_js_1.default.MessageEmbed()
                        .setTitle('Error:')
                        .addField('Role error:', "<@" + userBanned + "> has the same role as you, you fucktard.", false)
                        .setColor('#DD1627');
                    return message.channel.send(errorEmbed);
                }
                else if (botRoles[0].position == userRoles.position) {
                    var errorEmbed = new discord_js_1.default.MessageEmbed()
                        .setTitle('Error:')
                        .addField('Role error:', "<@" + userBanned + "> has the same role as me.", false)
                        .setColor('#DD1627');
                    return message.channel.send(errorEmbed);
                }
                else {
                    message.guild.member("" + userBanned).kick(reason);
                    var successEmbed = new discord_js_1.default.MessageEmbed()
                        .setTitle('Success:')
                        .addField('Successfully kicked:', "<@" + userBanned + "> with reason: " + reason, false)
                        .setColor('#43B581');
                    return message.channel.send(successEmbed);
                }
            }
            else {
                var errorEmbed = new discord_js_1.default.MessageEmbed()
                    .setTitle('Error:')
                    .addField('Role error:', "<@" + userBanned + "> has a higher role than me", false)
                    .setColor('#DD1627');
                return message.channel.send(errorEmbed);
            }
        }
        else {
            var errorEmbed = new discord_js_1.default.MessageEmbed()
                .setTitle('Error:')
                .addField('Insufficient permissions:', "You don't have the necessary permissions to kick users.", false)
                .setColor('#DD1627');
            return message.channel.send(errorEmbed);
        }
    };
    CommandHandler.banUser = function (message, reason, botRoles, userRoles, senderRoles, defaultRole) {
        console.log("attempting ban");
        if (message.member.hasPermission("BAN_MEMBERS") && message.guild.me.hasPermission("BAN_MEMBERS")) {
            var userBanned = message.mentions.users.first().id;
            if (botRoles[0].position > userRoles.position || defaultRole.position > userRoles.position) {
                if (senderRoles.position < userRoles.position) {
                    var errorEmbed = new discord_js_1.default.MessageEmbed()
                        .setTitle('Error:')
                        .addField('Role error:', "<@" + userBanned + "> has a higher role than you, you fucktard.", false)
                        .setColor('#DD1627');
                    return message.channel.send(errorEmbed);
                }
                else {
                    message.guild.member("" + userBanned).ban({ days: 7, reason: "" + reason });
                    var successEmbed = new discord_js_1.default.MessageEmbed()
                        .setTitle('Success:')
                        .addField('Successfully banned:', "<@" + userBanned + "> with reason: " + reason, false)
                        .setColor('#43B581');
                    return message.channel.send(successEmbed);
                }
            }
            else {
                var errorEmbed = new discord_js_1.default.MessageEmbed()
                    .setTitle('Error:')
                    .addField('Role error:', "<@" + userBanned + "> has a higher role than me", false)
                    .setColor('#DD1627');
                return message.channel.send(errorEmbed);
            }
        }
        else {
            var errorEmbed = new discord_js_1.default.MessageEmbed()
                .setTitle('Error:')
                .addField('Insufficient permissions:', "You don't have the necessary permissions to ban users or I don't.", false)
                .setColor('#DD1627');
            return message.channel.send(errorEmbed);
        }
    };
    CommandHandler.sendMessage = function (message, msgToSend) {
        console.log("sending custom message");
        message.delete();
        return message.channel.send(msgToSend);
    };
    return CommandHandler;
}());
exports.default = CommandHandler;
