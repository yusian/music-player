export default class Singer {
  constructor(id, mid, name) {
    this.id = id;
    this.mid = mid;
    this.name = name;
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${mid}.jpg?max_age=2592000`;
  }
  zhida(data) {
    this.id = data.singerid;
    this.name = data.singername;
    this.mid = data.singermid;
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${data.singermid}.jpg?max_age=2592000`;
    this.albumnum = data.albumnum || 0;
    this.songnum = data.songnum || 0;
  }
}

export function createSinger(listItem) {
  let id = listItem.Fsinger_id;
  let mid = listItem.Fsinger_mid;
  let name = listItem.Fsinger_name;
  return new Singer(id, mid, name);
}
