const fs = require('fs');
const path = require('path');
const about = require('./about');
const sendMedia = require('./upload/media-upload/send');
const usersPath = path.join(__dirname, 'users-base/users.json');

function handleCommands(bot) {
    bot.onText(/\/help/, (msg) => {
        about(bot, msg);
    });

    bot.onText(/\/login/, (msg) => {
        bot.sendMessage(msg.chat.id, `🔐 Admin panel uchun link: https://ate-created-admin.railway.app`);
    });

    bot.onText(/\/load/, (msg) => {
        const chatId = msg.chat.id;
        const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
        const user = users.find(u => u.id === chatId);
        if (user && user.role === 'admin') {
            bot.sendMessage(chatId, "📤 Yuklamoqchi bo'lgan video ID sini yuboring:");
        } else {
            bot.sendMessage(chatId, "❌ Bu komanda faqat adminlar uchun.");
        }
    });

    // Video ID yuborilganda
    bot.on('message', (msg) => {
        if (/^\d+$/.test(msg.text)) {
            sendMedia(bot, msg);
        }
    });
}

module.exports = { handleCommands };
