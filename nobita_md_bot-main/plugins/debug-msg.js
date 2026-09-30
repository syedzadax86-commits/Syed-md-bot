const { cmd } = require("../command");

cmd({
  pattern: "debug",
  alias: ["debugmsg"],
  desc: "Show basic message information",
  category: "utility",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  return reply("Message debug: received successfully.");
});