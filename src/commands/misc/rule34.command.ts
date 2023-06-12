import { SlashCommandBuilder } from '@discordjs/builders';
import { Interaction, EmbedBuilder } from 'discord.js';
import https from 'https';
import { sendImageResult } from '../../utils/embeds';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rule34')
    .setDescription('Sends rule34 images.'),
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    https.get(
      'https://www.reddit.com/r/rule34/hot/.json?limit=100',
      (result) => {
        let body = '';
        result.on('data', (chunk) => {
          body += chunk;
        });

        result
          .on('end', async () => {
            try {
              const response = await JSON.parse(body);
              const index =
                response.data.children[Math.floor(Math.random() * 99) + 1].data;

              const title = index.title;
              const link = 'https://reddit.com' + index.permalink;
              const subRedditName = index.subreddit_name_prefixed;

              if (index.preview === undefined)
                return interaction.reply({
                  content: 'There is no meme.',
                  ephemeral: true,
                });

              const image = index.preview.images[0].source.url.replace(
                '&amp;',
                '&',
              );

              console.log(image);
              await interaction.reply({
                embeds: [sendImageResult(subRedditName, title, link, image)],
              });
            } catch (e) {
              await interaction.reply({
                content: 'There was an error!',
                ephemeral: true,
              });
            }
          })
          .on('error', function (e) {
            console.log('Got an error: ', e);
          });
      },
    );
  },
};
