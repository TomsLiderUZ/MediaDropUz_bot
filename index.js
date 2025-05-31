const TelegramBot = require('node-telegram-bot-api');
const { BOT_TOKEN } = require('./config');
const fs = require('fs');
const { handleCommands } = require('./src/commands');
const { setupButtons } = require('./src/buttons');
const welcomeUser = require('./public/welcome');
const path = require('path');

// --- Botni ishga tushirish ---
if (!BOT_TOKEN) {
  console.error('❌ BOT_TOKEN aniqlanmadi!');
  process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Komandalarni boshqarish
handleCommands(bot);

// Tugmalarni ulash
setupButtons(bot);

// Start komandasi uchun xush kelibsiz xabari
bot.onText(/\/start/, (msg) => welcomeUser(bot, msg));

// Bot ishlayotganini bildirish
console.log('🤖 Telegram bot ishga tushdi');

// --- Localhost serverni avtomatik ishga tushirish ---
const { exec } = require('child_process');

// To‘g‘ri yo‘l: src/admin/server.js
const serverPath = path.join(__dirname, 'src', 'admin', 'server.js');

exec(`node "${serverPath}"`, (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Serverda xatolik: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`⚠️ Server ogohlantirishi: ${stderr}`);
    return;
  }
  console.log(`🌐 Localhost server ishga tushdi: http://localhost:3300`);
});
