import { Logger } from 'tslog';
import Discord from "discord.js";
import {banUser} from "./commands";

const log = new Logger();

export async function play(message, player, args) {
    if (args.length === 0) {
        const errorEmbed = new Discord.MessageEmbed()
            .setTitle('Error:')
            .addField(
                'Argument error:',
                `Please specify the song.`,
                false
            )
            .setColor('#DD1627')
        return message.channel.send(errorEmbed);
    }

    if (player.isPlaying(message)) {
        const song = await player.addToQueue(message, args.join(' '));

        if (song) log.info(`Added ${song.name} to the queue.`);
    } else {
        const song = await player.play(message, {
            search: args.join(' '),
            requestedBy: message.author.tag
        });

        if (song) log.info(`Started playing ${song.name}`);
    }
}

export async function playlist(message, player, args, shuffle) {
    await player.playlist(message, {
        search: args.join(' '),
        maxSongs: 150,
        requestedBy: message.author.tag,
        shuffle: shuffle
    })
}

export async function nowPlaying(message, player) {
    const song = await player.nowPlaying(message);

    if (song) {
        const songEmbed = new Discord.MessageEmbed()
            .setTitle(`Currently playing ${song.name} by ${song.author}`)
            .setURL(`${song.url}`)
            .setAuthor('Aiken Tine Ahac', 'https://avatars.githubusercontent.com/u/30961404?s=460&v=4', 'https://github.com/aikenahac/')
            .setThumbnail(`${song.thumbnail}`)
            .setFooter(`Requested by ${song.requestedBy}`)
            .setTimestamp()
            .setColor('#FF5D96')

        message.channel.send(songEmbed)
    }
}

export function clearQueue(message, player) {
    const isDone = player.clearQueue(message);

    if (isDone) {
        const successEmbed = new Discord.MessageEmbed()
            .setTitle('Success!')
            .addField(
                'Cleared queue',
                false
            )
            .setColor('#43B581')
        return message.channel.send(successEmbed);
    }
}

export async function seekTime(message, player, args) {
    const song = await player.seek(message, parseInt(String(args[0] * 1000))).catch(err => {
        return message.channel.send(err.message);
    });

    const successEmbed = new Discord.MessageEmbed()
        .setTitle('Success!')
        .addField(
            'Skipped to timestamp',
            `Successfully skipped to ${args[0]} second of ${song.name}`,
            false
        )
        .setColor('#43B581')
    return message.channel.send(successEmbed);
}

export function queue(message, player) {
    const queue = player.getQueue(message);

    if(queue)
        message.channel.send('Queue:\n'+(queue.songs.map((song, i) => {
            return `${i === 0 ? 'Now Playing' : `#${i+1}`} - ${song.name} | ${song.author}`
        }).join('\n')));
}

export function skip(message, player) {
    const song = player.skip(message);

    if (song) message.react('⏭️')
}

export function remove(message, player, args) {
    const SongID = parseInt(args[0])-1;
    const song = player.remove(message, SongID);

    if(song) message.react('⏹➖');
}

export function pause(message, player) {
    const song = player.pause(message);

    if (song) message.react('⏸️');
}

export function resume(message, player) {
    const song = player.resume(message);

    if (song) message.react('▶️');
}

export function stop(message, player) {
    const isDone = player.stop(message);

    if (isDone) message.react('⏹️');
}

export function shuffle(message, player) {
    const songs = player.shuffle(message);

    if (songs) message.react('⏺️');
}

export function loopSong(message, player) {
    const toggle = player.toggleLoop(message);

    if (toggle === null) return;
    else if (toggle) {
        const loopEmbed = new Discord.MessageEmbed()
            .setTitle('Now looping song!')
            .setColor('#43B581')
        return message.channel.send(loopEmbed);
    } else {
        const loopEmbed = new Discord.MessageEmbed()
            .setTitle('No longer looping song!')
            .setColor('#43B581')
        return message.channel.send(loopEmbed);
    }
}

export function loopQueue(message, player) {
    const toggle = player.toggleQueueLoop(message);

    if (toggle === null) return;
    else if (toggle) {
        const loopEmbed = new Discord.MessageEmbed()
            .setTitle('Now looping queue!')
            .setColor('#43B581')
        return message.channel.send(loopEmbed);
    } else {
        const loopEmbed = new Discord.MessageEmbed()
            .setTitle('No longer looping queue!')
            .setColor('#43B581')
        return message.channel.send(loopEmbed);
    }
}

export function setVolume(message, player, args) {
    const isDone = player.setVolume(message, parseInt(args[0]));

    if (isDone) {
        const loopEmbed = new Discord.MessageEmbed()
            .setTitle(`Volume set to ${args[0]}%!`)
            .setColor('#43B581')
        return message.channel.send(loopEmbed);
    }
}

export function progress(message, player) {
    const progressBar = player.createProgressBar(message, {
        size: 20,
        block: '█',
        arrow: '╠'
    })

    if (progressBar) message.channel.send(progressBar);
}