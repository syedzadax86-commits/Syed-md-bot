const googleTTS = require('google-tts-api');
const { cmd } = require('../command');

cmd({
  pattern: "tts",
  desc: "Convert text to speech",
  category: "download",
  react: "💀",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply("Need some text.");
    const url = googleTTS.getAudioUrl(q, {
      lang: 'hi-IN',
      slow: false,
      host: 'https://translate.google.com'
    });
    return conn.sendMessage(from, {
      audio: { url },
      mimetype: 'audio/mpeg',
      ptt: false
    }, { quoted: mek });
  } catch (e) {
    return reply(String(e));
  }
});