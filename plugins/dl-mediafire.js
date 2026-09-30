const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "mediafire",
  alias: ["mfire", "mfdownload"],
  react: '📥',
  desc: "Download any file from MediaFire",
  category: "download",
  use: ".mediafire <MediaFire URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const url = args.join(" ");
    if (!url || !url.includes("mediafire.com")) return reply("❌ Please provide a valid MediaFire URL");
    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });
    const { data } = await axios.get(`https://api.deline.web.id/downloader/mediafire?url=${encodeURIComponent(url)}`);
    if (!data || !data.status || !data.result || !data.result.downloadUrl || !data.result.fileName) return reply("❌ Failed to fetch file info.");
    const fileName = data.result.fileName;
    const downloadUrl = data.result.downloadUrl;
    const fileResponse = await axios.get(downloadUrl, { responseType: 'arraybuffer' });
    const fileBuffer = Buffer.from(fileResponse.data);
    const ext = fileName.split('.').pop().toLowerCase();
    let mimetype = 'application/octet-stream';
    if (ext === 'mp4') mimetype = 'video/mp4';
    else if (ext === 'apk') mimetype = 'application/vnd.android.package-archive';
    else if (ext === 'zip') mimetype = 'application/zip';
    else if (ext === 'js') mimetype = 'text/javascript';
    const messageOptions = { document: fileBuffer, fileName, mimetype, caption: `*MediaFire Download*\n\n📄 *File:* ${fileName}\n\nPowered by Syed zada X niazi 𝐌𝐃` };
    await conn.sendMessage(from, messageOptions, { quoted: mek });
    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
  } catch (error) { console.error("MediaFire Error:", error); reply("❌ Failed to download file."); await conn.sendMessage(from, { react: { text: '❌', key: m.key } }); }
});