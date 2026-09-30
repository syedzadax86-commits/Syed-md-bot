const { cmd } = require("../command");

cmd({
  pattern: "tagall",
  alias: ["everyone", "all"],
  desc: "Mention all group members",
  category: "group",
  filename: __filename,
  react: "📢"
}, async (conn, mek, m, { from, isGroup, isAdmins, isCreator, reply }) => {
  try {
    if (!isGroup) return await reply("⚠️ This command only works in groups.");
    if (!isAdmins && !isCreator) return await reply("🔐 Only admins can use this command.");

    const metadata = await conn.groupMetadata(from);
    const participants = metadata.participants || [];
    const mentions = participants.map(p => p.id);

    let text = "📢 *Attention Everyone!*\n\n";
    for (const p of participants) {
      text += `@${p.id.split("@")[0]} `;
    }

    await conn.sendMessage(from, { text, mentions }, { quoted: mek });
  } catch (err) {
    console.error(err);
    await reply("❌ Failed to tag members.");
  }
});