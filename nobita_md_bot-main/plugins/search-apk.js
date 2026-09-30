const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: "playstore",
  alias: ["ps", "appsearch"],
  desc: "Search any Android app from Play Store.",
  category: "utility",
  react: "📱",
  use: ".playstore <app name>",
  filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
  try {
    if (!args[0]) return reply("📍 Please provide an app name.\n\nExample: *.playstore Free Fire*");
    const query = args.join(" ");
    const { data } = await axios.get(`https://api.hanggts.xyz/search/playstore?q=${encodeURIComponent(query)}`);
    if (!data.status || !data.result || data.result.length === 0) return reply("❌ No results found for your query.");
    const app = data.result[0];
    const caption = `📱 *PLAY STORE APP FOUND!*\n\n🏷️ *Name:* ${app.nama}\n👨‍💻 *Developer:* ${app.developer}\n⭐ *Rating:* ${app.rate2}\n🌐 *App Link:* ${app.link}\n🧑‍💻 *Dev Page:* ${app.link_dev}`;
    await conn.sendMessage(from, { image: { url: app.img }, caption }, { quoted: mek });
  } catch (err) {
    console.error("PLAYSTORE SEARCH ERROR:", err);
    reply("⚠️ Error fetching Play Store results. Please try again later.");
  }
});