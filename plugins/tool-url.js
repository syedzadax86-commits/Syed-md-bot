const { cmd } = require('../command');

cmd({
    pattern: 'url',
    desc: 'Show the URL command help',
    category: 'utility',
    react: '🔗',
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    return reply('🔗 URL tool is available through the configured bot services.');
});