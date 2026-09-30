const { cmd } = require("../command");

cmd({
  pattern: "join",
  desc: "Join a WhatsApp group using invite link",
  category: "group",
  filename: __filename,
  react: "🔗"
}, async (conn, mek, m, { from, args, isCreator, reply }) => {
  try {
    if (!isCreator) return await reply("🔐 Owner only.");
    if (!args[0]) return await reply("❓ Please provide a group invite link.");

    const match = args[0].match(/chat\.whatsapp\.com\/([A-Za-z0-9_-]+)/);
    if (!match) return await reply("❌ Invalid WhatsApp group invite link.");

    const code = match[1];
    const result = await conn.groupAcceptInvite(code);
    await reply(`✅ Successfully joined the group.\nID: ${result}`);
  } catch (err) {
    console.error(err);
    await reply("❌ Failed to join the group.");
  }
});