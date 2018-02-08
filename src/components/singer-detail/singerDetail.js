import Song from '@/common/js/song.js'
export default class SingerDetail {
  constructor(data) {
    this.id = data.singer_id;
    this.mid = data.singer_mid;
    this.name = data.singer_name;
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.mid}.jpg?max_age=2592000`;
    this.fans = (data.fans / 10000.0).toFixed(1);
    this.songCount = data.total;
    this.mvCount = data.mvTotal;
    this.albumCount = data.albumTotal;
    this.desc = data.SingerDesc;
    this.songList = songList(data.list);
  }
}

function songList(list) {
  let array = [];
  list.forEach(song => {
    array.push(new Song(song.musicData));
  })
  return array;
}
