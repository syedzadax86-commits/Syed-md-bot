const { cmd } = require("../command");
const axios = require("axios");

cmd({
  pattern: "ss",
  alias: ["ssweb", "screenshot"],
  react: "🌐",
  desc: "Take website screenshot.",
  category: "utility",
  use: ".ss <url>",
  filename: __filename
}, async (conn, m, store, { from, args, reply }) => {
  try {
    const url = args[0];
    if (!url) return reply("❌ Please provide a URL\nExample: .ss https://google.com");
    if (!url.startsWith("http")) return reply("❌ URL must start with http:// or https://");
    await reply("📸 Capturing website screenshot...");
    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });
    const apiUrl = `https://api.hanggts.xyz/tools/ssweb?url=${encodeURIComponent(url)}`;
    let data;
    try { ({ data } = await axios.get(apiUrl, { timeout: 30000 })); }
    catch (_) {
      const r = await axios.get(`https://eliteprotech-apis.zone.id/ssweb?url=${encodeURIComponent(url)}`, { timeout: 30000, responseType: 'arraybuffer' });
      const ct = r.headers['content-type'] || '';
      if (ct.includes('image')) {
        await conn.sendMessage(from, { image: Buffer.from(r.data), caption: `🖼️ *Website Screenshot*\n\n🌐 *URL:* ${url}\n\n> *© Powered by Syed zada X niazi 𝐌𝐃*` }, { quoted: m });
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
        return;
      }
      throw new Error('Screenshot fallback returned no image');
    }
    if (data.status && data.result) {
      await conn.sendMessage(from, { image: { url: data.result.iurl }, caption: `🖼️ *Website Screenshot*\n\n🌐 *URL:* ${data.result.ourl}\n\n> *© Powered by Syed zada X niazi 𝐌𝐃*` }, { quoted: m });
      await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
    } else {
      reply("❌ Failed to capture screenshot. Please try again.");
      await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
  } catch (error) {
    console.error("Screenshot Error:", error);
    reply("❌ An error occurred while capturing screenshot.");
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});