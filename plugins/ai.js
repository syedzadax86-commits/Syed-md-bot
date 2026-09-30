const { cmd } = require("../command");
const axios = require("axios");

cmd({
    pattern: "ai",
    alias: ["ask"],
    desc: "Ask AI a question",
    category: "ai",
    react: "🤖",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    if (!q) return reply("Please ask a question.");
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