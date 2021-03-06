import axios from 'axios'

// 创建一个错误
function errorCreate(msg) {
    const err = new Error(msg)
    errorLog(err)
    throw err
}

// 记录和显示错误
function errorLog(err) {
    // 打印到控制台
    if (process.env.NODE_ENV === 'development') {
        console.error('>>>>>> Error >>>>>>')
        console.log(err)
    }
    this.$message({
        type: 'error',
        message: err.message,
        duration: 3000
    })
}

// 创建一个 axios 实例
const service = axios.create({
    baseURL:process.env.NODE_ENV === 'development'? '/api':process.env.VUE_APP_API,
    withCredentials:true,
    timeout: 10000 // 请求超时时间
})
// axios.defaults.withCredentials = true;//允许跨域携带cookie信息


// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // 在请求发送之前做一些处理
        // console.log(config)
        // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        if (config.method === 'get') {
            config.params = {...config.params, timestamp: new Date().getTime()}
        } else if (config.method === 'post') {
            config.data = {...config.data, timestamp: new Date().getTime()}
        }
        return config
    },
    (error) => {
        // 发送失败
        // console.log(error)
        Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        // console.log(response, 'response')
        // dataAxios 是 axios 返回数据中的 data
        const dataAxios = response.data
        // console.log(dataAxios)
        // 这个状态码是和后端约定的
        const {code} = dataAxios
        // 根据 code 进行判断

        if (code === undefined) {
            // 如果没有 code 代表这不是项目后端开发的接口
            return dataAxios
        } else {
            // 有 code 代表这是一个后端接口 可以进行进一步的判断
            switch (code) {
                case 200:
                    // [ 示例 ] code === 0 代表没有错误
                    return dataAxios
                case 800:
                    // [ 示例 ] code === 0 代表没有错误
                    return dataAxios
                case 801:
                    // [ 示例 ] code === 0 代表没有错误
                    return dataAxios
                case 802:
                    // [ 示例 ] code === 0 代表没有错误
                    return dataAxios
                case 803:
                    // [ 示例 ] code === 0 代表没有错误
                    return dataAxios
                case 'xxx':
                    // [ 示例 ] 其它和后台约定的 code
                    errorCreate(`[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`)
                    break
                default:

                    break
            }
        }
    },
    (error) => {
        if (error && error.response) {
            if (error.response.data.code) {
                error.message = error.response.data.msg
            } else {
                error.message = '系统繁忙，请稍后再试'
            }

            switch (error.response.status) {
                case 400:
                    error.message = '请求错误'
                    break
                case 401:
                    error.message = '未授权，请登录'
                    break
                case 403:
                    process.env.NODE_ENV === 'production' &&
                    (location.href = window.location.origin)
                    error.message = '拒绝访问'
                    break
                case 404:
                    error.message = `请求地址出错: ${error.response.config.url}`
                    break
                case 408:
                    error.message = '请求超时'
                    break
                case 500:
                    error.message = '服务器内部错误'
                    break
                case 501:
                    error.message = '服务未实现'
                    break
                case 502:
                    error.message = '网关错误'
                    break
                case 503:
                    error.message = '服务不可用'
                    break
                case 504:
                    error.message = '网关超时'
                    break
                case 505:
                    error.message = 'HTTP版本不受支持'
                    break
                default:
                    break
            }
        }
        errorLog(error)
        return Promise.reject(error)
    }
)

export default service
