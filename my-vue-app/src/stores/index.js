import { defineStore } from 'pinia'
import { ref,reactive, computed,watch } from 'vue'
import router from '../router'
export const useAllDataStore = defineStore('allData', () => {
    //ref相当于state
    const state = reactive({
        isCollapse : false,
        tags :[
          {
              path: '/home',
              name: 'home',
              label: '首页',
              icon:'home'   
          }
        ],
        currentMenu:null,
        menuList:[],
        token:"",
        routerList:[]
      })
      watch(state,(newObj)=>{
        if(!newObj.token) return
      localStorage.setItem("store",JSON.stringify(newObj))
      },
      {
        deep:true
      }
    )

    const toggleCollapse = () => {
        state.isCollapse = !state.isCollapse
    }

    const selectMenu = (val)=>{
      if(val.name === 'home'){
        state.currentMenu = null
      }else{
        state.currentMenu = val
        //判断当前点击的菜单是否在tags中
        //如果在tags中，则不添加
        let index = state.tags.findIndex((item) => item.name === val.name)
        if (index === -1) {
          state.tags.push(val) // 如果不存在，则添加
        }
      }
    }

    const updateTags = (tag)=>{
      let index = state.tags.findIndex((item) => item.name === tag.name)
      state.tags.splice(index,1)
    }

    const updateMenuList = (val)=>{
      console.log(val)
      state.menuList = val;
    }

    const addMenu = (router,type)=>{
          if(type==="refresh"){
            console.log("刷新页面")
            //这里是刷新页面，把路由从localStorage中取出来  
            if(JSON.parse(localStorage.getItem("store"))){
              const savedState = JSON.parse(localStorage.getItem("store"))
              Object.assign(state, savedState) // 使用 Object.assign 合并状态

              console.log(state)
              state.routerList=[];
            }else{
              return;  
            }
          }
          const menu=state.menuList
          console.log(menu)
                      //这里**代表0或多个文件夹，*代表文件。就是把views下的文件全部导入
          const module =import.meta.glob('../views/**/*.vue')
          //这个是菜单格式化后的路由数组
          const routeArr=[]
          //格式化菜单路由
          menu.forEach(item => {
                 //如果菜单有children
              if(item.children){
                      //把children遍历格式化
                  item.children.forEach(val => {
                      let url=`../views/${val.url}.vue`
                              //这里通过url取出对应的组件
                      val.component=module[url]
                  })
             //需要注意的是我们只需要为item.children中的菜单添加路由，所以我们把它解构出来
                  routeArr.push(...item.children)
              }else{
                let url=`../views/${item.url}.vue`
                item.component=module[url]
                routeArr.push(item)
              }
          })
          //遍历routeArr
          state.routerList = []
          // console.log(router.getRoutes())
          //每次添加路由之前，先把之前的路由删除
          let routers = router.getRoutes()
          routers.forEach(item=>{
            if(item.name==="main" || item.name==="login" || item.name==="404"){
              return
            }else{
              router.removeRoute(item.name)
            }
          })
          console.log(router.getRoutes())
          //根据用户自己的菜单生成的路由
          routeArr.forEach(item=>{
              //addRoute方法会返回一个函数，执行这个函数会把这个路由删除
              //这里我们把每一次router.addRoute添加路由的返回值收集起来，放到state中的routeList
              //addRoute第一个参数要添加子路由的路由name，第二个是一个路由记录
            state.routerList.push(router.addRoute("main",item))  
          })
          console.log(router.getRoutes())
          
        

      }

      const clean = () => {
        // 删除动态路由
        state.routerList.forEach(item => {
          if (item) item(); // 调用路由删除函数
        });
      
        // 清空状态
        state.isCollapse = false;
        state.routerList = [];
        state.token = "";
        state.menuList = [];
        state.currentMenu = null;
        state.tags = [
          {
            path: '/home',
            name: 'home',
            label: '首页',
            icon: 'home',
          },
        ];
      
        // 清除 localStorage
        localStorage.removeItem("store");
      
        // 跳转到登录页
        router.push('/login');
      };
  
    return {state,selectMenu,toggleCollapse,updateTags,updateMenuList,addMenu,clean}
  })

    