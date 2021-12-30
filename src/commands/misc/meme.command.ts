import { SlashCommandBuilder } from '@discordjs/builders';
import { sendImageResult } from '../../utils/embeds';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';
import https from 'https';
import { Interaction } from 'discord.js';

const conf: any = load(readFileSync('./config.yml', 'utf8'));

const subreddits = conf.subreddits;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription("Sends memes. That's it..."),
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const subreddit = `${
      subreddits[Math.floor(Math.random() * subreddits.length)]
    }hot/.json?limit=100`;
    console.log(subreddit);

    https.get(subreddit, (result) => {
      let body = '';
      result.on('data', (chunk) => {
        body += chunk;
      });

      result
        .on('end', async () => {
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
        })
        .on('error', function (e) {
          console.log('Got an error: ', e);
        });
    });
  },
};
