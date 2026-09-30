const { cmd } = require('../command');
const yts = require('yt-search');
const axios = require('axios');

const HEADERS = {
  timeout: 60000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*'
  }
};

async function videoDownload(url) {
  const apis = [
    async()=>{const d=(await axios.get('https://api.siputzx.my.id/api/d/ytmp4?url='+encodeURIComponent(url),HEADERS)).data;const x=d?.data||d?.result||d;const u=x?.dl||x?.download||x?.download_url||x?.url||x?.video_url;return u?{url:u,title:x?.title}:null;},
    async()=>{const d=(await axios.get('https://eliteprotech-apis.zone.id/ytdown?url='+encodeURIComponent(url)+'&format=mp4',HEADERS)).data;return d?.success&&d?.downloadURL?{url:d.downloadURL,title:d.title}:null;},
    async()=>{const d=(await axios.get('https://api.yupra.my.id/api/downloader/ytmp4?url='+encodeURIComponent(url),HEADERS)).data;return d?.success&&d?.data?.download_url?{url:d.data.download_url,title:d.data.title}:null;},
    async()=>{const d=(await axios.get('https://okatsu-rolezapiiz.vercel.app/downloader/ytmp4?url='+encodeURIComponent(url),HEADERS)).data;return d?.result?.mp4?{url:d.result.mp4,title:d.result.title}:null;}
  ];
  let last;
  for(const api of apis){try{const r=await api();if(r?.url)return r;throw new Error('No video URL');}catch(e){last=e;}}
  throw last||new Error('No video API available');
}

cmd({
  pattern:'drama',
  alias:['ep','episode'],
  desc:'Download YouTube videos as document',
  category:'download',
  react:'📺',
  filename:__filename
},async(conn,mek,m,{from,q,reply})=>{
  try{
    if(!q)return reply('🎥 Please provide a YouTube video name or URL!');
    let videoInfo,url;
    if(/^https?:\/\//i.test(q)){
      if(!/(youtube\.com|youtu\.be)/i.test(q))return reply('❌ Please provide a valid YouTube URL!');
      url=q;
      const id=(q.match(/(?:v=|youtu\.be\/|shorts\/)([\w-]{11})/)||[])[1];
      videoInfo=id?await yts({videoId:id}):null;
    }else{
      const s=await yts(q);
      if(!s.videos?.length)return reply('❌ No video results found!');
      videoInfo=s.videos[0]; url=videoInfo.url;
    }
    const data=await videoDownload(url);
    await conn.sendMessage(from,{document:{url:data.url},fileName:(data.title||videoInfo?.title||'video')+'.mp4',mimetype:'video/mp4',caption:'🎬 *'+(data.title||videoInfo?.title||'Video')+'*\n\n> Powered by Syed zada X niazi 𝐌𝐃'},{quoted:mek});
    await conn.sendMessage(from,{react:{text:'✅',key:m.key}});
  }catch(e){
    console.error('DRAMA:',e);
    await conn.sendMessage(from,{react:{text:'❌',key:m.key}});
    return reply('❌ Video download failed. All backup sources were tried.\n\n> Powered by Syed zada X niazi 𝐌𝐃');
  }
});