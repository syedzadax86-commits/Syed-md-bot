const { cmd } = require('../command');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

cmd({
    pattern: "saveweb",
    alias: ["websave", "web", "sitezip", "savewebzip"],
    desc: "Save any website as a downloadable ZIP file",
    category: "tools",
    react: "🌐",
    filename: __filename
}, async (conn, mek, m, { from, reply, text }) => {
    try {
        if (!text) return reply('❌ Please provide a URL\n\n*Example:* .saveweb https://google.com');

        const siteUrl = encodeURIComponent(text.trim());
        const api = `https://api.hanggts.xyz/tools/saveweb2zip?url=${siteUrl}`;

        const { data } = await axios.get(api);
        if (!data.status || !data.result?.downloadUrl) {
            return reply('❌ Failed to generate ZIP. Please check the URL and try again.');
        }

        const downloadUrl = data.result.downloadUrl;
        const fileName = `JawasTechXD-Plus.zip`;
        const filePath = path.join(__dirname, '..', 'temp', fileName);

        if (!fs.existsSync(path.dirname(filePath))) {
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
        }

        const file = await axios.get(downloadUrl, { responseType: 'arraybuffer' });
        fs.writeFileSync(filePath, file.data);

        await conn.sendMessage(from, {
            document: fs.readFileSync(filePath),
            fileName: fileName,
            mimetype: 'application/zip',
            caption: `✅ WEB *Downloaded Successfully*`
        }, { quoted: mek });

        fs.unlinkSync(filePath);

    } catch (error) {
        console.error('SaveWeb Error:', error);
        reply('❌ Failed to save website. Error: ' + error.message);
    }
});