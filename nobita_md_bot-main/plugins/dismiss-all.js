const { cmd } = require("../command");

cmd({
  pattern: "dismiss",
  alias: ["dismissall"],
  desc: "Dismiss all pending group join requests",
  category: "group",
  filename: __filename
}, async (conn, mek, m, { reply, isAdmins }) => {
  if (!isAdmins) return reply("❌ Admins only.");
  try {
    const requests = await conn.groupRequestParticipantsList(m.chat);
    if (!requests?.length) return reply("ℹ️ No pending requests.");
    for (const user of requests) {
      const jid = user.jid || user.id;
      if (jid) await conn.groupRequestParticipantsUpdate(m.chat, [jid], "reject");
    }
    return reply("✅ Pending requests dismissed.");
  } catch (e) {
    return reply("❌ Failed: " + e.message);
  }
});