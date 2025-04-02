<template>
    <el-aside :width="width">
      <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :default-active="activeMenu"> >
       
        <h3 v-show="!isCollapse" class="system-title">通用后台管理系统</h3>
        <h3 v-show="isCollapse" class="system-title">后台</h3>
        
        <!-- 没有子菜单的项目 -->
        <el-menu-item v-for="item in noChildrenMenu" :index="item.path" :key="item.path" @click="handleMenu(item)"> >
              <el-icon><component :is="item.icon" /></el-icon>
              <span>{{item.label}}</span>
        </el-menu-item>
  
        <!-- 有子菜单的项目 -->
        <el-sub-menu v-for="item in hasChildrenMenu" :index="item.path" :key="item.path" >
          <template #title>
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{item.label}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="subItem in item.children" :index="subItem.path" :key="subItem.path " @click="handleMenu(subItem)">
              {{subItem.label}}
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-aside>
  </template>
  
<script setup>
  import { Location, Document, Menu as IconMenu, Setting, HomeFilled, User, Tickets } from '@element-plus/icons-vue'
  import { useAllDataStore } from '@/stores/index'    
  import { ref, computed } from 'vue'
  import {useRouter,useRoute} from 'vue-router'

  const store = useAllDataStore()
  const isCollapse = computed(() => store.state.isCollapse)
  // console.log(isCollapse)
  const width = computed(() => isCollapse.value ? '64px' : '180px')

//   菜单数据
  const menuData = [
      	{
          path: '/home',
          name: 'home',
          label: '首页',
          icon: 'house',
          url: 'Home'
      	},
        {
            path: '/mall',
            name: 'mall',
            label: '商品管理',
            icon: 'video-play',
            url: 'Mall'
        },
        {
            path: '/user',
            name: 'user',
            label: '用户管理',
            icon: 'user',
            url: 'User'
        },
        {
            path: 'other',
            label: '其他',
            icon: 'location',
            children: [
                {
                    path: '/page1',
                    name: 'page1',
                    label: '页面1',
                    icon: 'setting',
                    url: 'Page1'
                },
                {
                    path: '/page2',
                    name: 'page2',
                    label: '页面2',
                    icon: 'setting',
                    url: 'Page2'
                }
            ]
        }
]

  // 没有子菜单的数据
  const noChildrenMenu = computed(() => {
    return menuData.filter(item => !item.children || item.children.length === 0)
  })

  // 有子菜单的数据
  const hasChildrenMenu = computed(() => {
    return menuData.filter(item => item.children && item.children.length > 0)
  })

  const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
  }

  const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
  }
  //通过 const router = useRouter() 获取的路由实例正是 main.js 中通过 app.use(router) 注册的那个路由实例。
    // app.use(router) 会将路由实例安装到 Vue 应用中
    // 这使得路由实例在内部成为应用的一部分
    // useRouter() 函数能够访问当前 Vue 应用的上下文，并从中获取已注册的路由实例
    
  const router = useRouter()
  const route = useRoute()
  // const activeMenu = computed(() => route.path)
  const handleMenu = (item) => {
    router.push(item.path)
    store.selectMenu(item)
    
  }
  </script>
  


  <style scoped>
  .el-menu-vertical-demo {
    height: 100vh;
    border-right: none;
  }
  
  .system-title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    text-align: center;
    padding: 16px 0;
    margin-bottom: 10px;
  }
  
  .el-menu-item, .el-sub-menu {
    text-align: left;
  }
  
  .el-icon {
    margin-right: 5px;
    vertical-align: middle;
  }
  </style>