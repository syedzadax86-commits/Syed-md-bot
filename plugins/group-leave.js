const { cmd } = require("../command");

cmd({
  pattern: "leave",
  alias: ["left"],
  desc: "Make the bot leave the current group",
  category: "group",
  filename: __filename,
  react: "👋"
}, async (conn, mek, m, { from, isGroup, isCreator, reply }) => {
  try {
    if (!isGroup) return await reply("⚠️ This command only works in groups.");
    if (!isCreator) return await reply("🔐 Owner only.");

    await reply("👋 Goodbye everyone!");
    await conn.groupLeave(from);
  } catch (err) {
    console.error(err);
    await reply("❌ Failed to leave the group.");
  }
});