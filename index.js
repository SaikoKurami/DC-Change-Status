const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
require('dotenv').config();
const express = require('express');
const path = require('path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ],
});

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  const imagePath = path.join(__dirname, 'index.html');
  res.sendFile(imagePath);
});
app.listen(port, () => {
  console.log('\x1b[36m[ SERVER ]\x1b[0m', '\x1b[32m SH : http://localhost:' + port + ' ✅\x1b[0m');
});

async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log('\x1b[36m[ LOGIN ]\x1b[0m', `\x1b[32mLogged in as: ${client.user.tag} ✅\x1b[0m`);
    console.log('\x1b[36m[ INFO ]\x1b[0m', `\x1b[35mBot ID: ${client.user.id} \x1b[0m`);
    console.log('\x1b[36m[ INFO ]\x1b[0m', `\x1b[34mConnected to ${client.guilds.cache.size} server(s) \x1b[0m`);
  } catch (error) {
    console.error('\x1b[31m[ ERROR ]\x1b[0m', 'Failed to log in:', error);
    process.exit(1);
  }
}

client.once('ready', () => {
  console.log('\x1b[36m[ INFO ]\x1b[0m', `\x1b[34mPing: ${client.ws.ping} ms \x1b[0m`);
  client.user.setPresence({
    activities: [{ name: "👷‍♂️ 𝗙𝗨𝗧𝗨𝗥𝗘 𝗘𝗡𝗚𝗜𝗡𝗘𝗘𝗥𝗦", type: ActivityType.Watching }],
    status: 'online', // 'online', 'idle', or 'dnd' can be set here
  });
  console.log('\x1b[33m[ STATUS ]\x1b[0m', `Set activity to: Watching 👷‍♂️ 𝗙𝗨𝗧𝗨𝗥𝗘 𝗘𝗡𝗚𝗜𝗡𝗘𝗘𝗥𝗦`);
});

login();
