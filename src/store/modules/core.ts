import { ActionContext } from "vuex";
import { defineModule } from "direct-vuex";
import { MMSession } from "@/models/backend/mm-session";
import { ErrorDialogData } from "@/models/error-dialog-data";
import { Song } from "@/models/song";
import { DetailsService } from "@/services/details-service";
import store from "@/store";
import { Album } from "@/models/album";
import { Breakpoints } from "@/models/breakpoints";

interface CoreState {
  errorDialogData: ErrorDialogData | null;
  breakpoints: Breakpoints;
  session: MMSession | null;
  isLoadingSession: boolean;
  primaryViewTitle: string | null;
  secondaryViewTitle: string | null;
  isSecondaryViewActive: boolean;
  selectedAlbum: Album | null;
  selectedAlbumSongs: Array<Song> | null;
}

const initialState: CoreState = {
  errorDialogData: null,
  breakpoints: new Breakpoints(),
  session: null,
  isLoadingSession: false,
  primaryViewTitle: null,
  secondaryViewTitle: null,
  isSecondaryViewActive: false,
  selectedAlbum: null,
  selectedAlbumSongs: null,
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
  isSecondaryViewActive: (state: CoreState): boolean => {
    return state.isSecondaryViewActive;
  },
  selectedAlbum: (state: CoreState): Album | null => {
    return state.selectedAlbum;
  },
  selectedAlbumSongs: (state: CoreState): Array<Song> | null => {
    return state.selectedAlbumSongs;
  },
};

enum Mutations {
  SET_ERROR_DIALOG_DATA = "SET_ERROR_DIALOG_DATA",
  BREAKPOINTS_UPDATE = "BREAKPOINTS_UPDATE",
  SET_SESSION = "SET_SESSION",
  SET_IS_LOADING_SESSION = "SET_IS_LOADING_SESSION",
  SET_PRIMARY_VIEW_TITLE = "SET_PRIMARY_VIEW_TITLE",
  SET_SECONDARY_VIEW_TITLE = "SET_SECONDARY_VIEW_TITLE",
  SET_IS_SECONDARY_VIEW_ACTIVE = "SET_IS_SECONDARY_VIEW_ACTIVE",
  SELECT_ALBUM = "SELECT_ALBUM",
  FETCH_ALBUM_SONGS = "FETCH_ALBUM_SONGS",
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

  [Mutations.SET_IS_SECONDARY_VIEW_ACTIVE]: (
    state: CoreState,
    isSecondaryViewActive: boolean
  ) => {
    state.isSecondaryViewActive = isSecondaryViewActive;
  },

  [Mutations.SELECT_ALBUM]: (state: CoreState, album: Album) => {
    if (!state.selectedAlbum || state.selectedAlbum.id !== album.id) {
      state.selectedAlbumSongs = null;
      state.selectedAlbum = album;
      state.secondaryViewTitle = album.name;
    }
    state.isSecondaryViewActive = true;
  },

  [Mutations.FETCH_ALBUM_SONGS]: (state: CoreState, songs: Array<Song>) => {
    state.selectedAlbumSongs = songs;
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
    context.commit(Mutations.SET_IS_SECONDARY_VIEW_ACTIVE, payload);
  },

  selectAlbum(context: ActionContext<unknown, unknown>, payload: Album): void {
    context.commit(Mutations.SELECT_ALBUM, payload);
  },

  async fetchAlbumSongs(
    context: ActionContext<CoreState, unknown>,
    session: MMSession
  ): Promise<void> {
    const album = context.state.selectedAlbum;
    if (!album) {
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

    const songs = await DetailsService.fetchSongs(session, album, () =>
      store.dispatch.fetchAlbumSongs(session)
    );
    context.commit(Mutations.FETCH_ALBUM_SONGS, songs);
  },
};

export default defineModule({
  state: initialState,
  getters: getters,
  mutations: mutations,
  actions: actions,
});
