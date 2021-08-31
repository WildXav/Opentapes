import { createApp } from "vue";
import ElementPlus from "element-plus";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronRight,
  faSpinner,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark,
  faCaretSquareRight,
  faClock,
  faPlayCircle,
} from "@fortawesome/free-regular-svg-icons";

library.add(
  faBookmark,
  faCaretSquareRight,
  faChevronRight,
  faClock,
  faPlayCircle,
  faSpinner,
  faTimes
);

createApp(App)
  .use(store.original)
  .use(router)
  .use(ElementPlus)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
