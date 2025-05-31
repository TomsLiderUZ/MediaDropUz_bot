function setupButtons(bot) {
    bot.on('message', (msg) => {
        const opts = {
            reply_markup: {
                keyboard: [
                    ['🧷 Kirish', 'ℹ️ Yordam'],
                    ['📤 Media joylash']
                ],
                resize_keyboard: true
            }
        };

        if (msg.text === '🧷 Kirish') {
            bot.sendMessage(msg.chat.id, 'Admin panel linki: https://ate-created-admin.railway.app', opts);
        } else if (msg.text === 'ℹ️ Yordam') {
            bot.sendMessage(msg.chat.id, "MediaDropUzBot — bu video fayllarni ID orqali olish imkonini beruvchi bot.\n\nBuyruqlar:\n/start\n/help\n/login\n/load (faqat admin)");
        } else if (msg.text === '📤 Media joylash') {
            bot.sendMessage(msg.chat.id, "Foydalanish uchun /load komandasidan foydalaning.");
        }
    });
}

module.exports = { setupButtons };
