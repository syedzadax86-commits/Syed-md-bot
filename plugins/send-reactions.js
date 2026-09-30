const { cmd } = require('../command');

cmd({
  pattern: 'react',
  alias: ['reaction'],
  desc: 'Send a reaction to the quoted message',
  category: 'fun',
  react: '👍',
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  if (!mek.quoted) return reply('❌ Reply to a message first.');
  return conn.sendMessage(mek.chat, { react: { text: '👍', key: mek.quoted.key } });
});