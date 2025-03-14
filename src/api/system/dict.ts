import { type ID } from "@/types/global";
import request from "@/utils/request";

const DICT_BASE_URL = "/sys/api/v1/dictionary";

const DictAPI = {
  /**
   * 获取字典分页列表
   *
   * @param queryParams 查询参数
   * @returns 字典分页结果
   */
  getPage(queryParams: DictPageQuery) {
    return request<any, PageResult<DictPageVO[]>>({
      url: `${DICT_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },

  /**
   * 获取字典表单数据
   *
   * @param id 字典ID
   * @returns 字典表单数据
   */
  getFormData(id: number) {
    return request<any, ResponseData<DictForm>>({
      url: `${DICT_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   * 新增字典
   *
   * @param data 字典表单数据
   */
  add(data: DictForm) {
    return request({
      url: `${DICT_BASE_URL}`,
      method: "post",
      data: data,
    });
  },

  /**
   * 修改字典
   *
   * @param id 字典ID
   * @param data 字典表单数据
   */
  update(id: ID, data: DictForm) {
    return request({
      url: `${DICT_BASE_URL}/${id}`,
      method: "put",
      data: data,
    });
  },

  /**
   * 删除字典
   *
   * @param ids 字典ID，多个以英文逗号(,)分隔
   */
  deleteByIds(id: ID) {
    return request({
      url: `${DICT_BASE_URL}/${id}`,
      method: "delete",
    });
  },

  /**
   * 获取字典列表
   *
   * @returns 字典列表
   */
  getConstantList() {
    return request<any, DictionaryConstant[]>({
      url: `${DICT_BASE_URL}/constants`,
      method: "get",
    });
  },
};

export default DictAPI;

/**
 * 字典查询参数
 */
export interface DictPageQuery extends PageQuery {
  /**
   * 关键字(字典名称/编码)
   */
  keywords?: string;

  /**
   * 字典状态（1:启用，0:禁用）
   */
  status?: number;
}

/**
 * 字典分页对象
 */
export interface DictPageVO {
  /**
   * 字典ID
   */
  id: ID;
  /**
   * 字典名称
   */
  name: string;
  /**
   * 字典编码
   */
  code: string;
  /**
   * 字典状态（1:启用，0:禁用）
   */
  status: number;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 字典
 */
export interface DictForm {
  /**
   * 字典ID
   */
  id?: ID;
  /**
   * 字典名称
   */
  name?: string;
  /**
   * 字典编码
   */
  code?: string;
  /**
   * 字典状态（1-启用，0-禁用）
   */
  status?: number;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 字典数据项分页VO
 *
 * @description 字典数据分页对象
 */
export interface DictVO {
  /** 字典名称 */
  name: string;

  /** 字典编码 */
  dictCode: string;

  /** 字典数据集合 */
  dictDataList: DictData[];
}

/**
 * 字典数据
 *
 * @description 字典数据
 */
export interface DictData {
  /** 字典数据值 */
  value: string;

  /** 字典数据标签 */
  label: string;

  /** 标签类型 */
  tagType: string;
}

/**
 * 常量字典表数据
 *
 * @description 字典数据分页对象
 */
export interface DictionaryConstant {
  /** 字典名称 */
  name: string;

  /** 字典编码 */
  code: string;

  /** 字典数据集合 */
  items: DictionaryConstantItem[];
}

/**
 * 常量字典项数据
 *
 * @description 字典项数据
 */
export interface DictionaryConstantItem {
  /** 字典数据值 */
  value: string;

  /** 字典数据key */
  key: string | number;
}
