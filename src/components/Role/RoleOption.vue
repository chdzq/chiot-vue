<!-- 角色选择列表 -->

<template>
  <el-select v-model="roles" multiple placeholder="请选择">
    <el-option v-for="item in dataList" :key="item.id" :label="item.name" :value="item.id" />
  </el-select>
</template>

<script setup lang="ts">
import RoleAPI, { RolePageVO } from "@/api/system/role";

const roles = defineModel<number[] | undefined>("roles", {
  required: true,
});

const dataList = ref<RolePageVO[]>(); // 角色列表

async function fetchDataList() {
  // 加载部门下拉数据源
  dataList.value = await RoleAPI.getList();
}

onMounted(fetchDataList);
</script>
