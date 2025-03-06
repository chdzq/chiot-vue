<template>
  <el-select
    v-model="selectedValue"
    :placeholder="placeholder"
    :disabled="disabled"
    clearable
    :style="{ width: `${width}px` }"
  >
    <el-option v-for="data in dataList" :key="data.key" :label="data.value" :value="data.key" />
  </el-select>
</template>

<script setup lang="ts">
import { DictionaryConstantItem } from "@/api/system/dict";
import { useDictStore } from "@/store";

const dictStore = useDictStore();

const selectedValue = defineModel<string | number | [] | undefined>("selectedValue", {
  required: true,
});
const props = withDefaults(
  defineProps<{
    dictTable: string;
    placeholder?: string;
    disabled?: boolean;
    width?: number;
  }>(),
  {
    placeholder: "请选择",
    disabled: false,
    width: 300,
  }
);

const dataList = ref<DictionaryConstantItem[]>([]);

// 监听 props 的变化，获取并更新 label 和 tag
const fetchData = () => {
  dataList.value = dictStore.getDictionary(props.dictTable);
};

// 获取字典数据
onMounted(fetchData);
</script>
