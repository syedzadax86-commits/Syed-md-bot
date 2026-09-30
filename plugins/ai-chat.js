const { cmd } = require("../command");
const axios = require("axios");

cmd({
    pattern: "aichat",
    alias: ["chat"],
    desc: "Chat with AI",
    category: "ai",
    react: "🤖",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    if (!q) return reply("Please provide a message.");
    try {
        const { data } = await axios.get(`https://api.nekorinn.my.id/ai/gpt?text=${encodeURIComponent(q)}`);
        const answer = data?.result || data?.answer || data?.response;
        if (!answer) return reply("No response received.");
        await reply(answer);
    } catch (e) {
        console.error(e);
        await reply("AI service is unavailable right now.");
    }
});