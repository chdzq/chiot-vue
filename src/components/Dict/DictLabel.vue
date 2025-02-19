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
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "default",
  },
  tagType: {
    type: String,
    default: "success",
  },
});

const label = ref("");
const tagType = ref(props.tagType as "success" | "warning" | "info" | "primary" | "danger");

const tagSize = ref(props.size as "default" | "large" | "small");

// 监听 props 的变化，获取并更新 label 和 tag
const fetchLabelAndTag = () => {
  const code = props.dictTable;
  const key = props.dictKey;
  // 先从本地缓存中获取字典数据
  const dictEntry = dictStore.getDictionaryByKey(code, key);
  label.value = dictEntry ? dictEntry.value : "";
};

// 首次挂载时获取字典数据
onMounted(fetchLabelAndTag);
</script>
