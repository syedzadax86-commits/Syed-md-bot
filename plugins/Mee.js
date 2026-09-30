const { cmd } = require("../command");

cmd({
    pattern: "mee",
    alias: ["me"],
    desc: "Check bot response",
    category: "fun",
    react: "👀",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    await reply("Mee 👀");
});