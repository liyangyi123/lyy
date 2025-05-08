<template>
    <div class="body-login">
        <el-form :model="loginForm" class="login-container">
            <h1>欢迎登录</h1>
            <el-form-item>
                <el-input type="input" v-model="loginForm.username" placeholder="请输入用户名"></el-input>   
            </el-form-item>
            <el-form-item>
                <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin" >登录</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script setup>

import { ref,reactive,getCurrentInstance } from 'vue'
import {useAllDataStore} from '@/stores'
import {useRouter} from 'vue-router'
const {proxy} = getCurrentInstance()
//当调用 useAllDataStore() 时，它会返回一个包含状态和方法的 store 实例：
const store = useAllDataStore()
const router = useRouter()
const loginForm = reactive({
    username: '',
    password: ''
})
const handleLogin = async () => {
    //登陆的时候需要发送请求得到用户的权限菜单
    const res = await proxy.$api.getMenu(loginForm)
    // console.log(res)
    //拿到菜单以后 在哪里显示呢？
    store.updateMenuList(res.menuList)
    // console.log(store.state.menuList)
    store.state.token = res.token
    //整一个动态路由
    store.addMenu(router)
    // store.addMenu(router)
    // console.log(router.getRoutes())
    router.push('/home')

    
}

</script>

<style lang="less" scoped>
.body-login{
    width: 100%;
    height: 100%;
    background-image: url('../assets/images/background.png');
    background-size: 100%;
    overflow: hidden;
}
.login-container{
    width: 400px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 15px;
    padding: 35px 35px 15px 35px;
    box-shadow: 0 0 25px #cacaca;
    margin: 250px auto;  
    h1{
        text-align: center;
        font-size: 20px;
        color: #505450;
        margin-bottom: 20px;
    }
    :deep(.el-form-item__content){
      
        justify-content: center;
    }
}
</style>