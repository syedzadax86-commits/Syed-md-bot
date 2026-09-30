const { cmd } = require("../command");
const config = require("../config");

cmd({
  pattern: "settings",
  alias: ["config"],
  desc: "Show basic bot settings",
  category: "owner",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  return reply(
    "BOT SETTINGS\n\n" +
    "Prefix: " + (config.PREFIX || ".") + "\n" +
    "Mode: " + (config.MODE || "public") + "\n" +
    "Owner: " + (config.OWNER_NAME || "Configured owner")
  );
});