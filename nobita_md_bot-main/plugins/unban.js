const { cmd } = require("../command");

cmd({
  pattern: "unban",
  desc: "Unban a user from the current group",
  category: "group",
  filename: __filename
}, async (conn, mek, m, { reply, isAdmins, isBotAdmins }) => {
  if (!isAdmins) return reply("❌ Admins only.");
  if (!isBotAdmins) return reply("❌ Bot must be admin.");
  const jid = m.mentionedJid?.[0] || mek.quoted?.sender;
  if (!jid) return reply("❌ Mention or reply to a user.");
  try {
    await conn.groupParticipantsUpdate(m.chat, [jid], "unban");
    return reply("✅ Unban request sent.");
  } catch (e) {
    return reply("❌ Failed: " + e.message);
  }
});