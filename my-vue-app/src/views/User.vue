<template>
  <div class="user-header">
      <el-button type="primary" @click="handleAdd">添加用户</el-button>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="请输入">
          <el-input placeholder="请输入用户名" v-model="formInline.keyWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </el-form-item>
      </el-form>
  </div>
  <div class="table">
    <el-table :data="tableData" style="width: 100%">
    <el-table-column v-for="item in tableLabel" :key=item.prop 
    :width="item.width ? item.width : 125" :prop="item.prop" :label="item.label"/>
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #="scope">
        <el-button type="primary" size="small" @click="handleEdit(scope.row)">
          编辑
        </el-button>
        <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination class = "pager" background layout="prev, pager, next" size="small" @current-change = "handleChange"  :total="config.total" />
  </div>

  <el-dialog
  v-model="dialogVisible"
  :title="action === 'add' ? '新增用户' : '编辑用户'"
  width="35%"
  :before-close="handleClose"
>
  <!-- 表单内容 -->
   <!-- 需要注意的是设置了:inline="true" 会对el-select的样式造成影响，我们通过给他设置一个select-clear在css进行处理-->
  <el-form :inline="false" :model="formUser" :rules="rules" ref="userForm" class="select-clear" >
    <!-- 第一行 -->
    <el-row>
      <el-col :span="12">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formUser.name" placeholder="请输入姓名" ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="formUser.age" placeholder="请输入年龄" ></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 第二行 -->
    <el-row>
      <el-col :span="12">
        <el-form-item label="性别" prop="sex" class="select-clear">
          <el-select v-model="formUser.sex" placeholder="请选择性别">
            <el-option label="男" :value="1" />
            <el-option label="女" :value="0" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="formUser.birth"
            type="date"
            placeholder="请选择日期"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 第三行 -->
    <el-row>
      <el-form-item label="地址" prop="addr">
        <el-input
          v-model="formUser.addr"
          placeholder="请输入地址"
        ></el-input>
      </el-form-item>
    </el-row>

    <!-- 按钮操作 -->
    <el-row style="justify-content: flex-end">
      <el-form-item>
        <el-button type="primary" @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-row>
  </el-form>
</el-dialog>

</template>

<script setup>
import { ref,getCurrentInstance,onMounted,reactive,nextTick } from 'vue'
import { ElMessage,ElMessageBox } from 'element-plus'
const formInline = reactive({
  keyWord: ''
})
const config = {
  name: '',
  total:0,
  page: 1,

}
const tableLabel =reactive([
    {
      prop: 'name',
      label: '姓名',
    },
    {
      prop: 'age',
      label: '年龄',
    },
    {
      prop: 'sexLabel',
      label: '性别',
    },
    {
      prop: 'birth',
      label: '出生日期',
      width: 180,
    },
    {
      prop: 'addr',
      label: '地址',
      width: 400,
    },
    

])
const tableData = ref([])


const getUserData = async() => {
  let data = await proxy.$api.getUserData(config)
  console.log(data)
  tableData.value = data.list.map(item=>({//在箭头函数中，如果要直接返回一个对象字面量，必须用小括号 () 包裹对象
    ...item,
    sexLabel : item.sex === 1 ? '男' : '女'

  }))
  config.total = data.count

}
const { proxy } = getCurrentInstance()
const handleClick = () => {
  console.log('click')
}
const handleSearch = () => {
  config.name = formInline.keyWord
  getUserData()
}
const handleChange = (val) => {
  config.page = val
  getUserData()
}
const handleDelete = (row) => {
  ElMessageBox.confirm('此操作将永久删除该用户, 是否继续?').then(async() => {
    await proxy.$api.deleteUser({id:row.id})
    ElMessage({
      type: 'success',
      message: '删除成功!',
      showClose: true
    })
    getUserData()
  })
  
}
//用action来判断是新增还是编辑
const action = ref('add')
//用dialogVisible来控制弹窗的显示与隐藏
const dialogVisible = ref(false)
const formUser = ref({
  sex: 1
})
const rules = reactive({
      name: [
        { required: true, message: '姓名必须填写', trigger: 'blur' }
      ],
      age: [
        { required: true, message: '年龄必须填写', trigger: 'blur' },
        { type: 'number', message: '年龄必须是数字' }
      ],
      sex: [
        { required: true, message: '性别必须选择', trigger: 'change' }
      ],
      birth: [
        { required: true, message: '出生日期必须选择', trigger: 'change' }
      ],
      addr: [
        { required: true, message: '地址必须填写' }
      ]
})
const handleClose = (done) => {
  //关闭弹窗时清空表单，不然下次打开还是上次的数据
  dialogVisible.value = false
  proxy.$refs["userForm"].resetFields()
  // done()
}
//取消按钮
const handleCancel = () => {
  dialogVisible.value = false
  proxy.$refs["userForm"].resetFields()
}
//增加用户
const handleAdd = () => {
  formUser.value = { sex: 1 }
  action.value = 'add'
  dialogVisible.value = true
}
//处理时间格式
const timeFormat = (time) => {
  return time ? new Date(time).toLocaleDateString() : ''
}
//提交表单
const onSubmit = () => {
  //表单校验
  proxy.$refs["userForm"].validate(async(valid) => {
    if (valid) {
      let res = null
      formUser.value.birth = timeFormat(formUser.value.birth)
      if (action.value === 'add') {    
        // console.log(formUser)
        res = await proxy.$api.addUser(formUser.value)
      } else {
        res = await proxy.$api.editUser(formUser.value)
      }
      if(res){
        dialogVisible.value = false
        proxy.$refs["userForm"].resetFields()
        getUserData()
      }
    } else {
      ElMessage({
        type: 'error',
        message: '请填写正确的信息',
        showClose: true
      })
    }
  })
}
//编辑用户
const handleEdit = (val) => {
  // console.log(val)
  action.value = 'edit'
  dialogVisible.value = true
  Object.assign(formUser.value, val)
  // nextTick(() => {
  //   Object.assign(formUser.value, val)
  //   console.log(formUser)
  // })
}
onMounted(() => {
  getUserData()
})
</script>

<style scoped lang="less">
.user-header {
  display: flex;
  justify-content: space-between;
 
}
.table {
  position: relative;
  height: 560px;
  .pager {
    position: absolute;
    right: 10px;
    bottom: 30px;
}
.el-table{
  width: 100%;
  height: 500px;
}
}
// .select-clear{
//   display: flex;
// }
</style>

