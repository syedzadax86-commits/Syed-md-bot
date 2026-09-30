const axios = require('axios');
const { cmd } = require('../command');

cmd({
  pattern: "weather",
  desc: "🌤 Get weather information for a location",
  react: "🌤",
  category: "utility",
  use: '.weather <city>',
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    if (!args[0]) return reply("❌ Please provide a city name\nExample: .weather London");
    const city = args.join(' ');
    const apiUrl = `https://apis.davidcyriltech.my.id/weather?city=${encodeURIComponent(city)}`;
    let data;
    try { ({ data } = await axios.get(apiUrl, { timeout: 20000 })); }
    catch (_) {
      const fb = await axios.get(`https://api.siputzx.my.id/api/tools/weather?city=${encodeURIComponent(city)}`, { timeout: 20000 });
      data = fb.data;
      if (data?.status && data?.data && !data.success) data = { success: true, data: data.data };
    }
    if (!data.success) return reply("❌ Couldn't fetch weather data for that location");
    const d = data.data;
    return reply(`🌤 *Weather for ${d.location}, ${d.country}*\n\n🌡 Temperature: ${d.temperature}\n💭 Feels Like: ${d.feels_like}\n☁ Weather: ${d.weather} (${d.description})\n\n💧 Humidity: ${d.humidity}\n💨 Wind Speed: ${d.wind_speed}\n📊 Pressure: ${d.pressure}\n\n📍 Coordinates: ${d.coordinates.latitude}, ${d.coordinates.longitude}`);
  } catch (error) {
    console.error('Weather Error:', error);
    return reply("❌ Failed to fetch weather data. Please try again later.");
  }
});