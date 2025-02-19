import type { RouteMeta, RouteRecordRaw } from "vue-router";
import { constantRoutes } from "@/router";
import { store, useUserStore } from "@/store";
import router from "@/router";

import { type MenuVO } from "@/api/system/menu";
import { MenuTypeEnum } from "@/enums/MenuTypeEnum";
const modules = import.meta.glob("../../views/**/**.vue");
const Layout = () => import("@/layout/index.vue");

export const usePermissionStore = defineStore("permission", () => {
  // 所有路由，包括静态和动态路由
  const routes = ref<RouteRecordRaw[]>([]);
  // 混合模式左侧菜单
  const mixLeftMenus = ref<RouteRecordRaw[]>([]);
  // 路由是否已加载
  const isRoutesLoaded = ref(false);

  /**
   * 生成动态路由
   */
  function generateRoutes() {
    return new Promise<RouteRecordRaw[]>((resolve) => {
      const dynamicRoutes = transformRoutes(useUserStore().userInfo.resources);
      routes.value = constantRoutes.concat(dynamicRoutes);
      isRoutesLoaded.value = true;
      resolve(dynamicRoutes);
    });
  }

  /**
   * 混合模式菜单下根据顶部菜单路径设置左侧菜单
   *
   * @param topMenuPath - 顶部菜单路径
   */
  const setMixLeftMenus = (topMenuPath: string) => {
    const matchedItem = routes.value.find((item) => item.path === topMenuPath);
    if (matchedItem && matchedItem.children) {
      mixLeftMenus.value = matchedItem.children;
    }
  };

  /**
   * 重置路由
   */
  const resetRouter = () => {
    // 删除动态路由，保留静态路由
    routes.value.forEach((route) => {
      if (route.name && !constantRoutes.find((r) => r.name === route.name)) {
        // 从 router 实例中移除动态路由
        router.removeRoute(route.name);
      }
    });

    routes.value = [];
    mixLeftMenus.value = [];
    isRoutesLoaded.value = false;
  };

  return {
    routes,
    generateRoutes,
    mixLeftMenus,
    setMixLeftMenus,
    isRoutesLoaded,
    resetRouter,
  };
});

/**
 * 转换路由数据为组件
 */
const transformRoutes = (routes: MenuVO[]) => {
  const asyncRoutes: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    if (route.type === MenuTypeEnum.BUTTON) {
      return;
    } else if (route.component) {
      const tmpRoute = { ...route } as RouteRecordRaw;
      // 顶级目录，替换为 Layout 组件
      if (route.component.toString() == "Layout") {
        tmpRoute.component = Layout;
      } else {
        // 其他菜单，根据组件路径动态加载组件
        const component = modules[`../../views${route.path}/index.vue`];
        if (component) {
          tmpRoute.component = component;
        } else {
          tmpRoute.component = modules["../../views/error-page/404.vue"];
        }
      }

      const meta = {} as RouteMeta;
      meta.alwaysShow = false;
      meta.hidden = false;
      meta.title = route.name;
      meta.keepAlive = true;
      meta.icon = route.icon;
      tmpRoute.meta = meta;

      if (route.children) {
        tmpRoute.children = transformRoutes(route.children);
      }
      asyncRoutes.push(tmpRoute);
    }
  });

  return asyncRoutes;
};

/**
 * 在组件外使用 Pinia store 实例 @see https://pinia.vuejs.org/core-concepts/outside-component-usage.html
 */
export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
