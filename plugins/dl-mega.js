const { cmd } = require('../command');
const { File } = require('megajs');
const fs = require('fs');
const path = require('path');
const os = require('os');

cmd({
    pattern: "megadl",
    alias: ["mega", "meganz"],
    react: "📦",
    desc: "Download ZIP or any file from Mega.nz",
    category: "download",
    use: '.megadl <mega file link>',
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("📦 Please provide a Mega.nz file link.");
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });
        const file = File.fromURL(q);
        const data = await new Promise((resolve, reject) => { file.download((err, data) => { if (err) reject(err); else resolve(data); }); });
        const savePath = path.join(os.tmpdir(), file.name || "mega_file.zip");
        fs.writeFileSync(savePath, data);
        await conn.sendMessage(from, { document: fs.readFileSync(savePath), fileName: file.name || "Syed zada X niazi 𝐌𝐃.zip", mimetype: "application/zip", caption: "📦 Downloaded from Mega NZ\n\nPowered By Syed zada X niazi 𝐌𝐃" }, { quoted: mek });
        fs.unlinkSync(savePath);
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
    } catch (error) { console.error("❌ MEGA Downloader Error:", error); reply("❌ Failed to download file from Mega.nz. Make sure the link is valid and file is accessible."); }
});