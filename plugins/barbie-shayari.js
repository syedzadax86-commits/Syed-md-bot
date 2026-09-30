const { cmd } = require('../command');

cmd({
    pattern: 'barbieshayari',
    alias: ['barbie'],
    desc: 'Send a random shayari',
    category: 'fun',
    react: '💖',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    const lines = [
        '✨ Keep smiling and keep shining.',
        '🌸 Every day brings a new beginning.',
        '💫 Stay positive and spread kindness.'
    ];
    return reply(lines[Math.floor(Math.random() * lines.length)]);
});