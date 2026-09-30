const { cmd } = require("../command");
const fetch = require("node-fetch");
const axios = require("axios");

cmd({
    pattern: "tiny",
    alias: ['short', 'shorturl'],
    react: "🫧",
    desc: "Makes URL tiny.",
    category: "tools",
    use: "<url>",
    filename: __filename,
},
async (conn, mek, m, { from, quoted, isOwner, isAdmins, reply, args }) => {
    console.log("Command tiny triggered");

    if (!args[0]) {
        console.log("No URL provided");
        return reply("*🏷️ ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴍᴇ ᴀ ʟɪɴᴋ.*");
    }

    try {
        const link = args[0];
        console.log("URL to shorten:", link);
        const response = await axios.get(`https://tinyurl.com/api-create.php?url=${link}`);
        const shortenedUrl = response.data;

        console.log("Shortened URL:", shortenedUrl);
        return reply(`*🛡️YOUR SHORTENED URL*\n\n${shortenedUrl}`);
    } catch (e) {
        console.error("Error shortening URL:", e);
        return reply("An error occurred while shortening the URL. Please try again.");
    }
});