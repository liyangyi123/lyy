<template>
    <div class="tags">
        <el-tag
            v-for="(tag,index) in tags"
            :key="tag.name"
            :closable="tag.name !== 'home'"
            :effect="route.name === tag.name  ? 'dark' : 'light'"
            @click="handleMenu(tag)"
            @close="handleClose(tag,index)"
            
        >
        {{ tag.label }}
        </el-tag>
    </div>
</template>

<script setup>

import { effect, ref } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { useAllDataStore } from '@/stores/index'
// const tags = ref([
//     {
//         path: '/home',
//         name: 'home',
//         label: '首页',
//         icon:'home'   
//     }
// ])
const store = useAllDataStore()

const tags = store.state.tags
// console.log(tags)
const route = useRoute()
const router = useRouter()
const handleMenu = (tag) => {
    
    router.push(tag.name)
    // console.log(tag)
    // store.selectMenu(tag) //感觉这里不要这个判断也行
}
//
const handleClose = (tag,index) => {
    // 通过pinia管理的，这里先从tags数组中删除了一个元素
    store.updateTags(tag)
    //如果点击的关闭的tag不是对应的当前页面

    if(tag.name !== route.name) return
    if(index === store.state.tags.length){
        router.push(store.state.tags[index-1].name)
    }else{
        router.push(store.state.tags[index].name)
    }

}
</script>


<style lang="less" scoped>
.tags {
    margin: 20px 0 0 20px;
}
.el-tag {
    margin-right: 10px;
}
</style>


