const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "ping",
    alias: ["speed","pong"],use: '.ping',
    desc: "Check bot's response time.",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        const start = Date.now();
        const reactionEmojis = ['🔥', '⚡', '🚀', '💨', '🎯', '🎉', '🌟', '💥', '🕐', '🔹'];
        const textEmojis = ['💎', '🏆', '⚡️', '🚀', '🎶', '🌠', '🌀', '🔱', '🛡️', '✨'];
        let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        await conn.sendMessage(from, { react: { text: textEmoji, key: mek.key } });
        const end = Date.now();
        const responseTime = end - start;
        const text = `*⚡ Syed zada X niazi 𝐌𝐃 SPEED TEST ⚡*\n\n*🚀 Response Time:* ${responseTime} ms\n*✨ Status:* \`Super Fast & Active\`\n*🎈 Host:* \`High Speed Server\`\n\n> *Powered by Syed zada X niazi 𝐌𝐃*`;
        await conn.sendMessage(from, { text, contextInfo: { mentionedJid: [sender], forwardingScore: 999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: (config.NEWSLETTER_JIDS.find(Boolean) || ''), newsletterName: "Syed zada X niazi 𝐌𝐃", serverMessageId: 143 } } }, { quoted: mek });
    } catch (e) { console.error("Error in ping command:", e); reply(`An error occurred: ${e.message}`); }
});

cmd({
    pattern: "ping2",
    desc: "Check bot's response time.",
    category: "main",
    react: "⚡",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const startTime = Date.now();
        const endTime = Date.now();
        const ping = endTime - startTime;
        let status;
        if (ping < 100) status = "🚀 *Blazing Fast*";
        else if (ping < 500) status = "⚡ *Fast & Responsive*";
        else status = "🐢 *Slow Response*";
        const msg = `*╭┈──〔 ⚡ Syed zada X niazi 𝐌𝐃 SPEED 〕─⊷*\n*├▢ 📶 Latency:* ${ping} ms\n*├▢ 🧠 Status:* ${status}\n*├▢ 💫 Mode:* \`Active & Stable\`\n*├▢ 🛡️ Security:* \`Secured\`\n*╰───────────────⊷*`;
        await conn.sendMessage(from, { text: msg.trim() }, { quoted: mek });
    } catch (e) { console.log(e); reply(`⚠️ Error: ${e.message}`); }
});