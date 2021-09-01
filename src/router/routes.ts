import Featured from "@/views/Featured.vue";
import { RouteRecordRaw } from "vue-router";

export interface Route {
  path: string;
  alias?: string;
  name: string;
  component: unknown;
  iconName?: string;
}

export interface RouteGroup {
  id: string;
  iconName: string;
  name: string;
  routes: Array<RouteRecordRaw>;
}

export const ROUTES: Array<Route | RouteGroup> = [
  {
    path: "/featured",
    alias: "/",
    name: "Featured",
    iconName: "favorite",
    component: Featured,
  },
  {
    path: "/latest",
    name: "Latest",
    iconName: "clock",
    component: () =>
      import(/* webpackChunkName: "latest" */ "../views/Latest.vue"),
  },
  {
    id: "tapes",
    iconName: "tape",
    name: "Browse Tapes",
    routes: [
      {
        path: "/tapes/trending",
        name: "Trending Tapes",
        component: () =>
          import(
            /* webpackChunkName: "trending-tapes" */ "../views/TrendingTapes.vue"
          ),
      },
      {
        path: "/tapes/greatest",
        name: "Greatest Tapes",
        component: () =>
          import(
            /* webpackChunkName: "greatest-tapes" */ "../views/GreatestTapes.vue"
          ),
      },
    ],
  },
  {
    id: "songs",
    iconName: "disc",
    name: "Browse Songs",
    routes: [
      {
        path: "/songs/trending",
        name: "Trending Songs",
        component: () =>
          import(
            /* webpackChunkName: "trending-songs" */ "../views/TrendingSongs.vue"
          ),
      },
      {
        path: "/songs/greatest",
        name: "Greatest Songs",
        component: () =>
          import(
            /* webpackChunkName: "greatest-songs" */ "../views/GreatestSongs.vue"
          ),
      },
    ],
  },
];
