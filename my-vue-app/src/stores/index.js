import { defineStore } from 'pinia'
import { ref,reactive, computed } from 'vue'
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
        currentMenu:null
      })

    const toggleCollapse = () => {
        state.isCollapse = !state.isCollapse
    }

    const selectMenu = (val)=>{
      if(val.name === 'home'){
        state.currentMenu = null
      }else{
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
  
    return {state,selectMenu,toggleCollapse,updateTags}
  })

    