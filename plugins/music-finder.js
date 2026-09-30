const { cmd } = require('../command');

cmd({ pattern: 'music', alias: ['songinfo'], desc: 'Search music information', category: 'utility', react: '🎵', filename: __filename }, async (conn, mek, m, { reply, q }) => {
  if (!q) return reply('❌ Please provide a song name.');
  return reply(`🎵 Music search: ${q}\n\nUse the configured music service to find this song.`);
});