import Singer from './singer.js'
export default class Song {
  constructor(musicData) {
    this.id = musicData.songid;
    this.mid = musicData.songmid;
    this.name = musicData.songname;
    this.singers = singers(musicData.singer);
    this.singer = singer(musicData.singer);
    this.albumid = musicData.albumid;
    this.albummid = musicData.albummid;
    this.albumname = musicData.albumname;
    this.filename = `C400${musicData.songmid}.m4a`;
    this.interval = musicData.interval;
    this.albumImage = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`
    this.url = `http://thirdparty.gtimg.com/C100${musicData.songmid}.m4a?fromtag=38`;
  }
}

export function createSong(musicData) {
  return new Song(musicData);
}

function singers(musicDataSinger) {
  let array = [];
  musicDataSinger.forEach(singer => {
    array.push(new Singer(singer.id, singer.mid, singer.name));
  })
  return array;
}

function singer(musicDataSinger) {
  let array = [];
  musicDataSinger.forEach(singer => {
    array.push(singer.name);
  })
  return array.join('/');
}
