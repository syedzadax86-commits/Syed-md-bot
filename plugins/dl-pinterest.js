// ✅ Coded by Syed zada X niazi 𝐌𝐃 for Syed zada X niazi 𝐌𝐃 MD

const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "pinterest",
    alias: ["pin", "pindl"],
    desc: "Download Pinterest videos/images",
    category: "download",
    react: "📌",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply("📌 *Please provide a Pinterest URL*");
        if (!q.includes('pinterest.com') && !q.includes('pin.it')) {
            return await reply("❌ *Invalid Pinterest URL!*\n\nPlease provide a valid Pinterest URL starting with 'pinterest.com' or 'pin.it'");
        }
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

        const apiUrl = `https://jawad-tech.vercel.app/download/pinterest?url=${encodeURIComponent(q)}`;
        const res = await axios.get(apiUrl);
        const data = res.data;
        if (!data?.status || !data?.result?.url) {
            return await reply("❌ *Failed to download!*\n\nCould not fetch media from Pinterest. Please check the URL and try again.");
        }

        const pinData = data.result;
        const isVideo = pinData.type === 'video';
        const caption = `╭━━━〔 *Syed zada X niazi 𝐌𝐃* 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ *PINS DOWNLOADER*
┃▸└───────────···๏
╰────────────────┈⊷
╭━━❐━⪼
┇๏ *Title:* ${pinData.title || 'No Title'}
┇๏ *Type:* ${isVideo ? 'Video' : 'Image'}
┇๏ *Platform:* Pinterest
┇๏ *Quality:* HD Ultra
╰━━❑━⪼
> *© Pᴏᴡᴇʀᴇᴅ Bʏ Syed zada X niazi 𝐌𝐃 ♡*`;

        if (isVideo) {
            await conn.sendMessage(from, { document: { url: pinData.url }, fileName: `Pinterest Video.mp4`, mimetype: 'video/mp4', caption }, { quoted: mek });
        } else {
            await conn.sendMessage(from, { document: { url: pinData.url }, fileName: `Pinterest Image.jpg`, mimetype: 'image/jpeg', caption }, { quoted: mek });
        }
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
    } catch (e) {
        console.error("❌ Error in .pinterest:", e);
        await reply("⚠️ *Something went wrong!*\n\nPlease try again with a different Pinterest URL.");
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});