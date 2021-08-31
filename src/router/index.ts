import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Featured from "../views/Featured.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/featured",
    alias: "/",
    name: "Featured",
    component: Featured,
  },
  {
    path: "/latest",
    name: "Latest",
    component: () =>
      import(/* webpackChunkName: "latest" */ "../views/Latest.vue"),
  },
  {
    path: "/trending-tapes",
    name: "TrendingTapes",
    component: () =>
      import(
        /* webpackChunkName: "trending-albums" */ "../views/TrendingTapes.vue"
      ),
  },
  {
    path: "/best-tapes",
    name: "BestTapes",
    component: () =>
      import(/* webpackChunkName: "best-albums" */ "../views/BestTapes.vue"),
  },
  {
    path: "/trending-songs",
    name: "TrendingSongs",
    component: () =>
      import(
        /* webpackChunkName: "trending-singles" */ "../views/TrendingSongs.vue"
      ),
  },
  {
    path: "/best-songs",
    name: "BestSongs",
    component: () =>
      import(/* webpackChunkName: "best-singles" */ "../views/BestSongs.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
