const { cmd } = require("../command");
const axios = require("axios");

cmd({
  pattern: "upscale",
  alias: ["hd"],
  desc: "Upscale a replied image",
  category: "tools",
  react: "🔼",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    const q = mek.quoted || m;
    const mime = (q.msg || q).mimetype || "";
    if (!/image/.test(mime)) return reply("📸 Please reply to an image");
    const buffer = await q.download();
    const FormData = require("form-data");
    const fs = require("fs");
    const os = require("os");
    const path = require("path");
    const file = path.join(os.tmpdir(), "image_" + Date.now() + ".jpg");
    fs.writeFileSync(file, buffer);
    const form = new FormData();
    form.append("fileToUpload", fs.createReadStream(file), "image.jpg");
    form.append("reqtype", "fileupload");
    const upload = await axios.post("https://catbox.moe/user/api.php", form, {headers: form.getHeaders()});
    fs.unlinkSync(file);
    const url = encodeURIComponent(upload.data);
    const res = await axios.get("https://api.nexray.web.id/tools/upscale?url=" + url + "&resolusi=1", {responseType:"arraybuffer"});
    return conn.sendMessage(from, {image: Buffer.from(res.data), caption:"✅ Image upscaled"}, {quoted: mek});
  } catch (e) {
    return reply("❌ Error: " + e.message);
  }
});