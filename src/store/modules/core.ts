import { ActionContext } from "vuex";
import { defineModule } from "direct-vuex";
import { Breakpoints } from "@/models/breakpoints";

interface CoreState {
  breakpoints: Breakpoints;
}

const initialState = {
  breakpoints: new Breakpoints(),
} as CoreState;

const getters = {
  breakpoints: (state: CoreState): Breakpoints => state.breakpoints,
};

const mutations = {
  BREAKPOINTS_UPDATE: (state: CoreState) => {
    state.breakpoints = new Breakpoints(window.innerWidth);
    console.log(state.breakpoints);
  },
};

const actions = {
  updateBreakpoints(context: ActionContext<unknown, unknown>): void {
    context.commit("BREAKPOINTS_UPDATE");
  },
};

export default defineModule({
  state: initialState,
  getters: getters,
  mutations: mutations,
  actions: actions,
});
