import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { ROUTES, routesToRouteRecord } from "@/router/routes";

const routes: Array<RouteRecordRaw> = ROUTES.map((route) => {
  return routesToRouteRecord(route);
}).flat();

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
