const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ],
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

function updateStatus() {
  const statusMessages = ["👷‍♂️ 𝗖𝗜𝗩𝗜𝗟 𝗘𝗡𝗚𝗜𝗡𝗘𝗘𝗥𝗦", "👷‍♀️ 𝗖𝗜𝗩𝗜𝗟 𝗘𝗡𝗚𝗜𝗡𝗘𝗘𝗥𝗦"];
  const currentStatus = statusMessages[0]; // Update this to cycle or select
  client.user.setPresence({
    activities: [{ name: `${currentStatus}`, type: ActivityType.Watching }],
    status: 'online',
  });
  console.log('\x1b[33m[ STATUS ]\x1b[0m', `Updated status to: Watching ${currentStatus}`);
}

function heartbeat() {
  setInterval(() => {
    console.log('\x1b[35m[ HEARTBEAT ]\x1b[0m', `Bot is alive at ${new Date().toLocaleTimeString()}`);
  }, 30000);
}

client.once('ready', () => {
  console.log('\x1b[36m[ INFO ]\x1b[0m', `\x1b[34mPing: ${client.ws.ping} ms \x1b[0m`);
  updateStatus();
  setInterval(updateStatus, 10000);
  heartbeat();
});

login();
