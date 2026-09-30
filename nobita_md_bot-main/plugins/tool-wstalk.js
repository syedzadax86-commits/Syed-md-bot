const { cmd } = require('../command');

cmd({ pattern: 'wstalk', desc: 'Show WhatsApp status tool help', category: 'utility', react: '🔎', filename: __filename }, async (conn, mek, m, { reply }) => {
  return reply('🔎 WhatsApp status lookup is available through the configured bot service.');
});