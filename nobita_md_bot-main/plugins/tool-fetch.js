const { cmd } = require('../command');

cmd({
  pattern: 'fetch',
  desc: 'Show fetch utility help',
  category: 'utility',
  react: '🔎',
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  return reply('🔎 Fetch utility is ready. Provide a supported resource URL.');
});