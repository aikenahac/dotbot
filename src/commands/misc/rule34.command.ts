import { SlashCommandBuilder } from '@discordjs/builders';
import { Interaction, MessageEmbed } from 'discord.js';
import https from 'https';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rule34')
    .setDescription('Sends rule34 images.'),
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    https.get(
      'https://www.reddit.com/r/rule34/hot/.json?limit=100',
      (result) => {
        var body = '';
        result.on('data', (chunk) => {
          body += chunk;
        });

        result
          .on('end', () => {
            var response = JSON.parse(body);
            var index =
              response.data.children[Math.floor(Math.random() * 99) + 1].data;

            if (index.post_hint !== 'image') {
              var text = index.selftext;
              const textembed = new MessageEmbed()
                .setTitle(subRedditName)
                .setColor(9384170)
                .setDescription(`[${title}](${link})\n\n${text}`)
                .setURL(`https://reddit.com/${subRedditName}`);

              interaction.reply({
                embeds: [textembed],
              });
            }

            var image = index.preview.images[0].source.url.replace(
              '&amp;',
              '&',
            );
            var title = index.title;
            var link = 'https://reddit.com' + index.permalink;
            var subRedditName = index.subreddit_name_prefixed;

            if (index.post_hint !== 'image') {
              const textembed = new MessageEmbed()
                .setTitle(subRedditName)
                .setColor(9384170)
                .setDescription(`[${title}](${link})\n\n${text}`)
                .setURL(`https://reddit.com/${subRedditName}`);

              interaction.reply({
                embeds: [textembed],
              });
            }
            console.log(image);
            const imageembed = new MessageEmbed()
              .setTitle(subRedditName)
              .setImage(image)
              .setColor(9384170)
              .setDescription(`[${title}](${link})`)
              .setURL(`https://reddit.com/${subRedditName}`);

            interaction.reply({
              embeds: [imageembed],
            });
          })
          .on('error', function (e) {
            console.log('Got an error: ', e);
          });
      },
    );
  },
};
