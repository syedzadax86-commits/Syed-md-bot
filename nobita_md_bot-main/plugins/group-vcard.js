const { cmd } = require("../command");

cmd({
  pattern: "vcard",
  alias: ["contacts"],
  desc: "Create a contact card for group members",
  category: "group",
  filename: __filename,
  react: "📇"
}, async (conn, mek, m, { from, isGroup, isAdmins, isCreator, reply }) => {
  try {
    if (!isGroup) return await reply("⚠️ This command only works in groups.");
    if (!isAdmins && !isCreator) return await reply("🔐 Only admins can use this command.");

    const metadata = await conn.groupMetadata(from);
    const participants = metadata.participants || [];

    if (!participants.length) return await reply("❌ No members found.");

    const contacts = participants.map((p, i) => {
      const number = p.id.split("@")[0];
      return `BEGIN:VCARD
VERSION:3.0
FN:Member ${i + 1}
TEL;TYPE=CELL:+${number}
END:VCARD`;
    }).join("\n");

    await conn.sendMessage(from, {
      document: Buffer.from(contacts),
      fileName: "group-contacts.vcf",
      mimetype: "text/vcard"
    }, { quoted: mek });
  } catch (err) {
    console.error(err);
    await reply("❌ Failed to create contact card.");
  }
});