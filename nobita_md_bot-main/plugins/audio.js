const { cmd } = require('../command');

cmd({
    pattern: "goodmorning",
    desc: "Good morning wishes for groups",
    category: "general",
    react: "🌅",
    filename: __filename,
    use: ".goodmorning"
}, async (conn, mek, m, { reply }) => {
    const quotes = [
        "Nayi subah, naya din, nayi umang! Muskurate rahiye. 🌅",
        "Har subah ek naya safar hai, hausla rakho toh sab behtar hai. 🛤️",
        "Aaj ka din aapki mehnat aur kamyabi ka naam ho! 🚀",
        "Muskurahat aapki pehchan hai, ise kabhi khone na dein. 😊",
        "Good Morning! Aaj ka din khushiyon se bhara ho. 🌸",
        "Har din ek nayi seekh le kar aata hai. 📚"
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    return await conn.sendMessage(m.chat, { text: `🌅 *Good morning* 🌅\n\n✨ ${randomQuote}` }, { quoted: mek });
});

cmd({
    pattern: "goodnight",
    desc: "Good night wishes for groups",
    category: "general",
    react: "🌙",
    filename: __filename,
    use: ".goodnight"
}, async (conn, mek, m, { reply }) => {
    const quotes = [
        "Raat ki khamoshi mein sukoon dhoondhein. Shubhratri! 🌙",
        "Kal phir naye jazbe ke saath milenge. Good Night! ✨",
        "Aaram karo aur kal ke liye fresh ho jao. 💤",
        "Raat ka sukoon aapke liye best ho. 🌙",
        "Good Night! Stay blessed. 🌟"
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    return await conn.sendMessage(m.chat, { text: `🌙 *Good night* 🌙\n\n✨ ${randomQuote}` }, { quoted: mek });
});