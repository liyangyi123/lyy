//整个项目的api的统一管理

import { mock } from "mockjs";
import request from "./requests";
import { fa } from "element-plus/es/locale/index.mjs";

//请求首页的左侧表格数据

function getTableData(){
    return request({
        // https://apifoxmock.com/m1/4068509-0-default/api/home/getTable 网页mock数据
        // url:"/api/home/getTableData",
        url:"/home/getTableData",//去掉了/api
        method:"get",
        mock:false //这里可以设置mock的开关，如果设置为true，就会走mock.js文件中的数据，如果设置为false，就会走后端接口
    })
}

function getCountData(){
    return request({
        // https://apifoxmock.com/m1/4068509-0-default/api/home/getTable 网页mock数据
        // url:"/api/home/getTableData",
        url:"/home/getCountData",//去掉了/api
        method:"get",
        mock:false //这里可以设置mock的开关，如果设置为true，就会走mock.js文件中的数据，如果设置为false，就会走后端接口
    })
}

function getChartData(){
    return request({
        // https://apifoxmock.com/m1/4068509-0-default/api/home/getTable 网页mock数据
        // url:"/api/home/getTableData",
        url:"/home/getChartData",//去掉了/api
        method:"get",
        mock:false //这里可以设置mock的开关，如果设置为true，就会走mock.js文件中的数据，如果设置为false，就会走后端接口
    })
}
function getUserData(data){
    console.log(data)
    return request({
        // https://apifoxmock.com/m1/4068509-0-default/api/home/getTable 网页mock数据
        // url:"/api/home/getTableData",
        url:"/user/getUserData",//去掉了/api
        method:"get",
        mock:false, //这里可以设置mock的开关，如果设置为true，就会走mock.js文件中的数据，如果设置为false，就会走后端接口
        data
    })
}
function deleteUser(data){
    console.log(data)
    return request({
        // https://apifoxmock.com/m1/4068509-0-default/api/home/getTable 网页mock数据
        // url:"/api/home/getTableData",
        url:"/user/deleteUser",//去掉了/api
        method:"get",
        mock:false, //这里可以设置mock的开关，如果设置为true，就会走mock.js文件中的数据，如果设置为false，就会走后端接口
        data
    })
}
function addUser(data){
    console.log(data)
    return request({
        // https://apifoxmock.com/m1/4068509-0-default/api/home/getTable 网页mock数据
        // url:"/api/home/getTableData",
        url:"/user/addUser",//去掉了/api
        method:"post",
        mock:false, //这里可以设置mock的开关，如果设置为true，就会走mock.js文件中的数据，如果设置为false，就会走后端接口
        data
    })
}
function editUser(data){
    console.log(data)
    return request({
        // https://apifoxmock.com/m1/4068509-0-default/api/home/getTable 网页mock数据
        // url:"/api/home/getTableData",
        url:"/user/editUser",//去掉了/api
        method:"post",
        mock:false, //这里可以设置mock的开关，如果设置为true，就会走mock.js文件中的数据，如果设置为false，就会走后端接口
        data
    })
}
function getMenu(params) {
    return request({
      url: '/permission/getMenu',
      method: 'post',
      data: params
    })
}


// 将所有API函数作为一个对象默认导出
export default {
    getTableData,
    getCountData,
    getChartData,
    getUserData,
    deleteUser,
    addUser,
    editUser,
    getMenu
}

// axios.get("/api/home/getTableData").then(res=>{console.log(res)
//   if(res.data.code === 200){
//     tableData.value = res.data.data.tableData
//   }
//   }
// )