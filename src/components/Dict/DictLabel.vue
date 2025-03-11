<template>
  <el-tag :type="tagType" :size="tagSize">{{ label }}</el-tag>
</template>

<script setup lang="ts">
import { TagSizeEnum, TagTypeEnum } from "@/enums/TagEnum";
import { useDictStore } from "@/store";
import { ID } from "@/types/global";

const dictStore = useDictStore();

const props = withDefaults(
  defineProps<{
    dictKey: ID;
    dictTable: string;
    tagSize?: TagSizeEnum;
    tagType?: TagTypeEnum;
  }>(),
  { tagSize: TagSizeEnum.DEFAULT, tagType: TagTypeEnum.SUCCESS }
);

const label = ref("");

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

//变更数据及时刷新
watch(
  () => props.dictKey,
  (dictKey) => {
    fetchData();
  }
);
</script>
