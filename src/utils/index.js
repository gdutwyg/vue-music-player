class Utils {
  formatPlayList(list) {
    if (!list.length) return []
    return list.map(item => {
      const singer = this.formatSinger(item.ar)
      return {
        id: item.id,
        name: item.name,
        singer: singer,
        album: item.al.name,
        image: item.al.picUrl,
        duration: item.dt / 1000,
        url: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`
      }
    })
  }
  formatSinger(ar) {
    if (!ar.length) return '佚名'
    return ar.map(item => item.name).join('/')
  }
}
export default new Utils()
