import axios from "axios";
import { ElMessage } from "element-plus";
import config from "../config";
// 可以给自定义的 axios 实例添加拦截器。
const serivice = axios.create(
    {
        baseURL:config.baseApi,
 
    }
);



// 添加请求拦截器
serivice.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
serivice.interceptors.response.use(
    (res)=>{    
        // 对响应数据做点什么
        const {code,data,msg} = res.data;
        if(code === 200){
            return data;
        }else{
            ElMessage.error(msg || "请求失败");
            return Promise.reject(msg);
        }
    },

);
// request 函数作用：

// 设置默认请求方法（如果没有指定）
// 将参数传递给配置好的 axios 实例
function request(options){
    options.method = options.method || "get";
    //对get请求的参数进行处理
    if(options.method.toLowerCase() === "get"){
        options.params = options.data;//get请求参数放在params中
    }
    //对mock的开关进行判断
    let isMock = config.mock;
    if(typeof options.mock !== "undefined"){
        isMock = options.mock;
    }   
    //针对环境做一个处理
    if(config.env === "production"){
        serivice.defaults.baseURL = config.baseApi;
    }else{
        serivice.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
    }
    return serivice(options);
}

export default request;

// // 使用配置对象
// serivice({
//     url: '/api/data',
//     method: 'get',
//     params: { id: 123 }
//   })

//   // 使用实例方法
// serivice.get('/api/data', { params: { id: 123 } })
// serivice.post('/api/data', { name: 'value' })

// // 使用别名方法
// axios.get('/api/data')
// axios.post('/api/data', { name: 'value' })

// 理解要点
// 所有方式本质相同：无论使用哪种方式，最终都转化为一个带有完整配置的请求
// 选择灵活性：使用配置对象方式最灵活，可以处理所有情况
// 抽象层次：你的 request 函数是对 axios 的进一步抽象，简化了使用