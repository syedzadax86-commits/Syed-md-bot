const { cmd } = require('../command');
const { Sticker, StickerTypes } = require('wa-sticker-formatter');

cmd({
  pattern: 'sticker',
  alias: ['s'],
  desc: 'Create a sticker from a replied image',
  category: 'tools',
  react: '⚡',
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  try {
    if (!mek.quoted) return reply('Reply to an image.');
    if (mek.quoted.mtype !== 'imageMessage') return reply('Please reply to an image.');
    const media = await mek.quoted.download();
    const sticker = new Sticker(media, {
      pack: 'Syed MD',
      author: 'Niazi MD',
      type: StickerTypes.FULL,
      quality: 75
    });
    return conn.sendMessage(mek.chat, { sticker: await sticker.toBuffer() }, { quoted: mek });
  } catch (e) {
    return reply('❌ Failed to create sticker.');
  }
});