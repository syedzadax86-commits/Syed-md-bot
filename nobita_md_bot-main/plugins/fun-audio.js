const { cmd } = require("../command");

cmd({
  pattern: "audiofun",
  alias: ["funaudio"],
  desc: "Fun audio command",
  category: "fun",
  react: "🎵",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  await reply("🎵 Fun audio command is ready.");
});