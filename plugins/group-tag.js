const { cmd } = require("../command");

cmd({
  pattern: "tag",
  alias: ["mention"],
  desc: "Mention a specific member by number",
  category: "group",
  filename: __filename,
  react: "🏷️"
}, async (conn, mek, m, { from, args, isGroup, reply }) => {
  try {
    if (!isGroup) return await reply("⚠️ This command only works in groups.");
    if (!args[0]) return await reply("❓ Provide a number to mention.");

    const number = args[0].replace(/[^0-9]/g, "");
    if (!number) return await reply("⚠️ Invalid number.");

    const jid = number + "@s.whatsapp.net";
    await conn.sendMessage(from, {
      text: `@${number}`,
      mentions: [jid]
    }, { quoted: mek });
  } catch (err) {
    console.error(err);
    await reply("❌ Failed to mention user.");
  }
});