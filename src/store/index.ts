import { createLogger } from "vuex";
import { createDirectStore } from "direct-vuex";
import core from "./modules/core";

const debug = process.env.NODE_ENV !== "production";

const { store, rootActionContext, moduleActionContext } = createDirectStore({
  modules: {
    core,
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
