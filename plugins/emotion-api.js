const axios = require("axios");
const { cmd } = require("../command");
const { fetchGif, gifToVideo } = require("../lib/fetchGif");

const BRAND = "> Powered by Syed zada X niazi 𝐌𝐃";
const HEADERS = {
  timeout: 25000,
  headers: {
    "User-Agent": "Syed-Zada-X-Niazi-MD (https://github.com/saabj5614-web/syed_zada_x_niazi_md)",
    "Accept": "application/json"
  }
};

async function getEmotion(name) {
  const sources = [
    `https://nekos.best/api/v2/${encodeURIComponent(name)}`,
    `https://api.waifu.pics/sfw/${encodeURIComponent(name)}`
  ];

  let lastError;
  for (const url of sources) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const r = await axios.get(url, HEADERS);
        const u =
          r.data?.results?.[0]?.url ||
          r.data?.url ||
          r.data?.result?.url;

        if (u && /^https?:\/\//i.test(u)) return u;
        throw new Error("API returned no media URL");
      } catch (err) {
        lastError = err;
        if (attempt < 2) await new Promise(resolve => setTimeout(resolve, 700 * attempt));
      }
    }
  }
  throw lastError || new Error("Emotion API unavailable");
}

function emotionCommand(pattern, emoji, title) {
  cmd({ pattern, desc: title, category: "fun", react: emoji, filename: __filename },
    async (conn, mek, m, { reply, args }) => {
      try {
        const target = args.length ? args.join(" ") : "tum";
        const senderJid = m?.sender || mek?.key?.participant || mek?.participant || null;
        const context = mek?.message?.extendedTextMessage?.contextInfo ||
          mek?.message?.ephemeralMessage?.message?.extendedTextMessage?.contextInfo ||
          mek?.message?.viewOnceMessage?.message?.extendedTextMessage?.contextInfo || {};
        const repliedJid = context?.participant || context?.quotedMessage?.key?.participant || null;
        const mentions = [...new Set([senderJid, repliedJid].filter(Boolean))];
        const mentionText = mentions.length
          ? mentions.map(jid => "@" + jid.split("@")[0].split(":")[0]).join(" ")
          : target;
        const gifUrl = await getEmotion(pattern);
        const video = await gifToVideo(await fetchGif(gifUrl));
        await conn.sendMessage(mek.chat, {
          video,
          gifPlayback: true,
          caption: emoji + " *" + title.toUpperCase() + "*\n\n" + mentionText + " ke liye 💖\n\n" + BRAND,
          mentions
        }, { quoted: mek });
      } catch (e) {
        console.error(pattern + ":", e);
        await reply("❌ " + title + " service temporarily unavailable.\n\n" + BRAND);
      }
    });
}

emotionCommand("hug", "🫂", "Hug");
emotionCommand("kiss", "💋", "Kiss");
emotionCommand("pat", "🫳", "Pat");
emotionCommand("pet", "🐾", "Pet");
emotionCommand("cuddle", "🫂", "Cuddle");
emotionCommand("slap", "👋", "Slap");
emotionCommand("wink", "😉", "Wink");
emotionCommand("blush", "😊", "Blush");
emotionCommand("cry", "😢", "Cry");
emotionCommand("dance", "💃", "Dance");
emotionCommand("smile", "😊", "Smile");
emotionCommand("highfive", "🖐️", "High Five");
emotionCommand("handhold", "🤝", "Hand Hold");
emotionCommand("wave", "👋", "Wave");
emotionCommand("bite", "😈", "Bite");
emotionCommand("bonk", "🔨", "Bonk");