<!-- 字典数据 -->
<template>
  <div class="app-container">
    <div class="search-bar mt-5">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="关键字" prop="keywords">
          <el-input
            v-model="queryParams.keyword"
            placeholder="字典键/字典值"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="handleQuery()">搜索</el-button>
          <el-button icon="refresh" @click="handleResetQuery()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card shadow="never">
      <div class="mb-[10px]">
        <el-button type="success" icon="plus" @click="handleOpenDialog()">新增</el-button>
        <el-button type="danger" :disabled="ids.length === 0" icon="delete" @click="handleDelete()">
          删除
        </el-button>
      </div>

      <el-table v-loading="loading" highlight-current-row :data="tableData" border:true>
        <el-table-column label="字典键" prop="key" />
        <el-table-column label="字典值" prop="value" />
        <el-table-column label="排序" prop="sort" />
        <el-table-column label="状态">
          <template #default="scope">
            <DictLabel v-model:dict-key="scope.row.status" dict-table="status" />
            <!-- <el-tag :type="scope.row.status === 1 ? 'success' : 'info'">
              {{ scope.row.status === 1 ? "启用" : "禁用" }}
            </el-tag> -->
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              type="primary"
              link
              size="small"
              icon="edit"
              @click.stop="handleOpenDialog(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              link
              size="small"
              icon="delete"
              @click.stop="handleDelete(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-if="total > 0"
        v-model:total="total"
        v-model:page="queryParams.pageNo"
        v-model:limit="queryParams.pageSize"
        @pagination="handleQuery"
      />
    </el-card>

    <!--字典弹窗-->
    <el-dialog
      v-model="dialog.visible"
      :title="dialog.title"
      width="820px"
      @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="computedRules" label-width="100px">
        <el-card shadow="never">
          <el-form-item label="字典键" prop="key">
            <el-input v-model="formData.key" placeholder="请输入字典KEY" />
          </el-form-item>
          <el-form-item label="字典值" prop="value">
            <el-input v-model="formData.value" placeholder="请输入字典Value" />
          </el-form-item>
          <el-form-item label="状态">
            <!-- <el-radio-group v-model="formData.status">
              <el-radio :value="1">启用</el-radio>
              <el-radio :value="0">禁用</el-radio>
            </el-radio-group> -->
            <DictRadio v-model:selected-value="formData.status" dict-table="status" />
          </el-form-item>
          <el-form-item label="排序">
            <el-input-number v-model="formData.sort" controls-position="right" />
          </el-form-item>
        </el-card>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmitClick">确 定</el-button>
          <el-button @click="handleCloseDialog">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "DictData",
  inherititems: false,
});

import DictDataAPI, {
  DictDataPageQuery,
  DictDataPageVO,
  DictDataForm,
} from "@/api/system/dict-data";
import DictLabel from "@/components/Dict/DictLabel.vue";
import { ID } from "@/types/global";

const route = useRoute();

const dictId = ref(route.query.id as ID);

const queryFormRef = ref(ElForm);
const dataFormRef = ref(ElForm);

const loading = ref(false);
const ids = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<DictDataPageQuery>({
  pageNo: 1,
  pageSize: 10,
  dictionaryId: dictId.value,
});

const tableData = ref<DictDataPageVO[]>();

const dialog = reactive({
  title: "",
  visible: false,
});

const formData = reactive<DictDataForm>({});

// // 监听路由参数变化，更新字典数据
// watch(
//   () => [route.query.dictCode],
//   ([newDictCode]) => {
//     queryParams.dictCode = newDictCode as string;
//     dictId.value = newDictCode as string;
//     handleQuery();
//   }
// );
const computedRules = computed(() => {
  const rules: Partial<Record<string, any>> = {
    value: [{ required: true, message: "请输入字典值", trigger: "blur" }],
    label: [{ required: true, message: "请输入字典标签", trigger: "blur" }],
  };
  return rules;
});

// 查询
function handleQuery() {
  loading.value = true;
  DictDataAPI.getPage(queryParams)
    .then((data) => {
      tableData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

// 重置查询
function handleResetQuery() {
  queryFormRef.value.resetFields();
  queryParams.pageNo = 1;
  handleQuery();
}

// 打开弹窗
function handleOpenDialog(row?: DictDataPageVO) {
  dialog.visible = true;
  dialog.title = row ? "编辑字典数据" : "新增字典数据";

  if (row?.id) {
    Object.assign(formData, row);
    // DictDataAPI.getFormData(row.id).then((data) => {
    // });
  } else {
    Object.assign(formData, {});
  }
}

// 提交表单
function handleSubmitClick() {
  dataFormRef.value.validate((isValid: boolean) => {
    if (isValid) {
      loading.value = true;
      if (formData.id) {
        DictDataAPI.update(dictId.value, formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        DictDataAPI.add(dictId.value, formData)
          .then(() => {
            ElMessage.success("新增成功");
            handleCloseDialog();
            handleQuery();
          })
          .finally(() => (loading.value = false));
      }
    }
  });
}

// 关闭弹窗
function handleCloseDialog() {
  dialog.visible = false;

  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();

  formData.id = undefined;
  formData.sort = 1;
  formData.status = 1;
}
/**
 * 删除字典
 *
 * @param id 字典ID
 */
function handleDelete(id: ID) {
  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(
    () => {
      DictDataAPI.deleteById(dictId.value, id).then(() => {
        ElMessage.success("删除成功");
        handleResetQuery();
      });
    },
    () => {
      ElMessage.info("已取消删除");
    }
  );
}

onMounted(() => {
  handleQuery();
});
</script>
