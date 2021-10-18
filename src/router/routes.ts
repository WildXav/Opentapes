import Featured from "@/views/Featured.vue";
import { VNode } from "vue";
import { renderIcon, renderRouterLink } from "@/helpers/render-helper";
import {
  DiscOutline as DiscIcon,
  RecordingOutline as RecordingIcon,
  RibbonOutline as RibbonIcon,
  TimerOutline as TimerIcon,
  TrendingUpOutline as TrendingIcon,
  TrophyOutline as TrophyIcon,
} from "@vicons/ionicons5";
import { MenuGroupOption, MenuOption } from "naive-ui";
import { RouteRecordRaw } from "vue-router";

export interface Route {
  key: string;
  path: string;
  alias?: string;
  label: string;
  component: unknown;
  icon?: () => VNode;
}

export interface RouteGroup {
  key: string;
  icon?: () => VNode;
  label: string;
  routes: Array<Route>;
}

export const routesToRouteRecord = (
  route: Route | RouteGroup
): RouteRecordRaw | RouteRecordRaw[] => {
  if ("routes" in route) {
    return (route as RouteGroup).routes.map((r) => {
      return { ...r, name: r.label } as RouteRecordRaw;
    });
  }

  return {
    ...route,
    name: route.label,
    meta: {
      key: route.key,
    },
  } as RouteRecordRaw;
};

export const routesToMenuOption = (
  route: Route | RouteGroup
): MenuOption | MenuGroupOption => {
  if ("routes" in route) {
    const group = route as RouteGroup;
    return {
      key: group.key,
      label: group.label,
      icon: group.icon,
      children: group.routes.map((child) => routesToMenuOption(child)),
    };
  }

  return {
    key: route.key,
    label: renderRouterLink(route.path, route.label),
    icon: route.icon,
  };
};

export const ROUTES: Array<Route | RouteGroup> = [
  {
    key: "featured",
    path: "/featured",
    alias: "/",
    label: "Featured",
    icon: renderIcon(RibbonIcon),
    component: Featured,
  },
  {
    key: "latest",
    path: "/latest",
    label: "Latest",
    icon: renderIcon(TimerIcon),
    component: () =>
      import(/* webpackChunkName: "latest" */ "../views/Latest.vue"),
  },
  {
    key: "mixtapes",
    label: "Browse Mixtapes",
    icon: renderIcon(RecordingIcon),
    routes: [
      {
        key: "trending-mixtapes",
        path: "/mixtapes/trending",
        label: "Trending Mixtapes",
        icon: renderIcon(TrendingIcon),
        component: () =>
          import(
            /* webpackChunkName: "trending-mixtapes" */ "../views/TrendingMixtapes.vue"
          ),
      },
      {
        key: "greatest-mixtapes",
        path: "/mixtapes/greatest",
        label: "Greatest Mixtapes",
        icon: renderIcon(TrophyIcon),
        component: () =>
          import(
            /* webpackChunkName: "greatest-mixtapes" */ "../views/GreatestMixtapes.vue"
          ),
      },
    ],
  },
  {
    key: "singles",
    label: "Browse Singles",
    icon: renderIcon(DiscIcon),
    routes: [
      {
        key: "trending-singles",
        path: "/singles/trending",
        label: "Trending Singles",
        icon: renderIcon(TrendingIcon),
        component: () =>
          import(
            /* webpackChunkName: "trending-singles" */ "../views/TrendingSingles.vue"
          ),
      },
      {
        key: "greatest-singles",
        path: "/singles/greatest",
        label: "Greatest Singles",
        icon: renderIcon(TrophyIcon),
        component: () =>
          import(
            /* webpackChunkName: "greatest-singles" */ "../views/GreatestSingles.vue"
          ),
      },
    ],
  },
];
