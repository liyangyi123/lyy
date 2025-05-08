<template>
  <div class="header">
    <div class="l-content">
      <el-button @click="toggleCollapse">
        <el-icon><component class="icons" is="menu"></component></el-icon>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="current" :to="{ path: current.path }">{{current.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
              <img :src="getImageUrl('user')" class="user" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLoginOut">退出 </el-dropdown-item>
    
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </div>
  </div>
</template>

<script setup>
import { useAllDataStore } from '@/stores/index'
import { computed } from 'vue'
import {useRouter} from 'vue-router'
const store = useAllDataStore()
const router = useRouter()
const toggleCollapse = () => {
  store.toggleCollapse()
}


const getImageUrl = (user) => {
  return new URL(`../assets/images/${user}.png`, import.meta.url).href
  //import.meta.url是当前文件的路径，URL是一个构造函数，用于生成URL对象，两个参数，第一个是路径，第二个是基础路径
}

const handleLoginOut = ()=>{
  store.clean()
  router.push('/login')

} 

const current = computed(() => 
  store.state.currentMenu
  // console.log(store.state.currentMenu)
)


</script>


<!-- <style scoped>
.header {
  display: flex;
  height: 60px;
 
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 20px;
  align-items: center;
  justify-content: space-between;
}

.l-content {
  display: flex;
  align-items: center;
}

.l-content .el-button {
  margin-right: 20px;
}

.icons {
  font-size: 20px;
}

.bread {
  margin-left: 20px;
}

.r-content {
  display: flex;
  align-items: center;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.el-icon--right {
  margin-left: 4px;
}

.el-dropdown-menu {
  padding: 5px 0;
}

.el-dropdown-item {
  padding: 8px 20px;
  font-size: 14px;
  color: #606266;
}

.el-dropdown-item:hover {
  background-color: #f5f7fa;
  color: #409eff;
}
</style> -->

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #333;
}
.icons{
    width: 20px;
    height: 20px;
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}

:deep(.bread span) {
  color: #fff !important;
  cursor: pointer !important;
}
</style>