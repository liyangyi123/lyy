const env = import.meta.env.MODE || 'production'; // 环墫变量

const EnvConfig = {
    development: {
        baseApi:"/api",
        mockApi: 'https://apifoxmock.com/m1/4068509-0-default/api'
    },
    test:{
        baseApi:"//test.future.com/api",
        mockApi: 'https://apifoxmock.com/m1/4068509-0-default/api/home/getTable'
    },
    production:{
        baseApi:"//future.com/api",
        mockApi: 'https://apifoxmock.com/m1/4068509-0-default/api/home/getTable'
    }
};

// 如果在开发环境运行，import.meta.env.MODE 值为 'development'，导出 EnvConfig.development
// 如果在生产环境运行，import.meta.env.MODE 值为 'production'，导出 EnvConfig.production
// 这种模式允许你根据不同环境使用不同的 API 地址、功能标志等，而无需手动更改代码或使用条件语句。这是前端应用中管理环境配置的常见最佳实践。
export default {
    ...EnvConfig[env],
    mock:false
};




