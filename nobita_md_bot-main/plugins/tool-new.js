const { cmd } = require("../command");

cmd({
  pattern: "new",
  alias: ["newcmd"],
  desc: "Simple utility command",
  category: "utility",
  react: "✨",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  await reply("✨ Command is working.");
});