const { cmd } = require('../command');

// ===== ALWAYS ONLINE =====
cmd({
    on: "body"
}, async (conn, mek, m, { from, isGroup, userConfig }) => {
    try {
        const config = userConfig || {};
        if (config.ALWAYS_ONLINE === "true") {
            await conn.sendPresenceUpdate('available', from).catch(() => {});
        } else if (config.ALWAYS_ONLINE === "false") {
            await conn.sendPresenceUpdate('unavailable', from).catch(() => {});
        }
    } catch (e) {}
});

// ===== AUTO TYPING =====
cmd({
    on: "body"
}, async (conn, mek, m, { from, isGroup, userConfig }) => {
    try {
        const config = userConfig || {};
        if (config.AUTO_TYPING === 'true') {
            await conn.sendPresenceUpdate('composing', from).catch(() => {});
        } else if (config.AUTO_TYPING === 'inbox') {
            if (!isGroup) await conn.sendPresenceUpdate('composing', from).catch(() => {});
        } else if (config.AUTO_TYPING === 'group') {
            if (isGroup) await conn.sendPresenceUpdate('composing', from).catch(() => {});
        }
    } catch (e) {}
});

// ===== AUTO RECORDING =====
cmd({
    on: "body"
}, async (conn, mek, m, { from, isGroup, userConfig }) => {
    try {
        const config = userConfig || {};
        if (config.AUTO_RECORDING === 'true') {
            await conn.sendPresenceUpdate('recording', from).catch(() => {});
        } else if (config.AUTO_RECORDING === 'inbox') {
            if (!isGroup) await conn.sendPresenceUpdate('recording', from).catch(() => {});
        } else if (config.AUTO_RECORDING === 'group') {
            if (isGroup) await conn.sendPresenceUpdate('recording', from).catch(() => {});
        }
    } catch (e) {}
});