const { cmd } = require('../command');

cmd({
    pattern: "vcard",
    alias: ["vcf", "contacts"],
    desc: "Create a vCard for a mentioned user",
    category: "utility",
    react: "👤",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    const user = m.mentionedJid && m.mentionedJid[0];
    if (!user) return reply('❌ Tag a user to create a contact.');
    try {
        const number = user.split('@')[0].split(':')[0];
        const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:+${number}\nTEL;type=CELL;type=VOICE;waid=${number}:+${number}\nEND:VCARD`;
        await conn.sendMessage(from, { contacts: { displayName: `+${number}`, contacts: [{ vcard }] } }, { quoted: mek });
    } catch (e) { console.error(e); reply('❌ Failed to create contact.'); }
});