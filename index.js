const mineflayer = require('mineflayer');
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is running!\n');
});
server.listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'Corruupt.aternos.me',
    port: 16605,
    username: 'becny11@gmail.com',
    auth: 'microsoft',
    version: '1.21'
  });

  bot.on('spawn', () => {
    console.log('Success: Bot has joined the server!');
  });

  setInterval(() => {
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 500);
  }, 60000);

  bot.on('kicked', (reason) => {
    console.log('Kicked from server. Reconnecting in 15 seconds...', reason);
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => {
    console.log('Error encountered. Reconnecting in 15 seconds...', err);
    setTimeout(createBot, 15000);
  });
}

createBot();
