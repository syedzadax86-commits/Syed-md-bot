const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "ringtone",
  alias: ["ringtones", "ring"],
  desc: "Get a ringtone from the API",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const query = args.join(" ");
    if (!query) return reply("Please provide a search query.");
    const { data } = await axios.get("https://www.dark-yasiya-api.site/download/ringtone?text=" + encodeURIComponent(query));
    if (!data.status || !data.result?.length) return reply("No ringtones found.");
    const r = data.result[Math.floor(Math.random() * data.result.length)];
    return conn.sendMessage(from, { audio: { url: r.dl_link }, mimetype: "audio/mpeg", fileName: (r.title || "ringtone") + ".mp3" }, { quoted: m });
  } catch (e) {
    return reply("Sorry, something went wrong.");
  }
});