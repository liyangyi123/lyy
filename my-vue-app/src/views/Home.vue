<script setup>
import { ref,getCurrentInstance,onMounted,reactive } from 'vue'
import * as echarts from 'echarts'
import axios from 'axios'
import { ta } from 'element-plus/es/locale/index.mjs'
const getImageUrl = (name) => {
  
  return new URL(`../assets/images/${name}.png`, import.meta.url).href
}

const {proxy} = getCurrentInstance()
// 这行代码是用于获取 Vue 实例的内部代理对象，让你可以在 <script setup> 中访问全局属性和方法。
// 访问在 main.js 中通过 app.config.globalProperties 添加的全局属性
// 例如你的代码中：app.config.globalProperties.$api = api
// const result = proxy.$api.someMethod()

const getTableData = async () => {
  const data = await proxy.$api.getTableData()
  tableData.value = data.tableData

  // console.log(data)
}

const getCountData = async () => {
  const data = await proxy.$api.getCountData()
  countData.value = data.countData
  // console.log(data)
  
}
const getChartData = async () => {
  const data = await proxy.$api.getChartData()
  const {orderData,videoData,userData} = data
  // const {orderData} = data
  // console.log(orderData)

  
  //对第一个图表进行x轴和series数据的处理
  xOptions.xAxis.data = orderData.date
  xOptions.series = Object.keys(orderData.data[0]).map(val=>{
    return {
      name: val,
      type: 'line',
      data: orderData.data.map(item=>item[val])
    }
  })
  const oneEchart = echarts.init(proxy.$refs['echart'])
  oneEchart.setOption(xOptions)

  //对第二个图表进行x轴和series数据的处理
  xOptions.xAxis.data = userData.map(item=>item.date)
  xOptions.series = [
    {
      name: '新增用户',
      type: 'bar',
      data: userData.map(item=>item.new)
    },
    {
      name: '活跃用户',
      type: 'bar',
      data: userData.map(item=>item.active)
    }
  ]
  const twoEchart = echarts.init(proxy.$refs['userEchart'])
  twoEchart.setOption(xOptions)

  //对第三个图表进行x轴和series数据的处理
  xOptions.xAxis.data = videoData.map(item=>item.name)
  xOptions.series = [
    {
      type: 'pie',
      data: videoData
    }
  ]
  const threeEchart = echarts.init(proxy.$refs['videoEchart'])
  threeEchart.setOption(xOptions)

  //监听页面的变化
    //ResizeObserver监听元素的变化，当元素的尺寸发生变化时，会触发回调函数
  observer.value = new ResizeObserver((en)=>{
    oneEchart.resize()
    twoEchart.resize()
    threeEchart.resize()
  })

  //容器存在
  if(proxy.$refs['echart']){
    observer.value.observe(proxy.$refs['echart'])
    observer.value.observe(proxy.$refs['userEchart'])
    observer.value.observe(proxy.$refs['videoEchart'])
  }
  



  
} 
//折线图和柱状图，两个图表公共的配置
// 柱状图配置项
const xOptions = reactive({
  textStyle: {
    color: "#333",
  },
  legend: {},
  grid: {
    left: "20%",
  },
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category", // 类目轴
    data: [], // x轴数据
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
    axisLabel: {
      interval: 0,
      color: "#333",
    },
  },
  yAxis: {
    type: "value",
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
  },
  color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
  series: [], // 数据系列
});


// ref 用于创建一个响应式的数据对象。当你使用 ref 定义一个变量时，Vue 会自动追踪这个变量的变化，并在它发生变化时更新相关的视图。
//用ref模拟生成一些购买课程的数据，包括课程名称，今日购买量，月购买量，总共购买量
const tableData = ref([
  {
    name: 'Vue 3 入门',
    todaySales: 100,
    monthSales: 1000,
    totalSales: 10000,
  },
  {
    name: 'React 入门',
    todaySales: 200,
    monthSales: 2000, 
    totalSales: 20000,
  },
  {
    name: 'Angular 入门',
    todaySales: 300,
    monthSales: 3000, 
    totalSales: 30000,
  },
])

//用ref模拟生成一些购买课程的数据，包括课程名称，今日购买量，月购买量，总共购买量
const tableLable = ref([
  {
    name: '课程名称',
    todaySales: '今日购买量',
    monthSales: '月购买量',
    totalSales: '总共购买量',
  },
])


const countData = ref([
  
])
const chartData = ref([
  
])
const observer = ref(null)

// 饼图配置项
const pieOptions = reactive({
  tooltip: {
    trigger: "item",
  },
  legend: {},
  color: [
    "#0f7864",
    "#add36b",
    "#94c2e5",
    "#4a6a64",
    "#e1bb22",
    "#396362",
    "#3ed1cf",
  ],
  series: [], // 数据系列
});

onMounted(()=>{
  getTableData()
  getCountData()
  getChartData()

})
// axios.get("/api/home/getTableData").then(res=>{console.log(res)
//   if(res.data.code === 200){
//     tableData.value = res.data.data.tableData
//   }
//   }
// )










</script>

<template>
  <div>
    <el-row class="home" :gutter="20">
      <el-col :span="8" style="margin-top: 20px">
        <el-card shadow="hover">
          <div class="user">
            <img :src="getImageUrl('user')" class="user"/>
            
            <div class="userinfo">
              <p class="name">张三</p>
              <p class="access">管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间：<span>2024-07-01</span></p>
            <p>上次登录地点：<span>北京</span></p>
          </div>
        </el-card>

        <el-card shadow="hover">
          <div class="user-table">
            <el-table :data="tableData">
              <el-table-column v-for="(value,key) in tableLable[0]" :key="key" :label="value" :prop="key"></el-table-column>
              
            </el-table>
                
          </div>
        </el-card>
      </el-col>
      <el-col :span="16" style="margin-top: 20px">
          <div class="number">
            <el-card shadow="hover" :body-style="{display:'flex',padding:0}" v-for="(item,index) in countData" :key="item.name">
            <component :is="item.icon" class="icons" :style="{background:item.color}"></component>
            
            <div class="detial">
              <p class="num">￥{{item.value}}</p>
              <p class="txt">{{item.name}}</p>
            </div>
            
          </el-card>
        </div>
        <el-card class="top-echart">
          <div ref="echart" style="height:280px"></div>
        </el-card>
          
        <div class="graph">
            <el-card>
              <div ref="userEchart" style="height:240px"></div>
            </el-card>
            <el-card>
              <div ref="videoEchart" style="height:240px"></div>
            </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>



<style scoped lang="less">
.home {
  .user {
    display: flex;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-right: 20px;
      border: 2px solid #ddd;
    }
    
    .userinfo {
      .name {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 5px;
        color: #333;
      }
      .access {
        color: #777;
        font-size: 16px;
      }
    }

    .login-info {
      margin-left: auto;
      p {
        font-size: 14px;
        color: #555;
        line-height: 1.5;
        margin: 5px 0;
        
        span {
          color: #222;
          margin-left: 5px;
        }
      }
    }
  }

  .user-table {
    margin-top: 30px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .number{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card{
      width: 32%;
      margin-bottom: 20px;
    }
    .icons{
      width: 80px;
      height: 80px;
      border-radius: 50%;
      font-size: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .detial{
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .num{
      font-size: 20px;
      font-weight: 700;
      color: #333;
    }
    .txt{
      font-size: 16px;
      color: #777;
    }
    
    
  }
  .graph{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card{
      width: 48%;
      height:260px;
    }
  }
}
</style>