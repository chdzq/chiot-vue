<!-- 角色选择列表 -->

<template>
  <el-select v-model="roles" :multiple="multiple" :placeholder="placeholder">
    <el-option v-for="item in dataList" :key="item.id" :label="item.name" :value="item.id" />
  </el-select>
</template>

<script setup lang="ts">
import RoleAPI, { RolePageVO } from "@/api/system/role";
import { ID } from "@/types/global";

const roles = defineModel<ID[] | undefined>("roles", {
  required: true,
});

const props = withDefaults(
  defineProps<{
    multiple?: boolean;
    placeholder?: string;
  }>(),
  { multiple: true, placeholder: "请选择" }
);

const dataList = ref<RolePageVO[]>(); // 角色列表

async function fetchDataList() {
  // 加载部门下拉数据源
  dataList.value = await RoleAPI.getList();
}

onMounted(fetchDataList);
</script>
