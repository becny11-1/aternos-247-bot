const mineflayer = require('mineflayer');
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Minecraft 24/7 AFK Bot is Active!\n');
});
server.listen(process.env.PORT || 3000, () => {
  console.log('Web helper server listening on port ' + (process.env.PORT || 3000));
});

function createBot() {
  console.log('Attempting to connect bot to server...');
  
  const bot = mineflayer.createBot({
    host: 'Corruupt.aternos.me',
    port: 16605,
    username: 'Aternos_247_Bot',
    auth: 'offline',
    version: '1.21',
    checkTimeoutInterval: 60000,
    viewDistance: 'tiny'
  });

  bot.on('spawn', () => {
    console.log('Success: Bot has successfully joined Corruupt.aternos.me:16605!');
  });

  const afkInterval = setInterval(() => {
    if (bot && bot.entity) {
      bot.setControlState('jump', true);
      setTimeout(() => {
        if (bot && bot.entity) bot.setControlState('jump', false);
      }, 500);
    }
  }, 45500);

  bot.on('kicked', (reason) => {
    console.log('Bot was kicked from the server. Reason:', reason);
    clearInterval(afkInterval);
    console.log('Reconnecting to server in 15 seconds...');
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => {
    console.error('An unexpected connection error occurred:', err.message);
    clearInterval(afkInterval);
    console.log('Reconnecting to server in 15 seconds...');
    setTimeout(createBot, 15000);
  });
}

createBot();
