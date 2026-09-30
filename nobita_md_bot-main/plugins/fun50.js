const { cmd } = require('../command');

cmd({
    pattern: 'fun50',
    desc: 'Send a random fun message',
    category: 'fun',
    react: '😂',
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    const messages = ['😂 Keep smiling!', '😎 Have a great day!', '✨ Stay awesome!'];
    return reply(messages[Math.floor(Math.random() * messages.length)]);
});