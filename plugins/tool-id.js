// Syed zada X niazi 𝐌𝐃
const { cmd } = require('../command');

async function lidToPhone(conn, lid) {
    try {
        const pn = await conn.signalRepository.lidMapping.getPNForLID(lid);
        if (pn) return cleanPN(pn);
        return lid.split("@")[0];
    } catch (e) { return lid.split("@")[0]; }
}
function cleanPN(pn) { return pn.split(":")[0]; }

cmd({
    pattern: "id", alias: ["chatid", "jid", "gjid", "channelid", "newsletter", "cid"],
    desc: "Get various IDs (chat, user, group, or channel)", react: "⚡", category: "utility", filename: __filename,
}, async (conn, mek, m, { from, isGroup, reply, sender, fromMe, botNumber2 }) => {
    try {
        if (m.text && m.text.includes('whatsapp.com/channel/')) {
            const match = m.text.match(/whatsapp\.com\/channel\/([\w-]+)/);
            if (!match) return reply("⚠️ *Invalid channel link format.*\n\nMake sure it looks like:\nhttps://whatsapp.com/channel/xxxxxxxxx");
            let metadata;
            try { metadata = await conn.newsletterMetadata("invite", match[1]); } catch (e) { return reply("❌ Failed to fetch channel metadata. Make sure the link is correct."); }
            if (!metadata || !metadata.id) return reply("❌ Channel not found or inaccessible.");
            return reply(`> ${metadata.id}`);
        }
        if (isGroup) {
            const groupJID = from.includes('@g.us') ? from : `${from}@g.us`;
            return reply(`> *Group JID:* ${groupJID}`);
        } else {
            if (fromMe) return reply(`> *Your ID:* ${botNumber2.split('@')[0]}@s.whatsapp.net`);
            let senderPN = sender.split('@')[0];
            if (sender.includes('@lid')) senderPN = await lidToPhone(conn, sender);
            return reply(`> *Your ID:* ${senderPN}@s.whatsapp.net`);
        }
    } catch (e) { console.error("ID Command Error:", e); return reply(`⚠️ Error: ${e.message}`); }
});

cmd({
    pattern: "getlid", alias: ["lidonly", "lid", "mylid"],
    desc: "Get your LID (@lid) directly without conversion", react: "🆔", category: "utility", filename: __filename,
}, async (conn, mek, m, { from, isGroup, reply, sender, fromMe, botNumber2, mentionUser }) => {
    try {
        const mentionedUser = mentionUser ? mentionUser[0] : null;
        if (mentionedUser) return mentionedUser.includes('@lid') ? reply(`> *User LID:* ${mentionedUser}`) : reply("⚠️ Mentioned user is not in LID format.");
        if (isGroup) return sender.includes('@lid') ? reply(`> *Your LID:* ${sender}`) : reply("⚠️ You don't have a LID format in this chat.");
        if (fromMe) return botNumber2.includes('@lid') ? reply(`> *Bot LID:* ${botNumber2}`) : reply(`> *Bot Number:* ${botNumber2}`);
        return sender.includes('@lid') ? reply(`> *Your LID:* ${sender}`) : reply(`⚠️ You don't have a LID format. Your current ID: ${sender}`);
    } catch (e) { console.error("GetLID Command Error:", e); return reply(`⚠️ Error: ${e.message}`); }
});