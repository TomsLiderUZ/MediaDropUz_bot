const fs = require('fs');
const path = require('path');

const mediaPath = path.join(__dirname, 'media.json');
const mediaBase = path.join(__dirname, '../media-base');

module.exports = (bot, msg) => {
    const id = msg.text;
    const chatId = msg.chat.id;

    const mediaList = JSON.parse(fs.readFileSync(mediaPath, 'utf8'));
    const file = mediaList.find(media => media.id === id);

    if (file) {
        const filePath = path.join(mediaBase, file.fileName);
        bot.sendVideo(chatId, filePath, {
            caption: `🎬 ${file.title}`
        });
    } else {
        bot.sendMessage(chatId, "❌ Bunday ID mavjud emas.");
    }
};
