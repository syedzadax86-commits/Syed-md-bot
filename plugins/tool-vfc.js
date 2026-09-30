const { cmd } = require('../command');

cmd({
  pattern: 'vfc',
  desc: 'Show bot version information',
  category: 'utility',
  react: 'ℹ️',
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  return reply('🤖 Syed MD Bot — utility module is active.');
});