"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = __importDefault(require("discord.js"));
var dotenv_1 = __importDefault(require("dotenv"));
var commands_1 = __importDefault(require("./commands"));
dotenv_1.default.config();
var client = new discord_js_1.default.Client();
var token = process.env.TOKEN;
var prefix = process.env.PREFIX;
client.on('guildMemberAdd', function (guildMember) {
    guildMember.roles.set(['496717215756845056']);
});
client.login(token);
client.on('ready', function () {
    console.log('Logged in as ' + client.user.tag);
    client.user.setActivity({
        name: 'your problems',
        type: 'LISTENING'
    });
});
client.on('message', function (message) {
    var args = message.content.slice(prefix.length).trim().split(' ');
    var command = args.shift().toLowerCase();
    if (message.content.toLowerCase().includes("we ded") && !message.author.bot) {
        return message.channel.send("we ded");
    }
    else if (!message.content.startsWith(prefix) || message.author.bot)
        return;
    else if (command == "clear") {
        if (args.length > 1) {
            return message.channel.send("Please set only one argument " + message.author);
        }
        else if (args.length == 0) {
            return message.channel.send("Please set how many messages you would like to delete");
        }
        else if (message.channel.type == "dm") {
            return message.reply("You can't clear here, sorry");
        }
        else {
            commands_1.default.clearFunction(args[0], message);
        }
    }
    else if (command == "kick") {
        var botRoles = message.guild.me.roles.cache.array();
        var userRoles = message.mentions.members.first().roles.highest;
        var senderRoles = message.member.roles.highest;
        var defaultRole = message.guild.roles.cache.find(function (role) { return role.name === "[db!] DotBot"; });
        var reason = (args.slice(1)).join(" ");
        if (reason == "") {
            reason = "No reason provided";
        }
        commands_1.default.kickUser(message, reason, botRoles, userRoles, senderRoles, defaultRole);
    }
    else if (command == "args") {
        if (args.length == 0) {
            return message.channel.send("Whose ID do you want?");
        }
        else {
            var reason = (args.slice(1)).join(" ");
            console.log("User ID: " + message.mentions.users.first().id);
            console.log(reason);
            if (reason == "")
                console.log("null");
        }
    }
    else if (command == "ban") {
        var botRoles = message.guild.me.roles.cache.array();
        var userRoles = message.mentions.members.first().roles.highest;
        var senderRoles = message.member.roles.highest;
        var defaultRole = message.guild.roles.cache.find(function (role) { return role.name === "[db!] DotBot"; });
        var reason = (args.slice(1)).join(" ");
        if (reason == "") {
            reason = "No reason provided";
        }
        commands_1.default.banUser(message, reason, botRoles, userRoles, senderRoles, defaultRole);
    }
    else if (command == "say") {
        if (args.length == 0) {
            var errorEmbed = new discord_js_1.default.MessageEmbed()
                .setTitle('Error:')
                .addField('Missing arguments:', "Please provide what you want me to say", false)
                .setColor('#DD1627');
            return message.channel.send(errorEmbed);
        }
        else if (message.author.id === '315446934502506497') {
            commands_1.default.sendMessage(message, args.join(" "));
        }
        else {
            var errorEmbed = new discord_js_1.default.MessageEmbed()
                .setTitle('Error:')
                .addField('Missing perms:', "Nisi moj o\u010Dka! You can't control me!!!", false)
                .setColor('#DD1627');
            return message.channel.send(errorEmbed);
        }
    }
    else if (command == "spam") {
        var userSpammed = message.mentions.users.first().id;
        if (args.length == 0) {
            var errorEmbed = new discord_js_1.default.MessageEmbed()
                .setTitle('Error:')
                .addField('Missing arguments:', "Please provide who you want to spam.", false)
                .setColor('#DD1627');
            return message.channel.send(errorEmbed);
        }
        else {
            commands_1.default.spamUser(message, userSpammed, args[1]);
        }
    }
    else {
        var errorEmbed = new discord_js_1.default.MessageEmbed()
            .setTitle('Error:')
            .addField('Command error:', "Unknown or unspecified command", false)
            .setColor('#DD1627');
        return message.channel.send(errorEmbed);
    }
});
