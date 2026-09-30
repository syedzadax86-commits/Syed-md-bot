const { cmd } = require("../command");

cmd({
  pattern: "caption",
  alias: ["cap", "recaption", "c"],
  react: '✏️',
  desc: "Add or change caption of media/document",
  category: "utility",
  filename: __filename
}, async (client, message, match, { from }) => {
  try {
    if (!message.quoted) return await client.sendMessage(from, { text: "*🍁 Please reply to a media message to add caption!*" }, { quoted: message });
    const quotedMsg = message.quoted;
    const buffer = await quotedMsg.download();
    if (!buffer) return await client.sendMessage(from, { text: "❌ Failed to download the media" }, { quoted: message });
    const cmdText = message.body.split(' ')[0].toLowerCase();
    const newCaption = message.body.slice(cmdText.length).trim();
    const messageContent = { caption: newCaption, mimetype: quotedMsg.mimetype };
    switch (quotedMsg.mtype) {
      case "imageMessage": messageContent.image = buffer; messageContent.mimetype ||= "image/jpeg"; break;
      case "videoMessage": messageContent.video = buffer; messageContent.mimetype ||= "video/mp4"; break;
      case "documentMessage": messageContent.document = buffer; messageContent.mimetype ||= "application/octet-stream"; break;
      case "audioMessage": messageContent.audio = buffer; messageContent.mimetype ||= "audio/mp4"; messageContent.ptt = quotedMsg.ptt || false; break;
      default: return await client.sendMessage(from, { text: "❌ Unsupported media type" }, { quoted: message });
    }
    await client.sendMessage(from, messageContent, { quoted: message });
  } catch (error) {
    console.error("Caption Error:", error);
    await client.sendMessage(from, { text: "❌ Error adding caption: " + (error.message || error.toString()) }, { quoted: message });
  }
});