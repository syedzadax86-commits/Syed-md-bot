const { cmd } = require("../command");

cmd({
  pattern: "flirt",
  alias: ["flirtfun"],
  desc: "Send a fun flirty line",
  category: "fun",
  react: "😉",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  const lines = [
    "Aap ki smile kaafi achi hai 😄",
    "Aaj ka mood thora funny hai 😜",
    "Aap se baat karna fun lagta hai ✨",
    "Keep smiling! 😊"
  ];
  await reply(lines[Math.floor(Math.random() * lines.length)]);
});