const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "weather",
    alias: ["w", "forecast"],
    desc: "Get current weather information",
    category: "utility",
    react: "🌤️",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    if (!q) return reply('❌ Please provide a city name. Example: .weather Berlin');
    try {
        const url = `https://wttr.in/${encodeURIComponent(q)}?format=j1`;
        const { data } = await axios.get(url, { timeout: 15000 });
        const current = data.current_condition?.[0];
        const area = data.nearest_area?.[0];
        if (!current) return reply('❌ Weather data not found.');
        const place = area?.areaName?.[0]?.value || q;
        const country = area?.country?.[0]?.value || '';
        const text = `🌤️ *Weather*\n\n📍 *Location:* ${place}${country ? `, ${country}` : ''}\n🌡️ *Temperature:* ${current.temp_C}°C\n🤒 *Feels like:* ${current.FeelsLikeC}°C\n💧 *Humidity:* ${current.humidity}%\n💨 *Wind:* ${current.windspeedKmph} km/h\n☁️ *Condition:* ${current.weatherDesc?.[0]?.value || 'N/A'}`;
        await conn.sendMessage(from, { text }, { quoted: mek });
    } catch (e) { console.error(e); reply('❌ Could not fetch weather right now.'); }
});