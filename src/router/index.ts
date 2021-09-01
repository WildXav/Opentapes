import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { ROUTES, RouteGroup } from "@/router/routes";

const routes: Array<RouteRecordRaw> = ROUTES.map((route) => {
  if ("routes" in route) {
    return (route as RouteGroup).routes;
  }

  return route as RouteRecordRaw;
}).flat();

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
