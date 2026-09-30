const { cmd } = require("../command");

cmd({
  pattern: "profile",
  alias: ["myprofile", "getprofile"],
  desc: "Show user profile",
  category: "user",
  react: "👤",
  filename: __filename
}, async (conn, mek, m, { from, sender, reply }) => {
  try {
    const jid = sender || m.sender;
    const number = jid ? jid.split("@")[0] : "Unknown";
    await reply(`👤 *PROFILE*\n\n📱 Number: ${number}`);
  } catch (e) {
    await reply("❌ Failed to get profile.");
  }
});