const { cmd } = require('../command');

cmd({
  pattern: 'iqc',
  desc: 'Show a quick IQ challenge',
  category: 'fun',
  react: '🧠',
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  return reply('🧠 Quick challenge: What comes next? 2, 4, 8, 16, ?');
});