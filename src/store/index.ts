import { createLogger } from "vuex";
import { createDirectStore } from "direct-vuex";
import core from "@/store/modules/core";
import browsing from "@/store/modules/browsing";

const debug = process.env.NODE_END !== "production";

const { store, rootActionContext, moduleActionContext } = createDirectStore({
  modules: {
    core,
    browsing,
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
