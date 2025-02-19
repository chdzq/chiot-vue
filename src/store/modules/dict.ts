import { store } from "@/store";
import DictionaryAPI, {
  type DictionaryConstantItem,
  type DictionaryConstant,
} from "@/api/system/dict";

export const useDictStore = defineStore("dict", () => {
  const dictionary = useStorage<Record<string, DictionaryConstantItem[]>>("dictionary", {});

  const setDictionary = (dict: DictionaryConstant) => {
    dictionary.value[dict.code] = dict.items;
  };

  const loadConstantDictionaries = async () => {
    const dictList = await DictionaryAPI.getConstantList();
    dictList.forEach(setDictionary);
  };

  const getDictionary = (code: string): DictionaryConstantItem[] => {
    return dictionary.value[code] || [];
  };

  const getDictionaryByKey = (code: string, key: string): DictionaryConstantItem | undefined => {
    const dict = getDictionary(code);
    const dictEntry = dict.find((item: DictionaryConstantItem) => item.key == key);
    return dictEntry;
  };

  const clearDictionaryCache = () => {
    dictionary.value = {};
  };

  const updateDictionaryCache = async () => {
    clearDictionaryCache(); // 先清除旧缓存
    await loadConstantDictionaries(); // 重新加载最新字典数据
  };

  return {
    dictionary,
    setDictionary,
    loadConstantDictionaries,
    getDictionary,
    getDictionaryByKey,
    clearDictionaryCache,
    updateDictionaryCache,
  };
});

export function useDictStoreHook() {
  return useDictStore(store);
}
