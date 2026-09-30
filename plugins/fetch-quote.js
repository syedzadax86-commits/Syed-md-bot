const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "quote",
  alias: ["quotes", "qotd"],
  react: "💬",
  desc: "Get a random quote",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  try {
    const { data } = await axios.get("https://api.quotable.io/random");
    await reply(`💬 *"${data.content}"*\n\n— ${data.author}`);
  } catch (e) {
    console.error(e);
    reply("❌ Failed to fetch a quote.");
  }
});