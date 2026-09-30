const { cmd } = require("../command");

cmd({
  pattern: "mute",
  alias: ["closegroup"],
  desc: "Mute group so only admins can send messages",
  category: "group",
  filename: __filename,
  react: "🔇"
}, async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, isCreator, reply }) => {
  try {
    if (!isGroup) return await reply("⚠️ Group only.");
    if (!isBotAdmins) return await reply("❌ I need admin.");
    if (!isAdmins && !isCreator) return await reply("🔐 Admins only.");

    await conn.groupSettingUpdate(from, "announcement");
    await reply("🔇 *Group muted.* Only admins can send messages now.");
  } catch (err) {
    console.error(err);
    await reply("❌ Failed to mute group.");
  }
});