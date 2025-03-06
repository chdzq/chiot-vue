<template>
  <el-checkbox-group v-model="selectedValue" :disabled="disabled" :style="{ width: `${width}px` }">
    <el-checkbox v-for="data in dataList" :key="data.key" :label="data.value" :value="data.key">
      {{ data.value }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script setup lang="ts">
import { DictionaryConstantItem } from "@/api/system/dict";
import { useDictStore } from "@/store";

const dictStore = useDictStore();

const selectedValue = defineModel<[string | number]>("selectedValue", {
  required: true,
});
const props = withDefaults(
  defineProps<{
    dictTable: string;
    disabled?: boolean;
    width?: number;
  }>(),
  {
    disabled: false,
    width: 300,
  }
);

const dataList = ref<DictionaryConstantItem[]>();

// 监听 props 的变化，获取并更新 label 和 tag
const fetchData = () => {
  dataList.value = dictStore.getDictionary(props.dictTable);
};

// 获取字典数据
onBeforeMount(fetchData);
</script>
