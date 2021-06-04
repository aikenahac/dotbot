import fs from "fs";
import text2png from 'text2png';

export function deleteTempImage(message) {
    fs.unlinkSync( `src/tweetMedia/${message.author.id}.png`);
}

export function generateImage(message) {
    const author = message.author.tag;
    const content = message.content;

    fs.writeFileSync(`src/tweetMedia/${message.author.id}.png`, text2png(`Tweeted by: ${author}\n${content}`, {
        font: '40px Montserrat',
        localFontPath: 'src/tweetMedia/Montserrat-Regular.ttf',
        localFontName: 'Montserrat',
        backgroundColor: 'black',
        color: '#38C4E0',
        lineSpacing: 10,
        padding: 20
    }))
}