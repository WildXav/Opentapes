import { defineModule } from "direct-vuex";
import { Song } from "@/models/song";
import { SongLocation } from "@/models/song-location";
import { ActionContext } from "vuex";
import { MMSession } from "@/models/backend/mm-session";
import { DetailsService } from "@/services/details-service";

interface PlayingState {
  playlist: Array<Song>;
  songsLocation: Array<SongLocation>;
  queue: Array<number>;
  songPlaying: Song | null;
  isPlaying: boolean;
  isLoadingPlaylist: boolean;
}

const initialState: PlayingState = {
  playlist: [],
  songsLocation: [],
  queue: [],
  songPlaying: null,
  isPlaying: false,
  isLoadingPlaylist: false,
};

const getters = {
  playlist: (state: PlayingState): Array<Song> => {
    return state.playlist;
  },
  songsLocation: (state: PlayingState): Array<SongLocation> => {
    return state.songsLocation;
  },
  queue: (state: PlayingState): number[] => {
    return state.queue;
  },
  songPlaying: (state: PlayingState): Song | null => {
    return state.songPlaying;
  },
  isPlaying: (state: PlayingState): boolean => {
    return state.isPlaying;
  },
  isLoadingPlaylist: (state: PlayingState): boolean => {
    return state.isLoadingPlaylist;
  },
};

enum Mutations {
  SET_PLAYLIST = "SET_PLAYLIST",
  SET_SONG_PLAYING = "SET_SONG_PLAYING",
  SET_IS_PLAYING = "SET_IS_PLAYING",
  SET_IS_LOADING_PLAYLIST = "SET_IS_LOADING_PLAYLIST",
}

const mutations = {
  [Mutations.SET_PLAYLIST]: (
    state: PlayingState,
    payload: SetPlaylistSuccessPayload
  ) => {
    state.playlist = payload.playlist;
    state.songsLocation = payload.songsLocation;
    state.queue = payload.playlist.map((song) => song.id);
    state.isLoadingPlaylist = false;
  },
  [Mutations.SET_SONG_PLAYING]: (
    state: PlayingState,
    songPlaying: Song | null
  ) => {
    state.songPlaying = songPlaying;
  },
  [Mutations.SET_IS_PLAYING]: (state: PlayingState, isPlaying: boolean) => {
    state.isPlaying = isPlaying;
  },
  [Mutations.SET_IS_LOADING_PLAYLIST]: (
    state: PlayingState,
    isLoadingPlaylist: boolean
  ) => {
    state.isLoadingPlaylist = isLoadingPlaylist;
  },
};

const actions = {
  async setPlaylist(
    context: ActionContext<PlayingState, unknown>,
    payload: SetPlaylistPayload
  ): Promise<void> {
    context.commit(Mutations.SET_IS_PLAYING, false);
    context.commit(Mutations.SET_IS_LOADING_PLAYLIST, true);

    const $songsLocation = payload.playlist.map(async (song) => {
      return {
        songId: song.id,
        url: await DetailsService.fetchSongLocation(payload.session, song.id),
      };
    });

    Promise.all($songsLocation).then((songsLocation) => {
      context.commit(Mutations.SET_PLAYLIST, {
        playlist: payload.playlist,
        songsLocation,
      });
    });
  },
  setSongPlaying(
    context: ActionContext<PlayingState, unknown>,
    songPlaying: Song | null
  ): void {
    context.commit(Mutations.SET_SONG_PLAYING, songPlaying);
  },
  setIsPlaying(
    context: ActionContext<PlayingState, unknown>,
    isPlaying: boolean
  ): void {
    context.commit(Mutations.SET_IS_PLAYING, isPlaying);
  },
};

export interface SetPlaylistPayload {
  session: MMSession;
  playlist: Array<Song>;
}

export interface SetPlaylistSuccessPayload {
  playlist: Array<Song>;
  songsLocation: Array<SongLocation>;
}

export default defineModule({
  state: initialState,
  getters: getters,
  mutations: mutations,
  actions: actions,
});
