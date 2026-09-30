const { cmd } = require("../command");
const yts = require("yt-search");

cmd({
  pattern: "yts",
  alias: ["ytsearch"],
  desc: "Search YouTube videos",
  category: "search",
  filename: __filename
}, async (conn, mek, m, { from, text, reply }) => {
  if (!text) return reply("Please provide a search query.");
  try {
    const r = await yts(text);
    if (!r.videos?.length) return reply("No results found.");
    const out = r.videos.slice(0, 10).map((v,i) =>
      (i + 1) + ". " + v.title + "\n" + v.url + "\n" + (v.timestamp || "N/A")
    ).join("\n\n");
    return reply(out);
  } catch (e) {
    console.error(e);
    return reply("YouTube search failed.");
  }
});