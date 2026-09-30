const { cmd } = require('../command');

cmd({ on: 'body' }, async (conn, mek, m, { from }) => {
  try {
    if (m.message?.viewOnceMessage || m.message?.viewOnceMessageV2) {
      await conn.sendMessage(from, { text: '⚠️ View-once media detected.' }, { quoted: mek });
    }
  } catch (e) {}
});