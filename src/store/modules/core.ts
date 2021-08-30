import { ActionContext } from "vuex";
import { defineModule } from "direct-vuex";
import { Breakpoints } from "@/models/breakpoints";
import { MMSession } from "@/models/backend/mm-session";

interface CoreState {
  breakpoints: Breakpoints;
  session: MMSession | null;
  loadingSession: boolean;
}

const initialState: CoreState = {
  breakpoints: new Breakpoints(),
  session: null,
  loadingSession: false,
};

const getters = {
  breakpoints: (state: CoreState): Breakpoints => state.breakpoints,
  session: (state: CoreState): MMSession | null => state.session,
  loadingSession: (state: CoreState): boolean => state.loadingSession,
};

enum Mutations {
  BREAKPOINTS_UPDATE = "BREAKPOINTS_UPDATE",
  SET_SESSION = "SET_SESSION",
  SET_LOADING_SESSION = "SET_LOADING_SESSION",
}

const mutations = {
  [Mutations.BREAKPOINTS_UPDATE]: (state: CoreState) => {
    state.breakpoints = new Breakpoints(window.innerWidth);
  },
  [Mutations.SET_SESSION]: (state: CoreState, newSession: MMSession) => {
    state.session = newSession;
    state.loadingSession = false;
  },
  [Mutations.SET_LOADING_SESSION]: (
    state: CoreState,
    isLoadingSession: boolean
  ) => {
    state.loadingSession = isLoadingSession;
  },
};

const actions = {
  updateBreakpoints(context: ActionContext<unknown, unknown>): void {
    context.commit(Mutations.BREAKPOINTS_UPDATE);
  },
  setSession(
    context: ActionContext<unknown, unknown>,
    payload: MMSession
  ): void {
    context.commit(Mutations.SET_SESSION, payload);
  },
  loadSession(context: ActionContext<unknown, unknown>): void {
    context.commit(Mutations.SET_LOADING_SESSION, true);
  },
};

export default defineModule({
  state: initialState,
  getters: getters,
  mutations: mutations,
  actions: actions,
});
