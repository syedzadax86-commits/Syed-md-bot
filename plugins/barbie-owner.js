const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "ownerinfo",
    alias: ["botowner", "owner-details"],
    desc: "Bot owner and official channel information",
    category: "main",
    react: "👑",
    filename: __filename
}, async (conn, mek, m, { reply, userConfig }) => {
    const ownerName = userConfig?.OWNER_NAME || config.OWNER_NAME;
    const ownerNumber = userConfig?.OWNER_NUMBER || config.OWNER_NUMBER;
    const botName = userConfig?.BOT_NAME || config.BOT_NAME;
    const channelName = userConfig?.CHANNEL_NAME || config.CHANNEL_NAME;
    const mainChannel = userConfig?.MAIN_CHANNEL_URL || config.MAIN_CHANNEL_URL;

    const message = `╭━━━〔 👑 OWNER INFO 〕━━━┈⊷
┃
┃ 🤖 *Bot:* ${botName}
┃ 👤 *Owner:* ${ownerName}
┃ 📱 *Number:* +${ownerNumber}
┃ 📢 *Channel:* ${channelName}
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━┈⊷

📢 *Official WhatsApp Channel:*
${mainChannel}

> *Powered by ${botName}*`;

    return reply(message);
});