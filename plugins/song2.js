const { cmd } = require("../command");
const yts = require("yt-search");

cmd({
  pattern: "song2",
  alias: ["yt2"],
  desc: "Search for a song",
  category: "search",
  filename: __filename
}, async (conn, mek, m, { from, text, reply }) => {
  if (!text) return reply("Please provide a song name.");
  try {
    const r = await yts(text);
    if (!r.videos?.length) return reply("Song not found.");
    const v = r.videos[0];
    return reply("Title: " + v.title + "\nDuration: " + (v.timestamp || "N/A") + "\nLink: " + v.url);
  } catch (e) {
    console.error(e);
    return reply("Song search failed.");
  }
});