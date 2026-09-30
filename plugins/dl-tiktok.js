const axios = require("axios");
const { cmd } = require("../command");

cmd({
    pattern: "tiktok",
    alias: ["tt", "ttdl"],
    desc: "Download TikTok video using multiple APIs",
    category: "download",
    react: "🎵",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply("🎯 Please provide a valid TikTok link!\n\nExample:\n.tt link");

        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

        let videoUrl, title, author, username;

        try {
            const api1 = `https://jawad-tech.vercel.app/download/tiktok?url=${encodeURIComponent(q)}`;
            const res1 = await axios.get(api1);
            const data1 = res1.data;

            if (data1?.status && data1?.result) {
                videoUrl = data1.result;
                title = data1.metadata?.title || "Unknown Title";
                author = data1.metadata?.author || "Unknown Author";
                username = data1.metadata?.username || "unknown";
            } else throw new Error("First API failed");
        } catch (api1Error) {
            try {
                const api2 = `https://jawad-tech.vercel.app/download/ttdl?url=${encodeURIComponent(q)}`;
                const res2 = await axios.get(api2);
                const data2 = res2.data;

                if (data2?.status && data2?.result) {
                    videoUrl = data2.result;
                    title = data2.metadata?.title || "Unknown Title";
                    author = data2.metadata?.author?.nickname || data2.metadata?.author || "Unknown Author";
                    username = data2.metadata?.author?.username?.replace('@', '') || "unknown";
                } else throw new Error("Second API also failed");
            } catch (api2Error) {
                try {
                    const fallback = await axios.get(`https://api.siputzx.my.id/api/d/tiktok?url=${encodeURIComponent(q)}`, { timeout: 30000 });
                    const fd = fallback.data;
                    if (fd?.status && fd?.data) {
                        videoUrl = fd.data.video_url || fd.data.url || fd.data.download_url || fd.data.urls?.[0];
                        title = fd.data.metadata?.title || "TikTok Video";
                        author = fd.data.metadata?.author || "Unknown Author";
                        username = "unknown";
                    }
                    if (!videoUrl) throw new Error("SiputzX returned no video URL");
                } catch (fallbackError) {
                    return await reply("❌ All TikTok download APIs failed! Try again later.");
                }
            }
        }

        if (!videoUrl) return await reply("❌ Download failed! No video URL found.");

        await conn.sendMessage(from, { 
            video: { url: videoUrl },
            mimetype: 'video/mp4',
            caption: `🎵 ${title}\n👤 *Author:* ${author}\n⚡ *Username:* @${username}\n\n> *Powered by Syed zada X niazi 𝐌𝐃 ✅*`
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (e) {
        console.error("Error in .tiktok:", e);
        await reply("❌ Error occurred while downloading TikTok video!");
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});

cmd({
    pattern: "tiktok2",
    alias: ["tt2", "ttdl2"],
    desc: "Download TikTok video using Syed zada X niazi 𝐌𝐃 API",
    category: "download",
    react: "🎬",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply("🎯 Please provide a valid TikTok link!\n\nExample:\n.tt2 link");
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

        const api = `https://jawad-tech.vercel.app/download/tiktok?url=${encodeURIComponent(q)}`;
        const res = await axios.get(api);
        const json = res.data;

        if (!json?.status || !json?.result) return await reply("❌ Download failed! Try again later.");
        const meta = json.metadata;

        await conn.sendMessage(from, { 
            video: { url: json.result },
            mimetype: 'video/mp4',
            caption: `🎵 *${meta.title}*\n👤 *Author:* ${meta.author}\n📱 *Username:* @${meta.username}\n🌍 *Region:* ${meta.region}\n\n✨ *Powered by Syed zada X niazi 𝐌𝐃*`
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
    } catch (e) {
        console.error("Error in .tiktok2:", e);
        await reply("❌ Error occurred while downloading TikTok video!");
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});

cmd({
    pattern: "tiktok3",
    alias: ["tt3", "ttdl3"],
    desc: "Download HD TikTok videos using Syed zada X niazi 𝐌𝐃 API",
    category: "download",
    react: "🎬",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply("🎯 Please provide a valid TikTok link!\n\nExample:\n.tt3 link ");
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

        const api = `https://jawad-tech.vercel.app/download/ttdl?url=${encodeURIComponent(q)}`;
        const res = await axios.get(api);
        const json = res.data;

        if (!json?.status || !json?.result) return await reply("❌ Download failed! Try again later.");
        const meta = json.metadata;

        const caption = `
🎬 *${meta.title}*

👤 *Author:* ${meta.author.nickname} (${meta.author.username})
🎵 *Music:* ${meta.music.title}
💿 *By:* ${meta.music.author}

📊 *Stats:*
   • Views: ${meta.stats.views}
   • Likes: ${meta.stats.likes}
   • Shares: ${meta.stats.shares}
   • Comments: ${meta.stats.comments}
   • Downloads: ${meta.stats.downloads}

🌍 *Region:* ${meta.region}
🕒 *Duration:* ${meta.duration}s
📅 *Published:* ${meta.published}

✨ *Powered By Syed zada X niazi 𝐌𝐃*
        `.trim();

        await conn.sendMessage(from, { video: { url: json.result }, mimetype: 'video/mp4', caption }, { quoted: mek });
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
    } catch (e) {
        console.error("Error in .tiktok3:", e);
        await reply("❌ Error occurred while downloading TikTok video!");
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});

cmd({
    pattern: "fb",
    alias: ["facebook", "fbdl"],
    desc: "Download Facebook video",
    category: "download",
    react: "📘",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply("🎯 Please provide a valid Facebook link!\n\nExample:\n.fb link");
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

        const api = `https://api-aswin-sparky.koyeb.app/api/downloader/fbdl?url=${encodeURIComponent(q)}`;
        const res = await axios.get(api);
        const json = res.data;

        if (!json || json.status !== true || !json.data) return await reply("❌ Download failed! Could not fetch video.");

        const videoUrl = json.data.high || json.data.low;
        if (!videoUrl) return await reply("❌ No downloadable video URL found.");

        const title = json.data.title || "Facebook Video";

        await conn.sendMessage(from, { 
            video: { url: videoUrl },
            mimetype: 'video/mp4',
            caption: `🎬 *${title}*\n\n✨ *Powered by Syed zada X niazi 𝐌𝐃*`
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
    } catch (e) {
        console.error("Error in .fb:", e);
        await reply("❌ Error occurred while downloading Facebook video!");
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});
