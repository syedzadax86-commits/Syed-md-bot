const { cmd } = require("../command");

cmd({
  pattern: "chai",
  desc: "Send a simple chai message",
  category: "fun",
  react: "☕",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  return reply("☕ Chai time!");
});