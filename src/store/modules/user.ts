import { store } from "@/store";
import { usePermissionStoreHook } from "@/store/modules/permission";
import { useDictStoreHook } from "@/store/modules/dict";

import AuthAPI, { type LoginData } from "@/api/auth";
import UserAPI, { type UserInfo } from "@/api/system/user";

import { setToken, setRefreshToken, getRefreshToken, clearToken } from "@/utils/auth";
import { MenuTypeEnum } from "@/enums/MenuTypeEnum";
import { type RolePageVO } from "@/api/system/role";
import { type MenuVO } from "@/api/system/menu";

export const useUserStore = defineStore("user", () => {
  const userInfo = useStorage<UserStorageInfo>("userInfo", {} as UserStorageInfo);
  /**
   * 登录
   *
   * @param {LoginData}
   * @returns
   */
  function login(loginData: LoginData) {
    return new Promise<void>((resolve, reject) => {
      AuthAPI.login(loginData)
        .then((data) => {
          const { tokenType, accessToken, refreshToken } = data;
          setToken(tokenType + " " + accessToken); // Bearer eyJhbGciOiJIUzI1NiJ9.xxx.xxx
          setRefreshToken(refreshToken);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * 获取用户信息
   *
   * @returns {UserInfo} 用户信息
   */
  function getUserInfo() {
    return new Promise<UserInfo>((resolve, reject) => {
      UserAPI.getInfo()
        .then((data) => {
          if (!data) {
            reject("Verification failed, please Login again.");
            return;
          }
          const st = {} as UserStorageInfo;
          st.avatar = data.avatar;
          st.id = data.id;
          st.nickname = data.nickname;
          st.username = data.username;
          st.roles = doRoleCodesTransformRoles(data.roles);
          st.perms = doPermsTransformMenus(data.resources);
          st.resources = data.resources;
          userInfo.value = st;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * 登出
   */
  function logout() {
    return new Promise<void>((resolve, reject) => {
      AuthAPI.logout()
        .then(() => {
          clearUserData();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * 刷新 token
   */
  function refreshToken() {
    const refreshToken = getRefreshToken();
    return new Promise<void>((resolve, reject) => {
      AuthAPI.refreshToken(refreshToken)
        .then((data) => {
          const { tokenType, accessToken, refreshToken } = data;
          setToken(tokenType + " " + accessToken);
          setRefreshToken(refreshToken);
          resolve();
        })
        .catch((error) => {
          console.log(" refreshToken  刷新失败", error);
          reject(error);
        });
    });
  }

  /**
   * 清理用户数据
   *
   * @returns
   */
  function clearUserData() {
    return new Promise<void>((resolve) => {
      clearToken();
      usePermissionStoreHook().resetRouter();
      useDictStoreHook().clearDictionaryCache();
      resolve();
    });
  }

  return {
    userInfo,
    getUserInfo,
    login,
    logout,
    clearUserData,
    refreshToken,
  };
});

const doPermsTransformMenus = (routes: MenuVO[]) => {
  const perms: string[] = [];
  routes.forEach((route) => {
    if (route.type === MenuTypeEnum.BUTTON && route.code) {
      perms.push(route.code);
    }
    if (route.children) {
      perms.push(...doPermsTransformMenus(route.children));
    }
  });
  return perms;
};

const doRoleCodesTransformRoles = (roles: RolePageVO[]) => {
  const roleCodes: string[] = [];
  roles.forEach((role) => {
    if (role.code) {
      roleCodes.push(role.code);
    }
  });
  return roleCodes;
};

export interface UserStorageInfo {
  /** 用户ID */
  id?: number;

  /** 用户名 */
  username?: string;

  /** 昵称 */
  nickname?: string;

  /** 头像URL */
  avatar?: string;

  /** 角色列表 */
  roles: string[];

  /** 权限列表 */
  perms: string[];

  /*** 资源列表*/
  resources: MenuVO[];
}

/**
 * 用于在组件外部（如在Pinia Store 中）使用 Pinia 提供的 store 实例。
 * 官方文档解释了如何在组件外部使用 Pinia Store：
 * https://pinia.vuejs.org/core-concepts/outside-component-usage.html#using-a-store-outside-of-a-component
 */
export function useUserStoreHook() {
  return useUserStore(store);
}
