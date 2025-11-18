const { 
  Client, 
  GatewayIntentBits, 
  ActivityType, 
  REST, 
  Routes, 
  SlashCommandBuilder 
} = require('discord.js');
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

const statusMessages = ["👷‍♂️ 𝗙𝗨𝗧𝗨𝗥𝗘 𝗥𝗖𝗘 𝟮𝟬𝟮𝟱", "👷‍♀️ 𝗙𝗨𝗧𝗨𝗥𝗘 𝗥𝗖𝗘 𝟮𝟬𝟮𝟱"];
let currentStatusIndex = 0;

// Define slash command
const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!')
    .toJSON()
];

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
  const currentStatus = statusMessages[currentStatusIndex];
  client.user.setPresence({
    activities: [{ name: currentStatus, type: ActivityType.Custom }],
    status: "online",
  });
  console.log('\x1b[33m[ STATUS ]\x1b[0m', `Updated status to: ${currentStatus} (online)`);
  currentStatusIndex = (currentStatusIndex + 1) % statusMessages.length;
}

function heartbeat() {
  setInterval(() => {
    console.log('\x1b[35m[ HEARTBEAT ]\x1b[0m', `Bot is alive at ${new Date().toLocaleTimeString()}`);
  }, 30000);
}

// Handle slash command interactions
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {

    // Prevent "Unknown Interaction (10062)" error
    await interaction.deferReply();

    // Actual reply
    await interaction.editReply('Pong! 🏓');

    // Active Developer log
    console.log(
      '\x1b[32m[ ACTIVE DEVELOPER ]\x1b[0m',
      'Slash command interaction processed ✔'
    );
  }
});

// Register slash command and other startup logic
client.once('ready', async () => {
  console.log('\x1b[36m[ INFO ]\x1b[0m', `\x1b[34mPing: ${client.ws.ping} ms \x1b[0m`);
  updateStatus();
  setInterval(updateStatus, 10000);
  heartbeat();

  // Active Developer reminder
  console.log(
    '\x1b[36m[ ACTIVE DEVELOPER ]\x1b[0m',
    'Use /ping once → then claim badge at:\nhttps://discord.com/developers/active-developer'
  );

  // Register slash command globally
  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
  try {
    console.log('\x1b[36m[ SLASH ]\x1b[0m Registering slash commands...');
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands }
    );
    console.log('\x1b[36m[ SLASH ]\x1b[0m Slash command registered: /ping ✅');
  } catch (error) {
    console.error('\x1b[31m[ ERROR ]\x1b[0m Failed to register slash commands:', error);
  }
});

login();
