const { cmd } = require('../command');

cmd({
    pattern: "retext",
    alias: ["re-caption", "rcap"],
    desc: "Replace caption of a replied media message",
    category: "utility",
    react: "✏️",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    if (!q) return reply('❌ Please provide the new caption.');
    if (!m.quoted) return reply('❌ Reply to a media message with the new caption.');
    try {
        const quoted = m.quoted;
        const mime = quoted.mtype || '';
        if (!mime) return reply('❌ Unsupported message.');
        const media = await quoted.download();
        if (mime.includes('image')) await conn.sendMessage(from, { image: media, caption: q }, { quoted: mek });
        else if (mime.includes('video')) await conn.sendMessage(from, { video: media, caption: q }, { quoted: mek });
        else if (mime.includes('document')) await conn.sendMessage(from, { document: media, caption: q }, { quoted: mek });
        else return reply('❌ This media type is not supported.');
    } catch (e) { console.error(e); reply('❌ Failed to replace caption.'); }
});