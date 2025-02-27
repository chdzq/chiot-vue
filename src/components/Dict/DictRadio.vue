<template>
  <el-radio-group v-model="selectedValue" :disabled="disabled" :style="style">
    <el-radio v-for="data in dataList" :key="data.key" :label="data.value" :value="data.key">
      {{ data.value }}
    </el-radio>
  </el-radio-group>
</template>

<script setup lang="ts">
import { DictionaryConstantItem } from "@/api/system/dict";
import { useDictStore } from "@/store";

const dictStore = useDictStore();

const selectedValue = defineModel<string | number | undefined>("selectedValue", {
  required: true,
});
const props = defineProps({
  code: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "请选择",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  style: {
    type: Object,
    default: () => {
      return {
        width: "300px",
      };
    },
  },
});

const dataList = ref<DictionaryConstantItem[]>();

// 监听 props 的变化，获取并更新 label 和 tag
const fetchData = () => {
  dataList.value = dictStore.getDictionary(props.code);
};

// 获取字典数据
onBeforeMount(fetchData);
</script>
