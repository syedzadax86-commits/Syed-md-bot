const { cmd } = require('../command');

cmd({
  pattern: 'sounds',
  alias: ['sound'],
  desc: 'Show sound command help',
  category: 'fun',
  react: '🔊',
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  return reply('🔊 Sound commands are available through the configured bot.');
});