import axios from 'axios'
import Vue from 'vue'
import router from './router'
class Request {
  sendReq (url) {
    return axios
      .get(url)
      .then(res => {
        if (res.status === 200) return res.data
        else return {}
      })
      .catch(error => {
        Vue.prototype.$message({
          showClose: true,
          message: `请求失败, 请查看报错信息${error}`,
          type: 'error'
        })
        return {}
      })
  }
}
export default new Request()
