const { cmd } = require("../command");

cmd({
  pattern: "group",
  alias: ["groupsetting", "gsetting"],
  desc: "Change group settings",
  category: "group",
  filename: __filename,
  react: "⚙️"
}, async (conn, mek, m, { from, args, isGroup, isBotAdmins, isCreator, isAdmins, reply }) => {
  try {
    if (!isGroup) return await reply("⚠️ Group only.");
    if (!isBotAdmins) return await reply("❌ I need admin.");
    if (!isCreator && !isAdmins) return await reply("🔐 Admins only.");

    const action = args[0]?.toLowerCase();
    if (!["open", "close"].includes(action)) {
      return await reply("❓ Use: group open or group close");
    }

    await conn.groupSettingUpdate(from, action === "open" ? "not_announcement" : "announcement");
    await reply(`✅ Group messages are now ${action === "open" ? "open for everyone" : "admins only"}.`);
  } catch (err) {
    console.error(err);
    await reply("❌ Failed to update group setting.");
  }
});