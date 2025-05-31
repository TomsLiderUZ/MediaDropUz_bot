const fs = require('fs');
const path = require('path');

const usersPath = path.join(__dirname, '../src/users-base/users.json');

function welcomeUser(bot, msg) {
    const chatId = msg.chat.id;
    const userData = {
        id: chatId,
        username: msg.from.username || '',
        first_name: msg.from.first_name || '',
        role: 'user',
        joined_at: new Date().toISOString()
    };

    let users = [];

    if (fs.existsSync(usersPath)) {
        users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
    }

    const exists = users.some(user => user.id === chatId);
    if (!exists) {
        users.push(userData);
        fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
    }

    bot.sendMessage(chatId, `👋 Assalomu alaykum, ${msg.from.first_name}!\n\nMediaDropUzBot ga xush kelibsiz!`);
}

module.exports = welcomeUser;
