const { cmd } = require("../command");

cmd({
  pattern: "audioinfo",
  alias: ["ainfo"],
  desc: "Show information about a quoted audio message",
  category: "utility",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  if (!mek.quoted || mek.quoted.mtype !== "audioMessage") return reply("❌ Reply to an audio message first.");
  return reply("🎵 Audio message detected.");
});