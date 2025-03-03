import { type ID } from "@/types/global";
import request from "@/utils/request";
import { type MenuForm } from "./menu";

const ROLE_BASE_URL = "/sys/api/v1/role";

const RoleAPI = {
  /** 获取角色分页数据 */
  getPage(queryParams?: RolePageQuery) {
    return request<any, PageResult<RolePageVO[]>>({
      url: `${ROLE_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },

  /** 获取角色下拉数据源 */
  getList(params?: RoleListQuery) {
    return request<any, RolePageVO[]>({
      url: `${ROLE_BASE_URL}/list`,
      method: "get",
      params: params,
    });
  },
  /**
   * 获取角色的菜单ID集合
   *
   * @param roleId 角色ID
   * @returns 角色的菜单ID集合
   */
  getRoleMenus(roleId: ID) {
    return request<any, MenuForm[]>({
      url: `${ROLE_BASE_URL}/${roleId}/resources`,
      method: "get",
    });
  },

  /**
   * 分配菜单权限
   *
   * @param roleId 角色ID
   * @param data 菜单ID集合
   */
  updateRoleMenus(roleId: ID, resources: ID[]) {
    return request({
      url: `${ROLE_BASE_URL}/${roleId}/resources`,
      method: "put",
      data: resources,
    });
  },

  /**
   * 获取角色表单数据
   *
   * @param id 角色ID
   * @returns 角色表单数据
   */
  getFormData(id: number) {
    return request<any, RoleForm>({
      url: `${ROLE_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /** 添加角色 */
  add(data: RoleForm) {
    return request({
      url: `${ROLE_BASE_URL}`,
      method: "post",
      data: data,
    });
  },

  /**
   * 更新角色
   *
   * @param id 角色ID
   * @param data 角色表单数据
   */
  update(id: ID, data: RoleForm) {
    return request({
      url: `${ROLE_BASE_URL}/${id}`,
      method: "put",
      data: data,
    });
  },

  /**
   * 批量删除角色，多个以英文逗号(,)分割
   *
   * @param ids 角色ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${ROLE_BASE_URL}/${ids}`,
      method: "delete",
    });
  },
};

export default RoleAPI;

/** 角色分页查询参数 */
export interface RolePageQuery extends PageQuery {
  /** 搜索关键字 */
  keywords?: string;
}

/** 角色查询参数 */
export interface RoleListQuery {
  /** 搜索关键字 */
  keywords?: string;
}

/** 角色分页对象 */
export interface RolePageVO {
  /** 角色编码 */
  code?: string;
  /** 角色ID */
  id: number;
  /** 角色名称 */
  name?: string;
  /** 排序 */
  sort?: number;
  /** 角色状态 */
  status?: number;
  /** 创建时间 */
  createTime?: Date;
  /** 修改时间 */
  updateTime?: Date;
}

/** 角色表单对象 */
export interface RoleForm {
  /** 角色ID */
  id?: ID;
  /** 角色编码 */
  code?: string;
  /** 数据权限 */
  dataScope?: number;
  /** 角色名称 */
  name?: string;
  /** 排序 */
  sort?: number;
  /** 角色状态(1-正常；0-停用) */
  status?: number;
}
