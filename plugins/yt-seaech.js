const { cmd } = require("../command");
const yts = require("yt-search");

cmd({
  pattern: "yts",
  alias: ["ytsearch"],
  use: ".yts song",
  desc: "Search YouTube",
  category: "search",
  filename: __filename
}, async (conn, mek, m, { reply, q }) => {
  try {
    if (!q) return reply("Please give me words to search");
    const results = (await yts(q)).all.slice(0, 10);
    if (!results.length) return reply("No results found.");
    const text = results.map((v, i) => (i + 1) + ". " + v.title + "\n🔗 " + v.url).join("\n\n");
    return reply(text);
  } catch (e) {
    return reply("Error while searching YouTube.");
  }
});