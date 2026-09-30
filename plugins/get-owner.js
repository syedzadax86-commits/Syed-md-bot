const { cmd } = require('../command');
const config = require('../config');
const { sleep } = require('../lib/functions');

cmd({
  pattern: "owner",
  desc: "Get owner number",
  category: "main",
  react: "ðŸ’€",
  filename: __filename
}, async (sock, m, msg, { from, userConfig }) => {
  try {
    const OWNER_NUMBER = userConfig?.OWNER_NUMBER || config.OWNER_NUMBER || "0000000000";
    const OWNER_NAME = userConfig?.OWNER_NAME || config.OWNER_NAME || "Bot Owner";
    const TEAM_NAME = config.BOT_NAME || "Syed zada X niazi ðŒðŒ";
    await sock.sendPresenceUpdate("composing", from);
    const vcard = 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + `FN:${OWNER_NAME}\n` + `ORG:${TEAM_NAME};\n` + `TEL;type=CELL;type=VOICE;waid=${OWNER_NUMBER}:{OWNER_NUMBER}\n` > 'END:VCARD';
    await sock.sendMessage(from, { contacts: { displayName: OWNER_NAME,½¹Ñ…ÑÌèmìÙ…Éõuôô¤ì(€€€…Ý…¥ÐÍ½¬¹Í•¹‘5•ÍÍ…”¡™É½´°ìÉ•…ÐèìÑ•áÐè€‹Šrˆ°­•äè´¹­•äôô¤ì(€ô…Ñ €¡”¤ì(€€€½¹Í½±”¹•ÉÉ½È ‰ÉÉ½ÈÍ•¹‘¥¹œ½¹Ñ…Ðèˆ°”¤ì(€€€…Ý…¥ÐÍ½¬¹Í•¹‘5•ÍÍ…”¡™É½´°ìÑ•áÐèƒŠv0½Õ±‘¸ÐÍ•¹½¹Ñ…Ðéq¸‘í”¹µ•ÍÍ…•õ€ô¤ì(€ô)ô¤ì(