const { cmd } = require("../command");
const axios = require("axios");

const BASE_URL = "https://syed-zada-x-niazi-md.vercel.app";

cmd({
  pattern: "status",
  alias: ["serverstatus", "stats", "servers"],
  desc: "Check server status",
  category: "owner",
  react: "📊",
  filename: __filename
}, async (conn, mek, m, { reply, react }) => {
  try {
    if (react) await react("⏳");
    const res = await axios.get(BASE_URL + "/api/servers", { timeout: 10000 });
    const servers = res.data && res.data.servers;
    if (!Array.isArray(servers)) return reply("❌ Failed to fetch server list.");
    const lines = servers.map(s =>
      "• " + (s.name || s.serverId || s.id || "Unknown") +
      ": " + String(s.status || "OFFLINE")
    );
    if (react) await react("✅");
    return reply("📊 *SERVER STATUS*\n\n" + lines.join("\n"));
  } catch (e) {
    if (react) await react("❌");
    return reply("❌ Server status error: " + e.message);
  }
});