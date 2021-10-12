import { Component, h, VNode } from "vue";
import { NIcon } from "naive-ui";
import { RouterLink } from "vue-router";

export const renderIcon = (icon: Component): (() => VNode) => {
  return (): VNode => h(NIcon, null, { default: () => h(icon) });
};

export const renderRouterLink = (
  path: string,
  label: string
): (() => VNode) => {
  return (): VNode => {
    return h(RouterLink, { to: path }, { default: () => label });
  };
};
