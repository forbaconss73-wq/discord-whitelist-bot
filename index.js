import express from "express";
import { Client, GatewayIntentBits } from "discord.js";

const app = express();
app.use(express.json());

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

let whitelist = [];

client.on("ready", () => console.log(`✅ Logged in as ${client.user.tag}`));

client.on("messageCreate", (msg) => {
  if (!msg.content.startsWith("!whitelist")) return;
  const args = msg.content.split(" ");
  const name = args[1];
  if (!name) return msg.reply("⚠️ Type a Roblox username!");
  if (!whitelist.includes(name)) {
    whitelist.push(name);
    msg.reply(`✅ Whitelisted ${name}`);
  } else msg.reply(`⚠️ ${name} already whitelisted.`);
});

app.get("/check", (req, res) => {
  const name = req.query.username;
  res.json({ whitelisted: whitelist.includes(name) });
});

client.login(process.env.TOKEN);
app.listen(3000, () => console.log("🌐 Server running on port 3000"));
