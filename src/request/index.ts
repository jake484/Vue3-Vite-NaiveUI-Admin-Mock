import axios from "axios";

//创建axios实例
const service = axios.create({
    baseURL: "https://www.fastmock.site/mock/c1520107474435ccf66bdaa7781568a8/api",
    timeout: 5000,
    headers: {
        "Content-type": "application/json;charset=utf-8"
    }
})

//请求拦截
service.interceptors.request.use((config) => {
    config.headers = config.headers || {}
    if (localStorage.getItem("token")) {
        config.headers.token = localStorage.getItem("token") || ""
    }
    return config
})

//响应拦截
service.interceptors.response.use(({ data }) => {
    const code: number = data.data.code
    if (code != 200) {
        return Promise.reject(data)
    }
    return data
}, (err) => {
    console.log(err)
})

export default service