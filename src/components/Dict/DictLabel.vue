<template>
  <el-tag :type="tagType" :size="tagSize">{{ label }}</el-tag>
</template>

<script setup lang="ts">
import { useDictStore } from "@/store";

const dictStore = useDictStore();

const props = defineProps({
  dictTable: {
    type: String,
    required: true,
  },
  dictKey: {
    type: [String, Number],
    required: true,
  },
  tagSize: {
    type: String,
    default: "default",
    validator: (value: string) => ["default", "large", "small"].includes(value),
  },
  tagType: {
    type: String,
    default: "success",
    validator: (value: string) =>
      ["success", "warning", "info", "primary", "danger"].includes(value),
  },
});

const label = ref("");
const tagType = ref(props.tagType as "success" | "warning" | "info" | "primary" | "danger");
const tagSize = ref(props.tagSize as "default" | "large" | "small");

// 监听 props 的变化，获取并更新 label 和 tag
const fetchData = () => {
  const code = props.dictTable;
  const key = props.dictKey;
  // 先从本地缓存中获取字典数据
  const dictEntry = dictStore.getDictionaryByKey(code, key);
  label.value = dictEntry ? dictEntry.value : "";
};

// 首次挂载时获取字典数据
onMounted(fetchData);
</script>
