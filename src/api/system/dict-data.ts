import { type ID } from "@/types/global";
import request from "@/utils/request";

const DICT_DATA_BASE_URL = "/sys/api/v1/dictionary";

const DictDataAPI = {
  /**
   * 获取字典分页列表
   *
   * @param queryParams 查询参数
   * @returns 字典分页结果
   */
  getPage(queryParams: DictDataPageQuery) {
    const np: DictDataPageQuery = {
      pageNo: queryParams.pageNo,
      pageSize: queryParams.pageSize,
      keyword: queryParams.keyword,
    };
    return request<any, PageResult<DictDataPageVO[]>>({
      url: `${DICT_DATA_BASE_URL}/${queryParams.dictionaryId}/page`,
      method: "get",
      params: np,
    });
  },

  /**
   * 获取字典数据表单
   *
   * @param id 字典ID
   * @returns 字典数据表单
   */
  getFormData(id: number) {
    return request<any, ResponseData<DictDataForm>>({
      url: `${DICT_DATA_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   * 新增字典数据
   *
   * @param data 字典数据
   */
  add(dictId: ID, data: DictDataForm) {
    return request({
      url: `${DICT_DATA_BASE_URL}/${dictId}/item`,
      method: "post",
      data: data,
    });
  },

  /**
   * 修改字典数据
   *
   * @param id 字典ID
   * @param data 字典数据
   */
  update(dictId: ID, data: DictDataForm) {
    return request({
      url: `${DICT_DATA_BASE_URL}/${dictId}/item/${data.id}`,
      method: "put",
      data: data,
    });
  },

  /**
   * 删除字典
   *
   * @param ids 字典ID，多个以英文逗号(,)分隔
   */
  deleteById(dictId: ID, id: ID) {
    return request({
      url: `${DICT_DATA_BASE_URL}/${dictId}/item/${id}`,
      method: "delete",
    });
  },
};

export default DictDataAPI;

/**
 * 字典查询参数
 */
export interface DictDataPageQuery extends PageQuery {
  /** 字典主键 */
  dictionaryId?: ID;
  keyword?: string;
}

/**
 * 字典分页对象
 */
export interface DictDataPageVO {
  /**
   * 字典ID
   */
  id: ID;

  /**
   * 字典数据值
   */
  value: string;
  /**
   * 字典数据key
   */
  key: string;
  /**
   * 状态（1:启用，0:禁用)
   */
  status: number;
  /**
   * 字典排序
   */
  sort?: number;
}

/**
 * 字典
 */
export interface DictDataForm {
  /**
   * 字典ID
   */
  id?: ID;
  /**
   * 字典数据值
   */
  value?: string;
  /**
   * 字典数据KEY
   */
  key?: string;
  /**
   * 状态（1:启用，0:禁用)
   */
  status?: number;
  /**
   * 字典排序
   */
  sort?: number;
}
