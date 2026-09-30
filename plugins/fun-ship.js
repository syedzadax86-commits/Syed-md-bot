const { cmd } = require("../command");

cmd({
  pattern: "ship",
  alias: ["love", "match"],
  desc: "Generate a fun compatibility result",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { reply, args }) => {
  if (!args.length) return reply("Use: .ship name1 + name2");
  const names = args.join(" ").split("+").map(x => x.trim()).filter(Boolean);
  if (names.length < 2) return reply("Use: .ship name1 + name2");
  const score = Math.floor(Math.random() * 101);
  return reply("💞 " + names[0] + " + " + names[1] + "\nCompatibility: " + score + "%");
});