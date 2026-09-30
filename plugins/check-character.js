const axios = require("axios");
const { sleep } = require('../lib/functions');
const { cmd, commands } = require("../command");

cmd({
    pattern: "character",
    alias: ["char"],
    desc: "Check the character of a mentioned user.",
    react: "🔥",
    category: "fun",
    filename: __filename,
}, 
async (conn, mek, m, { from, isGroup, text, reply }) => {
    try {
        if (!isGroup) return reply("This command can only be used in groups.");
        const mentionedUser = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!mentionedUser) return reply("Please mention a user whose character you want to check.");

        const userChar = ["Sigma","Generous","Grumpy","Overconfident","Obedient","Good","Simp","Kind","Patient","Pervert","Cool","Helpful","Brilliant","Sexy","Hot","Gorgeous","Cute"];
        const userCharacterSelection = userChar[Math.floor(Math.random() * userChar.length)];
        const message = `Character of @${mentionedUser.split("@")[0]} is *${userCharacterSelection}* 🔥⚡`;

        await conn.sendMessage(from, { text: message, mentions: [mentionedUser] }, { quoted: m });
    } catch (e) {
        console.error("Error in character command:", e);
        reply("An error occurred while processing the command. Please try again.");
    }
});