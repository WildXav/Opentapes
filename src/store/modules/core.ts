import { ActionContext } from "vuex";
import { defineModule } from "direct-vuex";
import { Breakpoints } from "@/models/breakpoints";
import { MMSession } from "@/models/backend/mm-session";
import { ErrorDialogData } from "@/models/error-dialog-data";
import { Mixtape } from "@/models/mixtape";
import { Song } from "@/models/song";
import { DetailsService } from "@/services/details-service";
import store from "@/store";

interface CoreState {
  errorDialogData: ErrorDialogData | null;
  breakpoints: Breakpoints;
  session: MMSession | null;
  isLoadingSession: boolean;
  primaryViewTitle: string | null;
  secondaryViewTitle: string | null;
  showSecondaryView: boolean;
  selectedTape: Mixtape | null;
  selectedTapeSongs: Array<Song> | null;
}

const initialState: CoreState = {
  errorDialogData: null,
  breakpoints: new Breakpoints(),
  session: null,
  isLoadingSession: false,
  primaryViewTitle: null,
  secondaryViewTitle: null,
  showSecondaryView: false,
  selectedTape: null,
  selectedTapeSongs: null,
};

const getters = {
  errorDialogData: (state: CoreState): ErrorDialogData | null => {
    return state.errorDialogData;
  },
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
  selectedTape: (state: CoreState): Mixtape | null => {
    return state.selectedTape;
  },
  selectedTapeSongs: (state: CoreState): Array<Song> | null => {
    return state.selectedTapeSongs;
  },
};

enum Mutations {
  SET_ERROR_DIALOG_DATA = "SET_ERROR_DIALOG_DATA",
  BREAKPOINTS_UPDATE = "BREAKPOINTS_UPDATE",
  SET_SESSION = "SET_SESSION",
  SET_IS_LOADING_SESSION = "SET_IS_LOADING_SESSION",
  SET_PRIMARY_VIEW_TITLE = "SET_PRIMARY_VIEW_TITLE",
  SET_SECONDARY_VIEW_TITLE = "SET_SECONDARY_VIEW_TITLE",
  SET_SHOW_SECONDARY_VIEW = "SET_SHOW_SECONDARY_VIEW",
  SELECT_TAPE = "SELECT_TAPE",
  FETCH_TAPE_SONGS = "FETCH_TAPE_SONGS",
}

const mutations = {
  [Mutations.SET_ERROR_DIALOG_DATA]: (
    state: CoreState,
    errorDialogData: ErrorDialogData | null
  ) => {
    state.errorDialogData = errorDialogData;
  },

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

  [Mutations.SELECT_TAPE]: (state: CoreState, tape: Mixtape) => {
    if (!state.selectedTape || state.selectedTape.id !== tape.id) {
      state.selectedTapeSongs = null;
      state.selectedTape = tape;
      state.secondaryViewTitle = tape.name;
    }
    state.showSecondaryView = true;
  },

  [Mutations.FETCH_TAPE_SONGS]: (state: CoreState, songs: Array<Song>) => {
    state.selectedTapeSongs = songs;
  },
};

const actions = {
  setErrorDialogData(
    context: ActionContext<unknown, unknown>,
    payload: ErrorDialogData | null
  ): void {
    if (payload) {
      console.error(payload.error.reason, payload.error.details);
    }
    context.commit(Mutations.SET_ERROR_DIALOG_DATA, payload);
  },

  updateBreakpoints(context: ActionContext<unknown, unknown>): void {
    context.commit(Mutations.BREAKPOINTS_UPDATE);
  },

  setSession(
    context: ActionContext<unknown, unknown>,
    payload: MMSession
  ): void {
    context.commit(Mutations.SET_SESSION, payload);
  },

  setIsLoadingSession(
    context: ActionContext<unknown, unknown>,
    payload: boolean
  ): void {
    context.commit(Mutations.SET_IS_LOADING_SESSION, payload);
  },

  setPrimaryViewTitle(
    context: ActionContext<unknown, unknown>,
    payload: string
  ): void {
    context.commit(Mutations.SET_PRIMARY_VIEW_TITLE, payload);
  },

  setSecondaryViewTitle(
    context: ActionContext<unknown, unknown>,
    payload: string
  ): void {
    context.commit(Mutations.SET_SECONDARY_VIEW_TITLE, payload);
  },

  toggleSecondaryView(
    context: ActionContext<unknown, unknown>,
    payload: boolean
  ): void {
    context.commit(Mutations.SET_SHOW_SECONDARY_VIEW, payload);
  },

  selectTape(context: ActionContext<unknown, unknown>, payload: Mixtape): void {
    context.commit(Mutations.SELECT_TAPE, payload);
  },

  async fetchTapeSongs(
    context: ActionContext<CoreState, unknown>,
    session: MMSession
  ): Promise<void> {
    const tape = context.state.selectedTape;
    if (!tape) {
      await store.dispatch.setErrorDialogData(
        new ErrorDialogData(
          {
            details: "Nothing to retrieve songs from",
            reason: "Unexpected Error",
          },
          true
        )
      );
      return;
    }

    const songs = await DetailsService.fetchSongs(session, tape.id, () =>
      store.dispatch.fetchTapeSongs(session)
    );
    context.commit(Mutations.FETCH_TAPE_SONGS, songs);
  },
};

export default defineModule({
  state: initialState,
  getters: getters,
  mutations: mutations,
  actions: actions,
});
