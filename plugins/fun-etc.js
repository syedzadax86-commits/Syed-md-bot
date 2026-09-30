const axios = require("axios");
const { cmd } = require("../command");
const { fetchGif, gifToVideo } = require("../lib/fetchGif");

cmd({
  pattern: "marige",
  alias: ["shadi", "marriage", "wedding"],
  desc: "Randomly pairs two users for marriage with a wedding GIF",
  react: "💍",
  category: "fun",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups!");

    const participants = groupMetadata.participants.map(user => user.id);
    const eligibleParticipants = participants.filter(id => id !== sender && !id.includes(conn.user.id.split('@')[0]));

    if (eligibleParticipants.length < 1) return reply("❌ Not enough participants to perform a marriage!");

    const randomIndex = Math.floor(Math.random() * eligibleParticipants.length);
    const randomPair = eligibleParticipants[randomIndex];

    const weddingApis = ["https://nekos.best/api/v2/hug", "https://api.waifu.pics/sfw/hug"];
    let gifUrl = null;
    for (const apiUrl of weddingApis) {
      try {
        const res = await axios.get(apiUrl, { timeout: 15000, headers: { "User-Agent": "Syed-Zada-X-Niazi-MD (https://github.com/saabj5614-web/syed_zada_x_niazi_md)" } });
        gifUrl = res.data?.results?.[0]?.url || res.data?.url;
        if (gifUrl) break;
      } catch (_) {}
    }
    if (!gifUrl) throw new Error("Wedding GIF API unavailable");

    let gifBuffer = await fetchGif(gifUrl);
    let videoBuffer = await gifToVideo(gifBuffer);

    const message = `💍 *Shadi Mubarak!* 💒\n\n👰 @${sender.split("@")[0]} + 🤵 @${randomPair.split("@")[0]}\n\nMay you both live happily ever after! 💖\n\n> Powered by Syed zada X niazi 𝐌𝐃`;

    await conn.sendMessage(
      mek.chat,
      { video: videoBuffer, caption: message, gifPlayback: true, mentions: [sender, randomPair] },
      { quoted: mek }
    );
  } catch (error) {
    console.error("❌ Error in .marige command:", error);
    reply(`❌ *Error in .marige command:*\n\`\`\`${error.message}\`\`\``);
  }
});