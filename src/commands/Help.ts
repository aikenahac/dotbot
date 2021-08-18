import {
  HelpEmbed,
  HelpEmbedUtils,
  HelpEmbedMusic,
  HelpEmbedMisc,
  SpecialHelpEmbed,
} from '../utils';

export function HelpMenu(message, args) {
  switch (args[0]) {
    case 'utils':
      message.channel.send(HelpEmbedUtils(message));
      break;
    case 'music':
      message.channel.send(HelpEmbedMusic(message));
      break;
    case 'misc':
      message.channel.send(HelpEmbedMisc(message));
      break;
    default:
      message.channel.send(HelpEmbed(message));
  }
}

export function SpecialHelp(message) {
  return message.channel.send(SpecialHelpEmbed(message));
}
