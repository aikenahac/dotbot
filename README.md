# DotBot

[Invite](https://discord.com/api/oauth2/authorize?client_id=785432195413049374&permissions=8&scope=bot%20applications.commands) this bot to your server.

## Deployment

### Requirements

- Node.js [v16.x]
- ffmpeg
- pm2 (optional - for deployment and process management)

### Part 1: Setting up the Discord bot

Go to the discord [developer portal](https://discord.com/developers/applications) and create a new application.

After creating the application, you will be redirected to the application's dashboard. There you can find the bot's token by clicking on the "Bot" tab.

![Bot Tab](https://s3.eu-central-1.wasabisys.com/aiken/bot-tab.png)

### Part 2: Deployment

#### Step 1: Install Node.js on your server

For this guide, I will assume you're not a masochist and that you're running a Debian based server, such as Ubuntu or Debian.

```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -

sudo apt install -y nodejs

node -v
```

After executing the last command, you should see the version of Node.js installed (should be v16.x.x).

#### Step 2: Install ffmpeg

Since this bot features music commands, you're gonna need to have ffmpeg installed on your server.

```bash
sudo apt install ffmpeg
```

#### Step 3: Clone the bot

```bash
git clone https://github.com/aikenahac/dotbot.git
```

Then you have to move into the directory and install the dependencies.

```bash
cd dotbot

npm install
```

#### Step 4: Configure the bot

The next step is to copy .env.example to .env and set your bot's token.

```bash
# .env
TOKEN=YOUR_TOKEN_HERE
```

After setting the token, you need to set some other variables.

copy config.yml.example to config.yml and set the variables.

```bash
# config.yml

# ID of the bot
clientID: '785432195413049374'

# ID of the development server
guildID: '802230233456705566'

embedColor: '#FF5D96'

# Set the users that are allowed to use special commands such as spam and send.
# It's a string array so it should look something like this:
specialUsers: [
  'id_of_user_1',
  'id_of_user_2',
  'id_of_user_3'
]

# Set the subreddits that will be searched for memes.
# It's a string array so it should look something like this:
subreddits:
  [
    'https://www.reddit.com/r/dankmemes/',
    'https://www.reddit.com/r/linuxmemes/',
    'https://www.reddit.com/r/Animemes/',
    'https://www.reddit.com/r/PrequelMemes/',
    'https://www.reddit.com/r/SequelMemes/',
  ]
```

#### Step 5: Deploy the commands

Since discord.js v13 you have to deploy the commands of your bot.

While you're developing you're going to want to deploy the commands to your dev server instantly, so that is the default configuration for the `src/dev-commands.ts` file.

You can deploy dev commands using:

```bash
npm run dev-commands
```

When deploying your bot into production, you'll want to deploy the commands globally for all servers.

To do that run `src/deploy-commands.ts` with the following command:

```bash
npm run commands
```

#### Step 6: Deploy the bot

You can run it your own way or use pm2 to deploy it.

If you chose pm2, here are the steps:

```bash
npm install pm2 -g

pm2 start --name your_bot_name npm -- start
```
