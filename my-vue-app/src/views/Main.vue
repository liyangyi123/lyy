<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <!-- 自定义左侧组件 -->
      <common-aside></common-aside>
      <el-container>

        <el-header class="el-header">
          <!-- 自定义头部组件 -->
          <common-header></common-header>
        </el-header>
        <common-tab></common-tab>
        <el-main class="right-main">
          <!-- 自定义内容组件 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'
import CommonTab from '@/components/CommonTab.vue'


</script>

<style scoped lang="less">
.common-layout,
.lay-container {
  height: 100%;
}

.el-header {
  background-color: #333;
}
</style>

