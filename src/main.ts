import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  create,
  NButton,
  NCard,
  NConfigProvider,
  NGrid,
  NGridItem,
  NLayout,
  NLayoutFooter,
  NLayoutHeader,
  NLayoutSider,
  NMenu,
  NModal,
  NResult,
  NSpace,
  NSpin,
  NSwitch,
  NTabPane,
  NTabs,
} from "naive-ui";
import "./styles/tailwind.css";
import "./styles/styles.scss";

const naive = create({
  components: [
    NSpace,
    NLayout,
    NLayoutSider,
    NMenu,
    NConfigProvider,
    NSwitch,
    NLayoutHeader,
    NLayoutFooter,
    NTabs,
    NTabPane,
    NModal,
    NResult,
    NButton,
    NSpin,
    NCard,
    NGrid,
    NGridItem,
  ],
});

createApp(App).use(store.original).use(router).use(naive).mount("#app");
