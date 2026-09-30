const { cmd } = require("../command");
const axios = require("axios");

cmd({
  pattern: "img",
  alias: ["image", "searchimg"],
  react: "🫧",
  desc: "Search and download images",
  category: "other",
  use: ".img <query>",
  filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
  try {
    const query = args.join(" ");
    if (!query) return reply("🖼️ Please provide a search query");
    const response = await axios.get(`https://jawad-tech.vercel.app/search/gimage?q=${encodeURIComponent(query)}`);
    if (!response.data?.status || !response.data.result?.length) return reply("❌ No images found.");
    for (const image of response.data.result.slice(0, 5)) {
      await conn.sendMessage(from, {
        image: { url: image.url },
        caption: `*📷 Result for*: ${query}`
      }, { quoted: mek });
    }
  } catch (error) {
    reply(`❌ Error: ${error.message || "Failed to fetch images"}`);
  }
});