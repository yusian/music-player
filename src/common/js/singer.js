export default class Singer {
  constructor(id, mid, name) {
    this.id = id;
    this.mid = mid;
    this.name = name;
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${mid}.jpg?max_age=2592000`;
  }
}

export function createSinger(listItem) {
  let id = listItem.Fsinger_id;
  let mid = listItem.Fsinger_mid;
  let name = listItem.Fsinger_name;
  return new Singer(id, mid, name);
}
