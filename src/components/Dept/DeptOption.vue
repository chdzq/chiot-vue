<!-- 部门列表下拉选择组件 -->
<template>
  <el-tree-select
    v-model="deptId"
    placeholder="请选择所属部门"
    node-key="id"
    value-key="id"
    :data="deptList"
    :props="{ value: 'id', children: 'children', label: 'name', disabled: '' }"
    filterable
    check-strictly
    :render-after-expand="false"
  />
</template>

<script setup lang="ts">
import DeptAPI, { DeptVO } from "@/api/system/dept";

const deptId = defineModel("deptId");

const deptList = ref<DeptVO[]>(); // 部门列表

async function fetchDeptList() {
  // 加载部门下拉数据源
  deptList.value = await DeptAPI.getList();
}

onMounted(fetchDeptList);
</script>
