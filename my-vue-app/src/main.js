import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import "@/assets/less/reset.less"
import '@/assets/less/index.less'
import { createPinia } from 'pinia' 
import api from "@/api/api.js"
import "@/api/mock.js"//这里引入mock.js文件，就可以拦截请求了，这样做的好处是不用启动后端服务，直接在前端模拟数据，等到后端接口好了，再删掉这个文件即可
const app = createApp(App)
app.config.globalProperties.$api = api//这里是将api挂载到vue的原型上，这样在组件中就可以通过this.$api来调用api中的方法了

app.use(router)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(createPinia())
app.mount('#app')
