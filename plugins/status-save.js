const { cmd } = require("../command");
const config = require('../config');
const commandKeywords = ["send", "sendme", "do", "give", "bhejo", "bhej", "save", "sand", "sent", "forward"];
cmd({'on': "body"}, async (client, message, store, { from, body, isGroup, isAdmins, isBotAdmins, reply, sender, userConfig }) => {
  try {
    if (isGroup) return;
    const messageText = body.toLowerCase();
    const containsKeyword = commandKeywords.some(word => messageText.includes(word));
    if (containsKeyword && message.quoted?.chat === 'status@broadcast') {
      await client.sendMessage(from, { react: { text: '⏳', key: message.key } });
      const buffer = await message.quoted.download();
      const mtype = message.quoted.mtype;
      const originalCaption = message.quoted.text || '';
      const options = { quoted: message };
      const DESCRIPTION = userConfig?.DESCRIPTION || config.DESCRIPTION || "";
      let messageContent = {};
      switch (mtype) {
        case "imageMessage": messageContent = { image: buffer, caption: originalCaption ? `${originalCaption}\n\n> ${DESCRIPTION}` : (DESCRIPTION ? `> ${DESCRIPTION}` : ""), mimetype: message.quoted.mimetype || "image/jpeg" }; break;
        case "videoMessage": messageContent = { video: buffer, caption: originalCaption ? `${originalCaption}\n\n> ${DESCRIPTION}` : (DESCRIPTION ? `> ${DESCRIPTION}` : ""), mimetype: message.quoted.mimetype || "video/mp4" }; break;
        case "audioMessage": messageContent = { audio: buffer, mimetype: "audio/mp4", ptt: message.quoted.ptt || false }; break;
        default: await client.sendMessage(from, { react: { text: '❌', key: message.key } }); return;
      }
      try { await client.sendMessage(from, messageContent, options); await client.sendMessage(from, { react: { text: '✅', key: message.key } }); }
      catch (sendError) { console.error("Failed to send status:", sendError); await client.sendMessage(from, { react: { text: '❌', key: message.key } }); }
    }
  } catch (error) {
    console.error("Keyword Status Save Error:", error);
    if (message && message.key) try { await client.sendMessage(from, { react: { text: '❌', key: message.key } }); } catch (reactError) { console.error("Failed to send error reaction:", reactError); }
  }
});