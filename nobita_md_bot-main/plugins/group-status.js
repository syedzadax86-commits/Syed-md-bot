const { cmd } = require("../command");

cmd({
  pattern: "gstatus",
  alias: ["groupstatus"],
  desc: "Show current group status",
  category: "group",
  filename: __filename,
  react: "📊"
}, async (conn, mek, m, { from, isGroup, reply }) => {
  try {
    if (!isGroup) return await reply("⚠️ This command only works in groups.");

    const metadata = await conn.groupMetadata(from);
    const admins = metadata.participants.filter(p => p.admin).length;
    const members = metadata.participants.length;

    const text = `*「 GROUP STATUS 」*

📛 *Name:* ${metadata.subject}
👥 *Members:* ${members}
👮 *Admins:* ${admins}
🆔 *ID:* ${metadata.id}
📝 *Description:* ${metadata.desc || "No description"}`;

    await reply(text);
  } catch (err) {
    console.error(err);
    await reply("❌ Failed to get group status.");
  }
});