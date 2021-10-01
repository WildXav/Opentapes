import { createLogger } from "vuex";
import { createDirectStore } from "direct-vuex";
import core from "@/store/modules/core";
import browsing from "@/store/modules/browsing";
import playing from "@/store/modules/playing";

const debug = process.env.NODE_ENV !== "production";

const { store, rootActionContext, moduleActionContext } = createDirectStore({
  modules: {
    core,
    browsing,
    playing,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});

export default store;

export { rootActionContext, moduleActionContext };

export type AppStore = typeof store;
declare module "vuex" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    direct: AppStore;
  }
}
