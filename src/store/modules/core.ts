import { ActionContext } from "vuex";
import { defineModule } from "direct-vuex";
import { MMSession } from "@/models/backend/mm-session";
import { ErrorDialogData } from "@/models/error-dialog-data";
import { Song } from "@/models/song";
import { DetailsService } from "@/services/details-service";
import store from "@/store";
import { Album } from "@/models/album";
import { Breakpoints } from "@/models/breakpoints";
import { Single } from "@/models/single";

interface CoreState {
  errorDialogData: ErrorDialogData | null;
  breakpoints: Breakpoints;
  session: MMSession | null;
  isLoadingSession: boolean;
  browsingViewTitle: string | null;
  albumViewTitle: string | null;
  isAlbumViewActive: boolean;
  selectedAlbum: Album | null;
  selectedAlbumSongs: Array<Song> | null;
  selectedSingle: Single | null;
  selectedSingleSong: Song | null;
}

const initialState: CoreState = {
  errorDialogData: null,
  breakpoints: new Breakpoints(),
  session: null,
  isLoadingSession: false,
  browsingViewTitle: null,
  albumViewTitle: null,
  isAlbumViewActive: false,
  selectedAlbum: null,
  selectedAlbumSongs: null,
  selectedSingle: null,
  selectedSingleSong: null,
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
  browsingViewTitle: (state: CoreState): string | null => {
    return state.browsingViewTitle;
  },
  albumViewTitle: (state: CoreState): string | null => {
    return state.albumViewTitle;
  },
  isAlbumViewActive: (state: CoreState): boolean => {
    return state.isAlbumViewActive;
  },
  selectedAlbum: (state: CoreState): Album | null => {
    return state.selectedAlbum;
  },
  selectedAlbumSongs: (state: CoreState): Array<Song> | null => {
    return state.selectedAlbumSongs;
  },
  selectedSingle: (state: CoreState): Single | null => {
    return state.selectedSingle;
  },
  selectedSingleSong: (state: CoreState): Song | null => {
    return state.selectedSingleSong;
  },
};

enum Mutations {
  SET_ERROR_DIALOG_DATA = "SET_ERROR_DIALOG_DATA",
  BREAKPOINTS_UPDATE = "BREAKPOINTS_UPDATE",
  SET_SESSION = "SET_SESSION",
  SET_IS_LOADING_SESSION = "SET_IS_LOADING_SESSION",
  SET_BROWSING_VIEW_TITLE = "SET_BROWSING_VIEW_TITLE",
  SET_ALBUM_VIEW_TITLE = "SET_ALBUM_VIEW_TITLE",
  SET_IS_ALBUM_VIEW_ACTIVE = "SET_IS_ALBUM_VIEW_ACTIVE",
  SELECT_ALBUM = "SELECT_ALBUM",
  FETCH_ALBUM_SONGS = "FETCH_ALBUM_SONGS",
  SELECT_SINGLE = "SELECT_SINGLE",
  FETCH_SINGLE_SONG = "FETCH_SINGLE_SONG",
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

  [Mutations.SET_BROWSING_VIEW_TITLE]: (state: CoreState, title: string) => {
    state.browsingViewTitle = title;
  },

  [Mutations.SET_ALBUM_VIEW_TITLE]: (state: CoreState, title: string) => {
    state.albumViewTitle = title;
  },

  [Mutations.SET_IS_ALBUM_VIEW_ACTIVE]: (
    state: CoreState,
    isAlbumViewActive: boolean
  ) => {
    state.isAlbumViewActive = isAlbumViewActive;
  },

  [Mutations.SELECT_ALBUM]: (state: CoreState, album: Album) => {
    if (
      !state.selectedSingle ||
      !state.selectedAlbum ||
      state.selectedAlbum.id !== album.id
    ) {
      state.selectedSingle = null;
      state.selectedSingleSong = null;
      state.selectedAlbum = album;
      state.selectedAlbumSongs = null;
      state.albumViewTitle = album.name;
    }
    state.isAlbumViewActive = true;
  },

  [Mutations.FETCH_ALBUM_SONGS]: (state: CoreState, songs: Array<Song>) => {
    state.selectedAlbumSongs = songs;
  },

  [Mutations.SELECT_SINGLE]: (state: CoreState, single: Single) => {
    if (
      !state.selectedAlbum ||
      !state.selectedSingle ||
      state.selectedSingle.id !== single.id
    ) {
      state.selectedAlbum = null;
      state.selectedAlbumSongs = null;
      state.selectedSingle = single;
      state.selectedSingleSong = null;
      state.albumViewTitle = single.name;
    }
    state.isAlbumViewActive = true;
  },

  [Mutations.FETCH_SINGLE_SONG]: (state: CoreState, song: Song) => {
    state.selectedSingleSong = song;
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

  setBrowsingViewTitle(
    context: ActionContext<unknown, unknown>,
    payload: string
  ): void {
    context.commit(Mutations.SET_BROWSING_VIEW_TITLE, payload);
  },

  setIsAlbumViewActive(
    context: ActionContext<unknown, unknown>,
    payload: boolean
  ): void {
    context.commit(Mutations.SET_IS_ALBUM_VIEW_ACTIVE, payload);
  },

  selectAlbum(context: ActionContext<unknown, unknown>, payload: Album): void {
    context.commit(Mutations.SELECT_ALBUM, payload);
  },

  selectSingle(
    context: ActionContext<unknown, unknown>,
    payload: Single
  ): void {
    context.commit(Mutations.SELECT_SINGLE, payload);
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

    const songs = await DetailsService.fetchAlbumSongs(session, album, () =>
      store.dispatch.fetchAlbumSongs(session)
    );
    context.commit(Mutations.FETCH_ALBUM_SONGS, songs);
  },

  async fetchSingleSong(
    context: ActionContext<CoreState, unknown>,
    session: MMSession
  ): Promise<void> {
    const single = context.state.selectedSingle;
    if (!single) {
      await store.dispatch.setErrorDialogData(
        new ErrorDialogData(
          {
            details: "Nothing to retrieve song from",
            reason: "Unexpected Error",
          },
          true
        )
      );
      return;
    }

    const songs = await DetailsService.fetchSingleSong(session, single, () =>
      store.dispatch.fetchSingleSong(session)
    );
    context.commit(Mutations.FETCH_SINGLE_SONG, songs);
  },
};

export default defineModule({
  state: initialState,
  getters: getters,
  mutations: mutations,
  actions: actions,
});
