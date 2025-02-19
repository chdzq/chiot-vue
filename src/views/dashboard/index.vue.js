/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
const {
  defineProps,
  defineSlots,
  defineEmits,
  defineExpose,
  defineModel,
  defineOptions,
  withDefaults,
} = await import("vue");
defineOptions({
  name: "Dashboard",
  inheritAttrs: false,
});
import VisitTrend from "./components/VisitTrend.vue";
import WebSocketManager from "@/utils/websocket";
import router from "@/router";
import { useUserStore } from "@/store/modules/user";
import StatsAPI from "@/api/system/log";
import NoticeAPI from "@/api/system/notice";
const noticeDetailRef = ref();
const userStore = useUserStore();
const date = new Date();
const greetings = computed(() => {
  const hours = date.getHours();
  if (hours >= 6 && hours < 8) {
    return "晨起披衣出草堂，轩窗已自喜微凉🌅！";
  } else if (hours >= 8 && hours < 12) {
    return "上午好，" + userStore.userInfo.nickname + "！";
  } else if (hours >= 12 && hours < 18) {
    return "下午好，" + userStore.userInfo.nickname + "！";
  } else if (hours >= 18 && hours < 24) {
    return "晚上好，" + userStore.userInfo.nickname + "！";
  } else {
    return "偷偷向银河要了一把碎星，只等你闭上眼睛撒入你的梦中，晚安🌛！";
  }
});
// 右上角数量
const statisticData = ref([
  {
    value: 99,
    iconClass: "message",
    title: "消息",
    key: "message",
  },
  {
    value: 50,
    iconClass: "todo",
    title: "待办",
    suffix: "/100",
    key: "upcoming",
  },
  {
    value: 10,
    iconClass: "project",
    title: "项目",
    key: "project",
  },
]);
const onlineUserCount = ref(0);
const visitStatsLoading = ref(true);
const visitStatsList = ref(Array(3).fill({}));
// 加载访问统计数据
const loadVisitStatsData = async () => {
  const list = await StatsAPI.getVisitStats();
  if (list) {
    const tagTypes = ["primary", "success", "warning"];
    const transformedList = list.map((item, index) => ({
      title: item.title,
      icon: getVisitStatsIcon(item.type),
      tagType: tagTypes[index % tagTypes.length],
      growthRate: item.growthRate,
      granularity: "日",
      todayCount: item.todayCount,
      totalCount: item.totalCount,
    }));
    visitStatsList.value = transformedList;
    visitStatsLoading.value = false;
  }
};
/** 格式化增长率 */
const formatGrowthRate = (growthRate) => {
  if (growthRate === 0) {
    return "-";
  }
  const formattedRate = Math.abs(growthRate * 100)
    .toFixed(2)
    .replace(/\.?0+$/, "");
  return formattedRate + "%";
};
/** 获取增长率文本颜色类 */
const getGrowthRateClass = (growthRate) => {
  if (growthRate > 0) {
    return "color-[--el-color-danger]";
  } else if (growthRate < 0) {
    return "color-[--el-color-success]";
  } else {
    return "color-[--el-color-info]";
  }
};
/** 获取访问统计图标 */
const getVisitStatsIcon = (type) => {
  switch (type) {
    case "pv":
      return "pv";
    case "uv":
      return "uv";
    case "ip":
      return "ip";
    default:
      return "pv";
  }
};
const notices = ref([]);
// 查看更多
function viewMoreNotice() {
  router.push({ path: "/myNotice" });
}
// 阅读通知公告
function viewNoticeDetail(id) {
  noticeDetailRef.value.openNotice(id);
}
onMounted(() => {
  loadVisitStatsData();
  // 获取我的通知公告
  NoticeAPI.getMyNoticePage({ pageNum: 1, pageSize: 10 }).then((data) => {
    notices.value = data.list;
  });
  WebSocketManager.subscribeToTopic("/topic/onlineUserCount", (data) => {
    console.log("收到在线用户数量：", data);
    onlineUserCount.value = JSON.parse(data);
  });
}); /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_fnComponent = (await import("vue")).defineComponent({});
let __VLS_functionalComponentProps;
function __VLS_template() {
  const __VLS_ctx = {};
  const __VLS_localComponents = {
    ...{},
    ...{},
    ...__VLS_ctx,
  };
  let __VLS_components;
  const __VLS_localDirectives = {
    ...{},
    ...__VLS_ctx,
  };
  let __VLS_directives;
  let __VLS_styleScopedClasses;
  // CSS variable injection
  // CSS variable injection end
  let __VLS_resolvedLocalAndGlobalComponents;
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.div,
    __VLS_intrinsicElements.div
  )({ ...{ class: "dashboard-container" } });
  const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.GithubCorner;
  /** @type { [typeof __VLS_components.GithubCorner, typeof __VLS_components.githubCorner, ] } */
  // @ts-ignore
  const __VLS_1 = __VLS_asFunctionalComponent(
    __VLS_0,
    new __VLS_0({ ...{ class: "github-corner" } })
  );
  const __VLS_2 = __VLS_1(
    { ...{ class: "github-corner" } },
    ...__VLS_functionalComponentArgsRest(__VLS_1)
  );
  const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.ElCard;
  /** @type { [typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ] } */
  // @ts-ignore
  const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ shadow: "never" }));
  const __VLS_8 = __VLS_7({ shadow: "never" }, ...__VLS_functionalComponentArgsRest(__VLS_7));
  const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.ElRow;
  /** @type { [typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ] } */
  // @ts-ignore
  const __VLS_13 = __VLS_asFunctionalComponent(
    __VLS_12,
    new __VLS_12({ justify: "space-between" })
  );
  const __VLS_14 = __VLS_13(
    { justify: "space-between" },
    ...__VLS_functionalComponentArgsRest(__VLS_13)
  );
  const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.ElCol;
  /** @type { [typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ] } */
  // @ts-ignore
  const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ span: 18, xs: 24 }));
  const __VLS_20 = __VLS_19({ span: 18, xs: 24 }, ...__VLS_functionalComponentArgsRest(__VLS_19));
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.div,
    __VLS_intrinsicElements.div
  )({ ...{ class: "flex h-full items-center" } });
  __VLS_elementAsFunction(__VLS_intrinsicElements.img)({
    ...{ class: "w-20 h-20 mr-5 rounded-full" },
    src: __VLS_ctx.userStore.userInfo.avatar + "?imageView2/1/w/80/h/80",
  });
  __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
  __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
  __VLS_ctx.greetings;
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.p,
    __VLS_intrinsicElements.p
  )({ ...{ class: "text-sm text-gray" } });
  __VLS_nonNullable(__VLS_23.slots).default;
  var __VLS_23;
  const __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.ElCol;
  /** @type { [typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ] } */
  // @ts-ignore
  const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ span: 6, xs: 24 }));
  const __VLS_26 = __VLS_25({ span: 6, xs: 24 }, ...__VLS_functionalComponentArgsRest(__VLS_25));
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.div,
    __VLS_intrinsicElements.div
  )({ ...{ class: "flex h-full items-center justify-around" } });
  for (const [item] of __VLS_getVForSourceType(__VLS_ctx.statisticData)) {
    const __VLS_30 = __VLS_resolvedLocalAndGlobalComponents.ElStatistic;
    /** @type { [typeof __VLS_components.ElStatistic, typeof __VLS_components.elStatistic, typeof __VLS_components.ElStatistic, typeof __VLS_components.elStatistic, ] } */
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(
      __VLS_30,
      new __VLS_30({ key: item.key, value: item.value })
    );
    const __VLS_32 = __VLS_31(
      { key: item.key, value: item.value },
      ...__VLS_functionalComponentArgsRest(__VLS_31)
    );
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
      const { title: __VLS_thisSlot } = __VLS_nonNullable(__VLS_35.slots);
      __VLS_elementAsFunction(
        __VLS_intrinsicElements.div,
        __VLS_intrinsicElements.div
      )({ ...{ class: "flex items-center" } });
      const __VLS_36 = __VLS_resolvedLocalAndGlobalComponents.SvgIcon;
      /** @type { [typeof __VLS_components.SvgIcon, typeof __VLS_components.svgIcon, ] } */
      // @ts-ignore
      const __VLS_37 = __VLS_asFunctionalComponent(
        __VLS_36,
        new __VLS_36({ iconClass: item.iconClass, size: "20px" })
      );
      const __VLS_38 = __VLS_37(
        { iconClass: item.iconClass, size: "20px" },
        ...__VLS_functionalComponentArgsRest(__VLS_37)
      );
      __VLS_elementAsFunction(
        __VLS_intrinsicElements.span,
        __VLS_intrinsicElements.span
      )({ ...{ class: "text-[16px] ml-1" } });
      item.title;
    }
    if (item.suffix) {
      __VLS_elementAsFunction(
        __VLS_intrinsicElements.template,
        __VLS_intrinsicElements.template
      )({});
      {
        const { suffix: __VLS_thisSlot } = __VLS_nonNullable(__VLS_35.slots);
      }
    }
    var __VLS_35;
  }
  __VLS_nonNullable(__VLS_29.slots).default;
  var __VLS_29;
  __VLS_nonNullable(__VLS_17.slots).default;
  var __VLS_17;
  __VLS_nonNullable(__VLS_11.slots).default;
  var __VLS_11;
  const __VLS_42 = __VLS_resolvedLocalAndGlobalComponents.ElRow;
  /** @type { [typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ] } */
  // @ts-ignore
  const __VLS_43 = __VLS_asFunctionalComponent(
    __VLS_42,
    new __VLS_42({ gutter: 10, ...{ class: "mt-5" } })
  );
  const __VLS_44 = __VLS_43(
    { gutter: 10, ...{ class: "mt-5" } },
    ...__VLS_functionalComponentArgsRest(__VLS_43)
  );
  const __VLS_48 = __VLS_resolvedLocalAndGlobalComponents.ElCol;
  /** @type { [typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ] } */
  // @ts-ignore
  const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({ xs: 24, sm: 12, lg: 6 }));
  const __VLS_50 = __VLS_49(
    { xs: 24, sm: 12, lg: 6 },
    ...__VLS_functionalComponentArgsRest(__VLS_49)
  );
  const __VLS_54 = __VLS_resolvedLocalAndGlobalComponents.ElCard;
  /** @type { [typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ] } */
  // @ts-ignore
  const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({ shadow: "never" }));
  const __VLS_56 = __VLS_55({ shadow: "never" }, ...__VLS_functionalComponentArgsRest(__VLS_55));
  __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
  {
    const { header: __VLS_thisSlot } = __VLS_nonNullable(__VLS_59.slots);
    __VLS_elementAsFunction(
      __VLS_intrinsicElements.div,
      __VLS_intrinsicElements.div
    )({ ...{ class: "flex-x-between" } });
    __VLS_elementAsFunction(
      __VLS_intrinsicElements.span,
      __VLS_intrinsicElements.span
    )({ ...{ class: "text-[var(--el-text-color-secondary)]" } });
    const __VLS_60 = __VLS_resolvedLocalAndGlobalComponents.ElTag;
    /** @type { [typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ] } */
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(
      __VLS_60,
      new __VLS_60({ type: "success", size: "small" })
    );
    const __VLS_62 = __VLS_61(
      { type: "success", size: "small" },
      ...__VLS_functionalComponentArgsRest(__VLS_61)
    );
    __VLS_nonNullable(__VLS_65.slots).default;
    var __VLS_65;
  }
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.div,
    __VLS_intrinsicElements.div
  )({ ...{ class: "flex-x-between mt-2" } });
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.span,
    __VLS_intrinsicElements.span
  )({ ...{ class: "text-lg" } });
  __VLS_ctx.onlineUserCount;
  const __VLS_66 = __VLS_resolvedLocalAndGlobalComponents.SvgIcon;
  /** @type { [typeof __VLS_components.SvgIcon, typeof __VLS_components.svgIcon, ] } */
  // @ts-ignore
  const __VLS_67 = __VLS_asFunctionalComponent(
    __VLS_66,
    new __VLS_66({ iconClass: "user", size: "2em" })
  );
  const __VLS_68 = __VLS_67(
    { iconClass: "user", size: "2em" },
    ...__VLS_functionalComponentArgsRest(__VLS_67)
  );
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.div,
    __VLS_intrinsicElements.div
  )({ ...{ class: "flex-x-between mt-2 text-sm text-[var(--el-text-color-secondary)]" } });
  __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
  __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
  var __VLS_59;
  __VLS_nonNullable(__VLS_53.slots).default;
  var __VLS_53;
  for (const [item, index] of __VLS_getVForSourceType(__VLS_ctx.visitStatsList)) {
    const __VLS_72 = __VLS_resolvedLocalAndGlobalComponents.ElCol;
    /** @type { [typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ] } */
    // @ts-ignore
    const __VLS_73 = __VLS_asFunctionalComponent(
      __VLS_72,
      new __VLS_72({ key: index, xs: 24, sm: 12, lg: 6 })
    );
    const __VLS_74 = __VLS_73(
      { key: index, xs: 24, sm: 12, lg: 6 },
      ...__VLS_functionalComponentArgsRest(__VLS_73)
    );
    const __VLS_78 = __VLS_resolvedLocalAndGlobalComponents.ElSkeleton;
    /** @type { [typeof __VLS_components.ElSkeleton, typeof __VLS_components.elSkeleton, typeof __VLS_components.ElSkeleton, typeof __VLS_components.elSkeleton, ] } */
    // @ts-ignore
    const __VLS_79 = __VLS_asFunctionalComponent(
      __VLS_78,
      new __VLS_78({ loading: __VLS_ctx.visitStatsLoading, rows: 5, animated: true })
    );
    const __VLS_80 = __VLS_79(
      { loading: __VLS_ctx.visitStatsLoading, rows: 5, animated: true },
      ...__VLS_functionalComponentArgsRest(__VLS_79)
    );
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
      const { template: __VLS_thisSlot } = __VLS_nonNullable(__VLS_83.slots);
      const __VLS_84 = __VLS_resolvedLocalAndGlobalComponents.ElCard;
      /** @type { [typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ] } */
      // @ts-ignore
      const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({}));
      const __VLS_86 = __VLS_85({}, ...__VLS_functionalComponentArgsRest(__VLS_85));
      __VLS_elementAsFunction(
        __VLS_intrinsicElements.template,
        __VLS_intrinsicElements.template
      )({});
      {
        const { header: __VLS_thisSlot } = __VLS_nonNullable(__VLS_89.slots);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        const __VLS_90 = __VLS_resolvedLocalAndGlobalComponents.ElSkeletonItem;
        /** @type { [typeof __VLS_components.ElSkeletonItem, typeof __VLS_components.elSkeletonItem, ] } */
        // @ts-ignore
        const __VLS_91 = __VLS_asFunctionalComponent(
          __VLS_90,
          new __VLS_90({ variant: "h3", ...{ style: {} } })
        );
        const __VLS_92 = __VLS_91(
          { variant: "h3", ...{ style: {} } },
          ...__VLS_functionalComponentArgsRest(__VLS_91)
        );
        const __VLS_96 = __VLS_resolvedLocalAndGlobalComponents.ElSkeletonItem;
        /** @type { [typeof __VLS_components.ElSkeletonItem, typeof __VLS_components.elSkeletonItem, ] } */
        // @ts-ignore
        const __VLS_97 = __VLS_asFunctionalComponent(
          __VLS_96,
          new __VLS_96({ variant: "rect", ...{ style: {} } })
        );
        const __VLS_98 = __VLS_97(
          { variant: "rect", ...{ style: {} } },
          ...__VLS_functionalComponentArgsRest(__VLS_97)
        );
      }
      __VLS_elementAsFunction(
        __VLS_intrinsicElements.div,
        __VLS_intrinsicElements.div
      )({ ...{ class: "flex-x-between" } });
      const __VLS_102 = __VLS_resolvedLocalAndGlobalComponents.ElSkeletonItem;
      /** @type { [typeof __VLS_components.ElSkeletonItem, typeof __VLS_components.elSkeletonItem, ] } */
      // @ts-ignore
      const __VLS_103 = __VLS_asFunctionalComponent(
        __VLS_102,
        new __VLS_102({ variant: "text", ...{ style: {} } })
      );
      const __VLS_104 = __VLS_103(
        { variant: "text", ...{ style: {} } },
        ...__VLS_functionalComponentArgsRest(__VLS_103)
      );
      const __VLS_108 = __VLS_resolvedLocalAndGlobalComponents.ElSkeletonItem;
      /** @type { [typeof __VLS_components.ElSkeletonItem, typeof __VLS_components.elSkeletonItem, ] } */
      // @ts-ignore
      const __VLS_109 = __VLS_asFunctionalComponent(
        __VLS_108,
        new __VLS_108({ variant: "circle", ...{ style: {} } })
      );
      const __VLS_110 = __VLS_109(
        { variant: "circle", ...{ style: {} } },
        ...__VLS_functionalComponentArgsRest(__VLS_109)
      );
      __VLS_elementAsFunction(
        __VLS_intrinsicElements.div,
        __VLS_intrinsicElements.div
      )({ ...{ class: "mt-5 flex-x-between" } });
      const __VLS_114 = __VLS_resolvedLocalAndGlobalComponents.ElSkeletonItem;
      /** @type { [typeof __VLS_components.ElSkeletonItem, typeof __VLS_components.elSkeletonItem, ] } */
      // @ts-ignore
      const __VLS_115 = __VLS_asFunctionalComponent(
        __VLS_114,
        new __VLS_114({ variant: "text", ...{ style: {} } })
      );
      const __VLS_116 = __VLS_115(
        { variant: "text", ...{ style: {} } },
        ...__VLS_functionalComponentArgsRest(__VLS_115)
      );
      const __VLS_120 = __VLS_resolvedLocalAndGlobalComponents.ElSkeletonItem;
      /** @type { [typeof __VLS_components.ElSkeletonItem, typeof __VLS_components.elSkeletonItem, ] } */
      // @ts-ignore
      const __VLS_121 = __VLS_asFunctionalComponent(
        __VLS_120,
        new __VLS_120({ variant: "text", ...{ style: {} } })
      );
      const __VLS_122 = __VLS_121(
        { variant: "text", ...{ style: {} } },
        ...__VLS_functionalComponentArgsRest(__VLS_121)
      );
      var __VLS_89;
    }
    if (!__VLS_ctx.visitStatsLoading) {
      const __VLS_126 = __VLS_resolvedLocalAndGlobalComponents.ElCard;
      /** @type { [typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ] } */
      // @ts-ignore
      const __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({ shadow: "never" }));
      const __VLS_128 = __VLS_127(
        { shadow: "never" },
        ...__VLS_functionalComponentArgsRest(__VLS_127)
      );
      __VLS_elementAsFunction(
        __VLS_intrinsicElements.template,
        __VLS_intrinsicElements.template
      )({});
      {
        const { header: __VLS_thisSlot } = __VLS_nonNullable(__VLS_131.slots);
        __VLS_elementAsFunction(
          __VLS_intrinsicElements.div,
          __VLS_intrinsicElements.div
        )({ ...{ class: "flex-x-between" } });
        __VLS_elementAsFunction(
          __VLS_intrinsicElements.span,
          __VLS_intrinsicElements.span
        )({ ...{ class: "text-[var(--el-text-color-secondary)]" } });
        item.title;
        const __VLS_132 = __VLS_resolvedLocalAndGlobalComponents.ElTag;
        /** @type { [typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ] } */
        // @ts-ignore
        const __VLS_133 = __VLS_asFunctionalComponent(
          __VLS_132,
          new __VLS_132({ type: item.tagType, size: "small" })
        );
        const __VLS_134 = __VLS_133(
          { type: item.tagType, size: "small" },
          ...__VLS_functionalComponentArgsRest(__VLS_133)
        );
        item.granularity;
        __VLS_nonNullable(__VLS_137.slots).default;
        var __VLS_137;
      }
      __VLS_elementAsFunction(
        __VLS_intrinsicElements.div,
        __VLS_intrinsicElements.div
      )({ ...{ class: "flex-x-between mt-2" } });
      __VLS_elementAsFunction(
        __VLS_intrinsicElements.div,
        __VLS_intrinsicElements.div
      )({ ...{ class: "flex-y-center" } });
      __VLS_elementAsFunction(
        __VLS_intrinsicElements.span,
        __VLS_intrinsicElements.span
      )({ ...{ class: "text-lg" } });
      item.todayCount;
      __VLS_elementAsFunction(
        __VLS_intrinsicElements.span,
        __VLS_intrinsicElements.span
      )({ ...{ class: ["text-xs", "ml-2", __VLS_ctx.getGrowthRateClass(item.growthRate)] } });
      const __VLS_138 = __VLS_resolvedLocalAndGlobalComponents.ElIcon;
      /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */
      // @ts-ignore
      const __VLS_139 = __VLS_asFunctionalComponent(__VLS_138, new __VLS_138({}));
      const __VLS_140 = __VLS_139({}, ...__VLS_functionalComponentArgsRest(__VLS_139));
      if (item.growthRate > 0) {
        const __VLS_144 = __VLS_resolvedLocalAndGlobalComponents.Top;
        /** @type { [typeof __VLS_components.Top, ] } */
        // @ts-ignore
        const __VLS_145 = __VLS_asFunctionalComponent(__VLS_144, new __VLS_144({}));
        const __VLS_146 = __VLS_145({}, ...__VLS_functionalComponentArgsRest(__VLS_145));
      } else if (item.growthRate < 0) {
        const __VLS_150 = __VLS_resolvedLocalAndGlobalComponents.Bottom;
        /** @type { [typeof __VLS_components.Bottom, ] } */
        // @ts-ignore
        const __VLS_151 = __VLS_asFunctionalComponent(__VLS_150, new __VLS_150({}));
        const __VLS_152 = __VLS_151({}, ...__VLS_functionalComponentArgsRest(__VLS_151));
      }
      __VLS_nonNullable(__VLS_143.slots).default;
      var __VLS_143;
      __VLS_ctx.formatGrowthRate(item.growthRate);
      const __VLS_156 = __VLS_resolvedLocalAndGlobalComponents.SvgIcon;
      /** @type { [typeof __VLS_components.SvgIcon, typeof __VLS_components.svgIcon, ] } */
      // @ts-ignore
      const __VLS_157 = __VLS_asFunctionalComponent(
        __VLS_156,
        new __VLS_156({ iconClass: item.icon, size: "2em" })
      );
      const __VLS_158 = __VLS_157(
        { iconClass: item.icon, size: "2em" },
        ...__VLS_functionalComponentArgsRest(__VLS_157)
      );
      __VLS_elementAsFunction(
        __VLS_intrinsicElements.div,
        __VLS_intrinsicElements.div
      )({ ...{ class: "flex-x-between mt-2 text-sm text-[var(--el-text-color-secondary)]" } });
      __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
      item.title;
      __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
      item.totalCount;
      var __VLS_131;
    }
    var __VLS_83;
    __VLS_nonNullable(__VLS_77.slots).default;
    var __VLS_77;
  }
  __VLS_nonNullable(__VLS_47.slots).default;
  var __VLS_47;
  const __VLS_162 = __VLS_resolvedLocalAndGlobalComponents.ElRow;
  /** @type { [typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ] } */
  // @ts-ignore
  const __VLS_163 = __VLS_asFunctionalComponent(
    __VLS_162,
    new __VLS_162({ gutter: 10, ...{ class: "mt-5" } })
  );
  const __VLS_164 = __VLS_163(
    { gutter: 10, ...{ class: "mt-5" } },
    ...__VLS_functionalComponentArgsRest(__VLS_163)
  );
  const __VLS_168 = __VLS_resolvedLocalAndGlobalComponents.ElCol;
  /** @type { [typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ] } */
  // @ts-ignore
  const __VLS_169 = __VLS_asFunctionalComponent(__VLS_168, new __VLS_168({ xs: 24, span: 16 }));
  const __VLS_170 = __VLS_169(
    { xs: 24, span: 16 },
    ...__VLS_functionalComponentArgsRest(__VLS_169)
  );
  // @ts-ignore
  [VisitTrend];
  // @ts-ignore
  const __VLS_174 = __VLS_asFunctionalComponent(
    VisitTrend,
    new VisitTrend({ id: "VisitTrend", width: "100%", height: "400px" })
  );
  const __VLS_175 = __VLS_174(
    { id: "VisitTrend", width: "100%", height: "400px" },
    ...__VLS_functionalComponentArgsRest(__VLS_174)
  );
  __VLS_nonNullable(__VLS_173.slots).default;
  var __VLS_173;
  const __VLS_179 = __VLS_resolvedLocalAndGlobalComponents.ElCol;
  /** @type { [typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ] } */
  // @ts-ignore
  const __VLS_180 = __VLS_asFunctionalComponent(__VLS_179, new __VLS_179({ xs: 24, span: 8 }));
  const __VLS_181 = __VLS_180({ xs: 24, span: 8 }, ...__VLS_functionalComponentArgsRest(__VLS_180));
  const __VLS_185 = __VLS_resolvedLocalAndGlobalComponents.ElCard;
  /** @type { [typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ] } */
  // @ts-ignore
  const __VLS_186 = __VLS_asFunctionalComponent(__VLS_185, new __VLS_185({}));
  const __VLS_187 = __VLS_186({}, ...__VLS_functionalComponentArgsRest(__VLS_186));
  __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
  {
    const { header: __VLS_thisSlot } = __VLS_nonNullable(__VLS_190.slots);
    __VLS_elementAsFunction(
      __VLS_intrinsicElements.div,
      __VLS_intrinsicElements.div
    )({ ...{ class: "flex-x-between" } });
    __VLS_elementAsFunction(
      __VLS_intrinsicElements.div,
      __VLS_intrinsicElements.div
    )({ ...{ class: "flex-y-center" } });
    const __VLS_191 = __VLS_resolvedLocalAndGlobalComponents.ElLink;
    /** @type { [typeof __VLS_components.ElLink, typeof __VLS_components.elLink, typeof __VLS_components.ElLink, typeof __VLS_components.elLink, ] } */
    // @ts-ignore
    const __VLS_192 = __VLS_asFunctionalComponent(__VLS_191, new __VLS_191({ type: "primary" }));
    const __VLS_193 = __VLS_192(
      { type: "primary" },
      ...__VLS_functionalComponentArgsRest(__VLS_192)
    );
    __VLS_elementAsFunction(
      __VLS_intrinsicElements.span,
      __VLS_intrinsicElements.span
    )({ ...{ onClick: __VLS_ctx.viewMoreNotice }, ...{ class: "text-xs" } });
    const __VLS_197 = __VLS_resolvedLocalAndGlobalComponents.ElIcon;
    /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */
    // @ts-ignore
    const __VLS_198 = __VLS_asFunctionalComponent(
      __VLS_197,
      new __VLS_197({ ...{ class: "text-xs" } })
    );
    const __VLS_199 = __VLS_198(
      { ...{ class: "text-xs" } },
      ...__VLS_functionalComponentArgsRest(__VLS_198)
    );
    const __VLS_203 = __VLS_resolvedLocalAndGlobalComponents.ArrowRight;
    /** @type { [typeof __VLS_components.ArrowRight, ] } */
    // @ts-ignore
    const __VLS_204 = __VLS_asFunctionalComponent(__VLS_203, new __VLS_203({}));
    const __VLS_205 = __VLS_204({}, ...__VLS_functionalComponentArgsRest(__VLS_204));
    __VLS_nonNullable(__VLS_202.slots).default;
    var __VLS_202;
    __VLS_nonNullable(__VLS_196.slots).default;
    var __VLS_196;
  }
  const __VLS_209 = __VLS_resolvedLocalAndGlobalComponents.ElScrollbar;
  /** @type { [typeof __VLS_components.ElScrollbar, typeof __VLS_components.elScrollbar, typeof __VLS_components.ElScrollbar, typeof __VLS_components.elScrollbar, ] } */
  // @ts-ignore
  const __VLS_210 = __VLS_asFunctionalComponent(__VLS_209, new __VLS_209({ height: "400px" }));
  const __VLS_211 = __VLS_210({ height: "400px" }, ...__VLS_functionalComponentArgsRest(__VLS_210));
  for (const [item, index] of __VLS_getVForSourceType(__VLS_ctx.notices)) {
    __VLS_elementAsFunction(
      __VLS_intrinsicElements.div,
      __VLS_intrinsicElements.div
    )({ key: index, ...{ class: "flex-y-center py-3" } });
    const __VLS_215 = __VLS_resolvedLocalAndGlobalComponents.DictLabel;
    /** @type { [typeof __VLS_components.DictLabel, ] } */
    // @ts-ignore
    const __VLS_216 = __VLS_asFunctionalComponent(
      __VLS_215,
      new __VLS_215({ modelValue: item.type, code: "notice_type", size: "small" })
    );
    const __VLS_217 = __VLS_216(
      { modelValue: item.type, code: "notice_type", size: "small" },
      ...__VLS_functionalComponentArgsRest(__VLS_216)
    );
    const __VLS_221 = __VLS_resolvedLocalAndGlobalComponents.ElText;
    /** @type { [typeof __VLS_components.ElText, typeof __VLS_components.elText, typeof __VLS_components.ElText, typeof __VLS_components.elText, ] } */
    // @ts-ignore
    const __VLS_222 = __VLS_asFunctionalComponent(
      __VLS_221,
      new __VLS_221({
        truncated: true,
        ...{ class: "!mx-2 flex-1 !text-xs !text-[var(--el-text-color-secondary)]" },
      })
    );
    const __VLS_223 = __VLS_222(
      {
        truncated: true,
        ...{ class: "!mx-2 flex-1 !text-xs !text-[var(--el-text-color-secondary)]" },
      },
      ...__VLS_functionalComponentArgsRest(__VLS_222)
    );
    item.title;
    __VLS_nonNullable(__VLS_226.slots).default;
    var __VLS_226;
    const __VLS_227 = __VLS_resolvedLocalAndGlobalComponents.ElLink;
    /** @type { [typeof __VLS_components.ElLink, typeof __VLS_components.elLink, typeof __VLS_components.ElLink, typeof __VLS_components.elLink, ] } */
    // @ts-ignore
    const __VLS_228 = __VLS_asFunctionalComponent(__VLS_227, new __VLS_227({ ...{ onClick: {} } }));
    const __VLS_229 = __VLS_228(
      { ...{ onClick: {} } },
      ...__VLS_functionalComponentArgsRest(__VLS_228)
    );
    let __VLS_233;
    const __VLS_234 = {
      onClick: (...[$event]) => {
        __VLS_ctx.viewNoticeDetail(item.id);
      },
    };
    let __VLS_230;
    let __VLS_231;
    const __VLS_235 = __VLS_resolvedLocalAndGlobalComponents.ElIcon;
    /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */
    // @ts-ignore
    const __VLS_236 = __VLS_asFunctionalComponent(
      __VLS_235,
      new __VLS_235({ ...{ class: "text-sm" } })
    );
    const __VLS_237 = __VLS_236(
      { ...{ class: "text-sm" } },
      ...__VLS_functionalComponentArgsRest(__VLS_236)
    );
    const __VLS_241 = __VLS_resolvedLocalAndGlobalComponents.View;
    /** @type { [typeof __VLS_components.View, ] } */
    // @ts-ignore
    const __VLS_242 = __VLS_asFunctionalComponent(__VLS_241, new __VLS_241({}));
    const __VLS_243 = __VLS_242({}, ...__VLS_functionalComponentArgsRest(__VLS_242));
    __VLS_nonNullable(__VLS_240.slots).default;
    var __VLS_240;
    __VLS_nonNullable(__VLS_232.slots).default;
    var __VLS_232;
  }
  __VLS_nonNullable(__VLS_214.slots).default;
  var __VLS_214;
  var __VLS_190;
  __VLS_nonNullable(__VLS_184.slots).default;
  var __VLS_184;
  __VLS_nonNullable(__VLS_167.slots).default;
  var __VLS_167;
  const __VLS_247 = __VLS_resolvedLocalAndGlobalComponents.NoticeDetail;
  /** @type { [typeof __VLS_components.NoticeDetail, ] } */
  // @ts-ignore
  const __VLS_248 = __VLS_asFunctionalComponent(
    __VLS_247,
    new __VLS_247({ ref: "noticeDetailRef" })
  );
  const __VLS_249 = __VLS_248(
    { ref: "noticeDetailRef" },
    ...__VLS_functionalComponentArgsRest(__VLS_248)
  );
  // @ts-ignore navigation for `const noticeDetailRef = ref()`
  __VLS_ctx.noticeDetailRef;
  var __VLS_253 = {};
  var __VLS_252;
  __VLS_styleScopedClasses["dashboard-container"];
  __VLS_styleScopedClasses["github-corner"];
  __VLS_styleScopedClasses["flex"];
  __VLS_styleScopedClasses["h-full"];
  __VLS_styleScopedClasses["items-center"];
  __VLS_styleScopedClasses["w-20"];
  __VLS_styleScopedClasses["h-20"];
  __VLS_styleScopedClasses["mr-5"];
  __VLS_styleScopedClasses["rounded-full"];
  __VLS_styleScopedClasses["text-sm"];
  __VLS_styleScopedClasses["text-gray"];
  __VLS_styleScopedClasses["flex"];
  __VLS_styleScopedClasses["h-full"];
  __VLS_styleScopedClasses["items-center"];
  __VLS_styleScopedClasses["justify-around"];
  __VLS_styleScopedClasses["flex"];
  __VLS_styleScopedClasses["items-center"];
  __VLS_styleScopedClasses["text-[16px]"];
  __VLS_styleScopedClasses["ml-1"];
  __VLS_styleScopedClasses["mt-5"];
  __VLS_styleScopedClasses["flex-x-between"];
  __VLS_styleScopedClasses["text-[var(--el-text-color-secondary)]"];
  __VLS_styleScopedClasses["flex-x-between"];
  __VLS_styleScopedClasses["mt-2"];
  __VLS_styleScopedClasses["text-lg"];
  __VLS_styleScopedClasses["flex-x-between"];
  __VLS_styleScopedClasses["mt-2"];
  __VLS_styleScopedClasses["text-sm"];
  __VLS_styleScopedClasses["text-[var(--el-text-color-secondary)]"];
  __VLS_styleScopedClasses["flex-x-between"];
  __VLS_styleScopedClasses["mt-5"];
  __VLS_styleScopedClasses["flex-x-between"];
  __VLS_styleScopedClasses["flex-x-between"];
  __VLS_styleScopedClasses["text-[var(--el-text-color-secondary)]"];
  __VLS_styleScopedClasses["flex-x-between"];
  __VLS_styleScopedClasses["mt-2"];
  __VLS_styleScopedClasses["flex-y-center"];
  __VLS_styleScopedClasses["text-lg"];
  __VLS_styleScopedClasses["text-xs"];
  __VLS_styleScopedClasses["ml-2"];
  __VLS_styleScopedClasses["flex-x-between"];
  __VLS_styleScopedClasses["mt-2"];
  __VLS_styleScopedClasses["text-sm"];
  __VLS_styleScopedClasses["text-[var(--el-text-color-secondary)]"];
  __VLS_styleScopedClasses["mt-5"];
  __VLS_styleScopedClasses["flex-x-between"];
  __VLS_styleScopedClasses["flex-y-center"];
  __VLS_styleScopedClasses["text-xs"];
  __VLS_styleScopedClasses["text-xs"];
  __VLS_styleScopedClasses["flex-y-center"];
  __VLS_styleScopedClasses["py-3"];
  __VLS_styleScopedClasses["!mx-2"];
  __VLS_styleScopedClasses["flex-1"];
  __VLS_styleScopedClasses["!text-xs"];
  __VLS_styleScopedClasses["!text-[var(--el-text-color-secondary)]"];
  __VLS_styleScopedClasses["text-sm"];
  var __VLS_slots;
  var __VLS_inheritedAttrs;
  const __VLS_refs = {
    noticeDetailRef: __VLS_253,
  };
  var $refs;
  var $el;
  return {
    attrs: {},
    slots: __VLS_slots,
    refs: $refs,
    rootEl: $el,
  };
}
const __VLS_self = (await import("vue")).defineComponent({
  setup() {
    return {
      VisitTrend: VisitTrend,
      noticeDetailRef: noticeDetailRef,
      userStore: userStore,
      greetings: greetings,
      statisticData: statisticData,
      onlineUserCount: onlineUserCount,
      visitStatsLoading: visitStatsLoading,
      visitStatsList: visitStatsList,
      formatGrowthRate: formatGrowthRate,
      getGrowthRateClass: getGrowthRateClass,
      notices: notices,
      viewMoreNotice: viewMoreNotice,
      viewNoticeDetail: viewNoticeDetail,
    };
  },
});
export default (await import("vue")).defineComponent({
  setup() {
    return {};
  },
}); /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=index.vue.js.map
