import { ActionContext } from "vuex";
import { defineModule } from "direct-vuex";
import { Breakpoints } from "@/models/breakpoints";
import { MMSession } from "@/models/backend/mm-session";

interface CoreState {
  breakpoints: Breakpoints;
  session: MMSession | null;
  isLoadingSession: boolean;
  primaryViewTitle: string | null;
  secondaryViewTitle: string | null;
  showSecondaryView: boolean;
}

const initialState: CoreState = {
  breakpoints: new Breakpoints(),
  session: null,
  isLoadingSession: false,
  primaryViewTitle: null,
  secondaryViewTitle: null,
  showSecondaryView: false,
};

const getters = {
  breakpoints: (state: CoreState): Breakpoints => {
    return state.breakpoints;
  },
  session: (state: CoreState): MMSession | null => {
    return state.session;
  },
  isLoadingSession: (state: CoreState): boolean => {
    return state.isLoadingSession;
  },
  primaryViewTitle: (state: CoreState): string | null => {
    return state.primaryViewTitle;
  },
  secondaryViewTitle: (state: CoreState): string | null => {
    return state.secondaryViewTitle;
  },
  showSecondaryView: (state: CoreState): boolean => {
    return state.showSecondaryView;
  },
};

enum Mutations {
  BREAKPOINTS_UPDATE = "BREAKPOINTS_UPDATE",
  SET_SESSION = "SET_SESSION",
  SET_IS_LOADING_SESSION = "SET_IS_LOADING_SESSION",
  SET_PRIMARY_VIEW_TITLE = "SET_PRIMARY_VIEW_TITLE",
  SET_SECONDARY_VIEW_TITLE = "SET_SECONDARY_VIEW_TITLE",
  SET_SHOW_SECONDARY_VIEW = "SET_SHOW_SECONDARY_VIEW",
}

const mutations = {
  [Mutations.BREAKPOINTS_UPDATE]: (state: CoreState) => {
    state.breakpoints = new Breakpoints(window.innerWidth);
  },
  [Mutations.SET_SESSION]: (state: CoreState, session: MMSession) => {
    state.session = session;
    state.isLoadingSession = false;
  },
  [Mutations.SET_IS_LOADING_SESSION]: (
    state: CoreState,
    isLoading: boolean
  ) => {
    state.isLoadingSession = isLoading;
  },
  [Mutations.SET_PRIMARY_VIEW_TITLE]: (state: CoreState, title: string) => {
    state.primaryViewTitle = title;
  },
  [Mutations.SET_SECONDARY_VIEW_TITLE]: (state: CoreState, title: string) => {
    state.secondaryViewTitle = title;
  },
  [Mutations.SET_SHOW_SECONDARY_VIEW]: (
    state: CoreState,
    showView: boolean
  ) => {
    state.showSecondaryView = showView;
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
    context.commit(Mutations.SET_IS_LOADING_SESSION, true);
  },
  setPrimaryViewTitle(
    context: ActionContext<unknown, unknown>,
    title: string
  ): void {
    context.commit(Mutations.SET_PRIMARY_VIEW_TITLE, title);
  },
  setSecondaryViewTitle(
    context: ActionContext<unknown, unknown>,
    title: string
  ): void {
    context.commit(Mutations.SET_SECONDARY_VIEW_TITLE, title);
  },
  toggleSecondaryView(
    context: ActionContext<unknown, unknown>,
    showView: boolean
  ): void {
    context.commit(Mutations.SET_SHOW_SECONDARY_VIEW, showView);
  },
};

export default defineModule({
  state: initialState,
  getters: getters,
  mutations: mutations,
  actions: actions,
});
