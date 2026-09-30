const { cmd } = require('../command');

cmd({
    pattern: 'privacy',
    desc: 'Show privacy-related bot information',
    category: 'utility',
    react: '🔐',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    return reply('🔐 Privacy settings are managed by your WhatsApp account and bot configuration.');
});