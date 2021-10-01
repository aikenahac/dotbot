import Discord from 'discord.js';

export default function Coinflip(message: Discord.Message) {
  const flip = Math.round(Math.random()) + 1;

  if (flip === 1) {
    const headsEmbed = new Discord.MessageEmbed()
      .setTitle('Result:')
      .addField('You flipped heads!', false)
      .setColor('#DD1627');

    return message.channel.send(headsEmbed);
  } else {
    const tailsEmbed = new Discord.MessageEmbed()
      .setTitle('Error:')
      .addField('You flipped tails!', false)
      .setColor('#DD1627');

    return message.channel.send(tailsEmbed);
  }
}
