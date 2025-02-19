<!-- 部门树 -->
<template>
  <el-card shadow="never">
    <el-input v-model="deptName" placeholder="部门名称" clearable>
      <template #prefix>
        <el-icon><Search /></el-icon>
      </template>
    </el-input>

    <el-tree
      ref="deptTreeRef"
      class="mt-2"
      :data="deptList"
      :props="{ children: 'children', label: 'name', disabled: '' }"
      :expand-on-click-node="false"
      :filter-node-method="handleFilter"
      default-expand-all
      @node-click="handleNodeClick"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { ElTree } from "element-plus";
import DeptAPI, { DeptVO } from "@/api/system/dept";

const deptId = defineModel();

const deptList = ref<DeptVO[]>(); // 部门列表

const deptTreeRef = ref(ElTree); // 部门树
const deptName = ref(""); // 部门名称

const emits = defineEmits(["node-click"]);

watch(deptName, (val) => {
  deptTreeRef.value!.filter(val);
});

/**
 * 部门筛选
 */
const handleFilter = (value: string, data: any) => {
  if (!value) return true;
  return data.name?.includes(value);
};

/** 部门树节点 Click */
function handleNodeClick(dept: DeptVO) {
  deptId.value = dept.id;
}

onBeforeMount(() => {
  DeptAPI.getList().then((data) => {
    deptList.value = data;
  });
});
</script>
