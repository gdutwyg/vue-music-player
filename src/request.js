import axios from 'axios'
import Vue from 'vue'
class Request {
  sendReq(url, params) {
    return axios
      .get(url, {
        params
      })
      .then(res => {
        if (res.status === 200) return res.data
        else return {}
      })
      .catch(error => {
        // Vue.prototype.$message({
        //   showClose: true,
        //   message: `请求失败, 请查看报错信息${error}`,
        //   type: 'error'
        // })
        return error.response.data
      })
  }
}
export default new Request()
