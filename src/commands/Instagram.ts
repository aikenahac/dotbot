import Discord from 'discord.js';
import { Logger } from 'tslog';

import { instagramChecker } from '../utils';

const log = new Logger();

export default async function GetInstagramUser(channel, args) {
  const ig = {
    username: process.env.IG_USERNAME,
    password: process.env.IG_PASSWORD,
  };

  let account;

  if (args.length == 0) {
    const errorEmbed = new Discord.MessageEmbed()
      .setTitle('Error:')
      .addField(
        'Missing arguments:',
        `Please provide which account you want details about`,
        false,
      )
      .setColor('#DD1627');
    return channel.send(errorEmbed);
  } else {
    try {
      account = await instagramChecker(ig.username, ig.password, args[0]);
      log.info(account);
    } catch (error) {
      const errorEmbed = new Discord.MessageEmbed()
        .setTitle('Error:')
        .addField(
          'Account error:',
          `There was an error requesting this account`,
          false,
        )
        .setColor('#DD1627');
      return channel.send(errorEmbed);
    }

    const instagramEmbed = new Discord.MessageEmbed()
      .setTitle(`${account.fullName}`)
      .setDescription(
        account.businessCategory != null ? `${account.businessCategory}` : null,
      )
      .setURL(`https://instagram.com/${account.username}`)
      .setThumbnail(account.profilePicture)
      .addField('Bio', account.biography)
      .addFields(
        { name: 'Followers', value: account.followers, inline: true },
        { name: 'Following', value: account.following, inline: true },
      )
      .setTimestamp()
      .setFooter(`Wesbite: ${account.website}`)
      .setColor('#8134AF');

    return channel.send(instagramEmbed);
  }
}
