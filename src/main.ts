import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  create,
  NButton,
  NButtonGroup,
  NCard,
  NConfigProvider,
  NGrid,
  NGridItem,
  NIcon,
  NLayout,
  NLayoutFooter,
  NLayoutHeader,
  NLayoutSider,
  NMenu,
  NModal,
  NResult,
  NSlider,
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
    NButtonGroup,
    NSpin,
    NCard,
    NGrid,
    NGridItem,
    NIcon,
    NSlider,
  ],
});

createApp(App).use(store.original).use(router).use(naive).mount("#app");
