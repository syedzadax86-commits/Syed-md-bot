const { cmd } = require("../command");
const config = require('../config');

cmd({
  pattern: "compatibility",
  alias: ["friend", "fcheck"],
  desc: "Calculate the compatibility score between two users.",
  category: "fun",
  react: "💖",
  filename: __filename,
  use: "@tag1 @tag2",
}, async (conn, mek, m, { args, reply }) => {
  try {
    if (args.length < 2) return reply("Please mention two users to calculate compatibility.\nUsage: `.compatibility @user1 @user2`");
    let user1 = m.mentionedJid[0]; let user2 = m.mentionedJid[1];
    const specialNumber = config.DEV ? `${config.DEV}@s.whatsapp.net` : null;
    let compatibilityScore = Math.floor(Math.random() * 1000) + 1;
    if (user1 === specialNumber || user2 === specialNumber) {
      compatibilityScore = 1000;
      return reply(`💖 Compatibility between @${user1.split('@')[0]} and @${user2.split('@')[0]}: ${compatibilityScore}+/1000 💖`);
    }
    await conn.sendMessage(mek.chat, { text: `💖 Compatibility between @${user1.split('@')[0]} and @${user2.split('@')[0]}: ${compatibilityScore}/1000 💖`, mentions: [user1, user2] }, { quoted: mek });
  } catch (error) { console.log(error); reply(`❌ Error: ${error.message}`); }
});

cmd({
  pattern: "aura", desc: "Calculate aura score of a user.", category: "fun", react: "💀", filename: __filename, use: "@tag",
}, async (conn, mek, m, { args, reply }) => {
  try {
    if (args.length < 1) return reply("Please mention a user to calculate their aura.\nUsage: `.aura @user`");
    let user = m.mentionedJid[0]; const specialNumber = config.DEV ? `${config.DEV}@s.whatsapp.net` : null;
    let auraScore = Math.floor(Math.random() * 1000) + 1;
    if (user === specialNumber) { auraScore = 999999; return reply(`💀 Aura of @${user.split('@')[0]}: ${auraScore}+ 🗿`); }
    await conn.sendMessage(mek.chat, { text: `💀 Aura of @${user.split('@')[0]}: ${auraScore}/1000 🗿`, mentions: [user] }, { quoted: mek });
  } catch (error) { console.log(error); reply(`❌ Error: ${error.message}`); }
});

cmd({
  pattern: "roast", desc: "Roast someone in Hindi", category: "fun", react: "🔥", filename: __filename, use: "@tag"
}, async (conn, mek, m, { q, reply }) => {
  let roasts = [
    "Abe bhai, tera IQ wifi signal se bhi kam hai!","Bhai, teri soch WhatsApp status jaisi hai, 24 ghante baad gayab ho jaati hai!","Abe sochta kitna hai, tu kya NASA ka scientist hai?","Abe tu hai kaun? Google pe search karne se bhi tera naam nahi aata!","Tera dimaag 2G network pe chal raha hai kya?","Itna overthink mat kar bhai, teri battery jaldi down ho jayegi!","Teri soch cricket ke match jaisi hai, baarish aate hi band ho jati hai!","Tu VIP hai, 'Very Idiotic Person'!","Abe tu kis planet se aaya hai, yeh duniya tere jaise aliens ke liye nahi hai!","Tere dimag mein khojne ka itna kuch hai, lekin koi result nahi milta!","Teri zindagi WhatsApp status jaisi hai, kabhi bhi delete ho sakti hai!","Tera dimaag 2G network pe chal raha hai kya?","Abe tu toh wahi hai jo apni zindagi ka plot twist bhi Google karta hai!","Abe tu toh software update bhi nahi chalne wala, pura hang hai!","Tere sochne se zyada toh Google search karne mein time waste ho jaata hai!","Teri personality toh dead battery jaisi hai, recharge karne ka time aa gaya hai!","Bhai, teri soch ke liye ek dedicated server hona chahiye!","Abe tu na ek walking meme ban gaya hai!","Tere mooh se nikla har lafz ek naya bug hai!","Abe tu apne dimaag ko low power mode mein daalke chalta hai!","Tere paas ideas hain, par sab outdated hain jaise Windows XP!","Teri soch toh ek system error ki tarah hai, restart karna padega!","Abe tu toh '404 not found' ka living example hai!","Tera dimaag bhi phone ki battery jaise hai, kabhi bhi drain ho jaata hai!","Abe tu jise apni soch samajhta hai, wo ek 'buffering' hai!","Teri baatein utni hi value rakhti hain, jitni 90s ke mobile phones mein camera quality thi!","Abe bhai, tu toh har waqt 'under construction' rehta hai!","Tere saath toh life ka 'unknown error' hota hai, koi solution nahi milta!","Teri har baat pe lagta hai, system crash hone waala hai!","Tere paas idea hai, par wo abhi bhi 'under review' hai!"
  ];
  let randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
  let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
  if (!mentionedUser) return reply("Usage: .roast @user (Tag someone to roast them!)");
  let target = `@${mentionedUser.split("@")[0]}`;
  await conn.sendMessage(mek.chat, { text: `${target} :\n *${randomRoast}*\n> This is all for fun, don't take it seriously!`, mentions: [mek.sender, mentionedUser] }, { quoted: mek });
});

cmd({
  pattern: "8ball", desc: "Magic 8-Ball gives answers", category: "fun", react: "🎱", filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  if (!q) return reply("Ask a yes/no question! Example: .8ball Will I be rich?");
  let responses = ["Yes!", "No.", "Maybe...", "Definitely!", "Not sure.", "Ask again later.", "I don't think so.", "Absolutely!", "No way!", "Looks promising!"];
  reply(`🎱 *Magic 8-Ball says:* ${responses[Math.floor(Math.random() * responses.length)]}`);
});

cmd({
  pattern: "compliment", desc: "Give a nice compliment", category: "fun", react: "😊", filename: __filename, use: "@tag (optional)"
}, async (conn, mek, m, { reply }) => {
  let compliments = ["You're amazing just the way you are! 💖","You light up every room you walk into! 🌟","Your smile is contagious! 😊","You're a genius in your own way! 🧠","You bring happiness to everyone around you! 🥰","You're like a human sunshine! ☀️","Your kindness makes the world a better place! ❤️","You're unique and irreplaceable! ✨","You're a great listener and a wonderful friend! 🤗","Your positive vibes are truly inspiring! 💫","You're stronger than you think! 💪","Your creativity is beyond amazing! 🎨","You make life more fun and interesting! 🎉","Your energy is uplifting to everyone around you! 🔥","You're a true leader, even if you don’t realize it! 🏆","Your words have the power to make people smile! 😊","You're so talented, and the world needs your skills! 🎭","You're a walking masterpiece of awesomeness! 🎨","You're proof that kindness still exists in the world! 💕","You make even the hardest days feel a little brighter! ☀️"];
  let randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
  let sender = `@${mek.sender.split("@")[0]}`;
  let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
  let target = mentionedUser ? `@${mentionedUser.split("@")[0]}` : "";
  let message = mentionedUser ? `${sender} complimented ${target}:\n😊 *${randomCompliment}*` : `${sender}, you forgot to tag someone! But hey, here's a compliment for you:\n😊 *${randomCompliment}*`;
  await conn.sendMessage(mek.chat, { text: message, mentions: [mek.sender, mentionedUser].filter(Boolean) }, { quoted: mek });
});