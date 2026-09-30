const { cmd } = require("../command");

cmd({
  pattern: "repeat",
  alias: ["say"],
  desc: "Repeat the supplied text",
  category: "utility",
  filename: __filename
}, async (conn, mek, m, { reply, args }) => {
  if (!args.length) return reply("Use: .repeat your text");
  return reply(args.join(" "));
});