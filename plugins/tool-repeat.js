const { cmd } = require("../command");

cmd({
  pattern: "repeat",
  alias: ["say"],
  desc: "Repeat the supplied text",
  category: "utility",
  use: ".repeat <text>",
  react: "🔁",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  if (!args || !args.length) return reply("❌ Please provide some text.");
  await reply(args.join(" "));
});