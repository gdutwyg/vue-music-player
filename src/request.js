import axios from 'axios'
// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    config.baseURL = 'https://api.mtnhao.com'
    config.url = config.url.replace('/api', '')
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
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
        return error.response.data
      })
  }
}
export default new Request()
