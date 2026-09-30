const { cmd } = require("../command");

cmd({
  pattern: "fullpp",
  alias: ["setpp", "setdp", "pp", "setppbot"],
  react: "🖼️",
  desc: "Owner Only - Set bot's profile picture",
  category: "owner",
  filename: __filename
}, async (client, message, match, { from, isCreator }) => {
  try {
    if (!isCreator) return client.sendMessage(from, { text: "*📛 This is an owner command.*" }, { quoted: message });
    if (!match.quoted || match.quoted.mtype !== "imageMessage") {
      return client.sendMessage(from, { text: "*🍁 Please reply to an image with .fullpp*" }, { quoted: message });
    }
    const buffer = await match.quoted.download();
    const botJid = client.decodeJid ? client.decodeJid(client.user.id) : client.user.id;
    await client.updateProfilePicture(botJid, buffer);
    return client.sendMessage(from, { text: "*✅ Bot's profile picture updated successfully!*" }, { quoted: message });
  } catch (error) {
    return client.sendMessage(from, { text: "❌ Error updating profile picture:\n" + error.message }, { quoted: message });
  }
});