import Singer from './singer.js'
export default class Song {
  constructor(musicData) {
    this.id = musicData.songid;
    this.mid = musicData.songmid;
    this.name = musicData.songname;
    this.singers = singers(musicData.singer);
    this.singer = singer(musicData.singer);
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
