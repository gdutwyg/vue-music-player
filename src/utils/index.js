class Utils {
  formatPlayList (list) {
    if (!list.length) return []
    return list.map(item => {
      const singer = this.formatSinger(item.ar)
      const duration = item.dt / 1000
      return {
        id: item.id,
        name: item.name,
        singer: singer,
        album: item.al.name,
        picUrl: `${item.al.picUrl}?param=300y300`,
        duration: duration,
        musicTime: this.formatMusicTime(duration),
        url: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`
      }
    })
  }
  formatSinger (ar) {
    if (!ar.length) return '佚名'
    return ar.map(item => item.name).join('/')
  }
  formatMusicTime (duration) {
    let ss = parseInt(duration) // 秒
    let mm = 0 // 分
    let hh = 0 // 小时
    if (ss > 60) {
      mm = parseInt(ss / 60)
      ss = parseInt(ss % 60)
    }
    if (mm > 60) {
      hh = parseInt(mm / 60)
      mm = parseInt(mm % 60)
    }
    let result = ('00' + parseInt(ss)).slice(-2)
    if (mm > 0) {
      result = ('00' + parseInt(mm)).slice(-2) + ':' + result
    } else {
      result = '00:' + result
    }
    if (hh > 0) {
      result = ('00' + parseInt(hh)).slice(-2) + ':' + result
    }
    return result
  }
}
export default new Utils()
