const { cmd } = require("../command");

cmd({
  pattern: "kickall",
  alias: ["removeall"],
  desc: "Remove all non-admin members from group",
  category: "group",
  filename: __filename,
  react: "👢"
}, async (conn, mek, m, { from, isGroup, isBotAdmins, isCreator, isAdmins, reply }) => {
  try {
    if (!isGroup) return await reply("⚠️ Group only.");
    if (!isBotAdmins) return await reply("❌ I need admin.");
    if (!isCreator && !isAdmins) return await reply("🔐 Admins only.");

    const metadata = await conn.groupMetadata(from);
    const targets = metadata.participants
      .filter(p => !p.admin && p.id !== conn.user.id)
      .map(p => p.id);

    if (!targets.length) return await reply("ℹ️ No non-admin members to remove.");

    await conn.groupParticipantsUpdate(from, targets, "remove");
    await reply(`✅ Removed ${targets.length} non-admin member${targets.length === 1 ? "" : "s"}.`);
  } catch (err) {
    console.error(err);
    await reply("❌ Failed to remove members.");
  }
});