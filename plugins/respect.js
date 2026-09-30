const { cmd } = require('../command');

cmd({
  pattern: 'respect',
  alias: ['r'],
  desc: 'Send a respectful message',
  category: 'fun',
  react: '🙏',
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  return reply('🙏 Respect everyone, stay kind, and keep helping each other.');
});