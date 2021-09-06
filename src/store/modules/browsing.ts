import store from "@/store";
import { defineModule } from "direct-vuex";
import { Mixtape } from "@/models/mixtape";
import { ActionContext } from "vuex";
import { MixtapeService } from "@/services/mixtape-service";
import { MMSession } from "@/models/backend/mm-session";
import { CONFIG } from "@/config";

interface BrowsingState {
  featured: Array<Mixtape>;
  latest: Array<Mixtape>;
  latestPage: number;
  trendingTapes: Array<Mixtape>;
  trendingTapesPage: number;
  greatestTapes: Array<Mixtape>;
  greatestTapesPage: number;
}

const initialState: BrowsingState = {
  featured: [],
  latest: [],
  latestPage: 0,
  trendingTapes: [],
  trendingTapesPage: 0,
  greatestTapes: [],
  greatestTapesPage: 0,
};

const getters = {
  featured: (state: BrowsingState): Array<Mixtape> => {
    return state.featured;
  },
  latest: (state: BrowsingState): Array<Mixtape> => {
    return state.latest;
  },
  trendingTapes: (state: BrowsingState): Array<Mixtape> => {
    return state.trendingTapes;
  },
  greatestTapes: (state: BrowsingState): Array<Mixtape> => {
    return state.greatestTapes;
  },
};

enum Mutations {
  FETCH_FEATURED = "FETCH_FEATURED",
  FETCH_LATEST = "FETCH_LATEST",
  FETCH_TRENDING_TAPES = "FETCH_TRENDING_TAPES",
  FETCH_GREATEST_TAPES = "FETCH_GREATEST_TAPES",
}

const mutations = {
  [Mutations.FETCH_FEATURED]: (
    state: BrowsingState,
    featured: Array<Mixtape>
  ) => {
    state.featured = featured;
  },

  [Mutations.FETCH_LATEST]: (state: BrowsingState, latest: Array<Mixtape>) => {
    state.latest.push(...latest);
    state.latestPage++;
  },

  [Mutations.FETCH_TRENDING_TAPES]: (
    state: BrowsingState,
    trendingTapes: Array<Mixtape>
  ) => {
    state.trendingTapes.push(...trendingTapes);
    state.trendingTapesPage++;
  },

  [Mutations.FETCH_GREATEST_TAPES]: (
    state: BrowsingState,
    greatestTapes: Array<Mixtape>
  ) => {
    state.greatestTapes.push(...greatestTapes);
    state.greatestTapesPage++;
  },
};

const actions = {
  async fetchFeatured(
    context: ActionContext<BrowsingState, unknown>,
    session: MMSession
  ): Promise<void> {
    const featured = await MixtapeService.fetchFeatured(session, () =>
      store.dispatch.fetchFeatured(session)
    );
    context.commit(Mutations.FETCH_FEATURED, featured);
  },

  async fetchLatest(
    context: ActionContext<BrowsingState, unknown>,
    session: MMSession
  ): Promise<void> {
    const latest = await MixtapeService.fetchLatest(
      session,
      context.state.latestPage + 1,
      CONFIG.fetchingSize,
      () => store.dispatch.fetchLatest(session)
    );
    context.commit(Mutations.FETCH_LATEST, latest);
  },

  async fetchTrendingTapes(
    context: ActionContext<BrowsingState, unknown>,
    session: MMSession
  ): Promise<void> {
    const trending = await MixtapeService.fetchTrendingTapes(
      session,
      context.state.trendingTapesPage + 1,
      CONFIG.fetchingSize,
      () => store.dispatch.fetchTrendingTapes(session)
    );
    context.commit(Mutations.FETCH_TRENDING_TAPES, trending);
  },

  async fetchGreatestTapes(
    context: ActionContext<BrowsingState, unknown>,
    session: MMSession
  ): Promise<void> {
    const greatest = await MixtapeService.fetchGreatestTapes(
      session,
      context.state.greatestTapesPage + 1,
      CONFIG.fetchingSize,
      () => store.dispatch.fetchGreatestTapes(session)
    );
    context.commit(Mutations.FETCH_GREATEST_TAPES, greatest);
  },
};

export default defineModule({
  state: initialState,
  getters: getters,
  mutations: mutations,
  actions: actions,
});
