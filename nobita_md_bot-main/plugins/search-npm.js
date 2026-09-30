const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "npm",
  desc: "Search for a package on npm.",
  react: '📦',
  category: "tools",
  filename: __filename,
  use: ".npm <package-name>"
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    if (!args.length) {
      return reply("Please provide the name of the npm package you want to search for. Example: .npm express");
    }
    const packageName = args.join(" ");
    const response = await axios.get(`https://registry.npmjs.org/${encodeURIComponent(packageName)}`);
    if (response.status !== 200) throw new Error("Package not found or an error occurred.");
    const packageData = response.data;
    const latestVersion = packageData["dist-tags"].latest;
    const description = packageData.description || "No description available.";
    const npmUrl = `https://www.npmjs.com/package/${packageName}`;
    const license = packageData.license || "Unknown";
    const repository = packageData.repository ? packageData.repository.url : "Not available";
    const message = `
*Syed zada X niazi 𝐌𝐃 NPM SEARCH*

*🔰 NPM PACKAGE:* ${packageName}
*📄 DESCRIPTION:* ${description}
*⏸️ LAST VERSION:* ${latestVersion}
*🪪 LICENSE:* ${license}
*🪩 REPOSITORY:* ${repository}
*🔗 NPM URL:* ${npmUrl}
`;
    await conn.sendMessage(from, { text: message }, { quoted: mek });
  } catch (error) {
    console.error("Error:", error);
    reply("An error occurred: " + error.message);
  }
});