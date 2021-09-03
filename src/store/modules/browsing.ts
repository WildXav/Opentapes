import { defineModule } from "direct-vuex";
import { Mixtape } from "@/models/mixtape";
import { ActionContext } from "vuex";
import { MixtapeService } from "@/services/mixtape-service";
import { MMSession } from "@/models/backend/mm-session";

interface BrowsingState {
  featured: Array<Mixtape>;
  latest: Array<Mixtape>;
  trendingTapes: Array<Mixtape>;
}

const initialState: BrowsingState = {
  featured: [],
  latest: [],
  trendingTapes: [],
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
};

enum Mutations {
  FETCH_FEATURED = "FETCH_FEATURED",
  FETCH_LATEST = "FETCH_LATEST",
  FETCH_TRENDING_TAPES = "FETCH_TRENDING_TAPES",
}

const mutations = {
  [Mutations.FETCH_FEATURED]: (
    state: BrowsingState,
    featured: Array<Mixtape>
  ) => {
    state.featured = featured;
  },

  [Mutations.FETCH_LATEST]: (state: BrowsingState, latest: Array<Mixtape>) => {
    state.latest = latest;
  },

  [Mutations.FETCH_TRENDING_TAPES]: (
    state: BrowsingState,
    trendingTapes: Array<Mixtape>
  ) => {
    state.trendingTapes = trendingTapes;
  },
};

const actions = {
  async fetchFeatured(
    context: ActionContext<BrowsingState, unknown>,
    session: MMSession
  ): Promise<void> {
    const featured = await MixtapeService.fetchFeatured(session);
    context.commit(Mutations.FETCH_FEATURED, featured);
  },

  async fetchLatest(
    context: ActionContext<BrowsingState, unknown>,
    session: MMSession
  ): Promise<void> {
    const latest = await MixtapeService.fetchLatest(session);
    context.commit(Mutations.FETCH_LATEST, latest);
  },

  async fetchTrendingTapes(
    context: ActionContext<BrowsingState, unknown>,
    session: MMSession
  ): Promise<void> {
    const latest = await MixtapeService.fetchTrendingTapes(session);
    context.commit(Mutations.FETCH_TRENDING_TAPES, latest);
  },
};

export default defineModule({
  state: initialState,
  getters: getters,
  mutations: mutations,
  actions: actions,
});
