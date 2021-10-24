import store from "@/store";
import { defineModule } from "direct-vuex";
import { Album } from "@/models/album";
import { ActionContext } from "vuex";
import { BrowsingService } from "@/services/browsing-service";
import { MMSession } from "@/models/backend/mm-session";
import { CONFIG } from "@/config";
import { Single } from "@/models/single";

interface BrowsingState {
  featured: Array<Album>;
  latest: Array<Album>;
  latestPageIndex: number;
  trendingTapes: Array<Album>;
  trendingTapesPageIndex: number;
  greatestTapes: Array<Album>;
  greatestTapesPageIndex: number;
  trendingSingles: Array<Single>;
  trendingSinglesPageIndex: number;
  greatestSingles: Array<Single>;
  greatestSinglesPageIndex: number;
}

const initialState: BrowsingState = {
  featured: [],
  latest: [],
  latestPageIndex: 0,
  trendingTapes: [],
  trendingTapesPageIndex: 0,
  greatestTapes: [],
  greatestTapesPageIndex: 0,
  trendingSingles: [],
  trendingSinglesPageIndex: 0,
  greatestSingles: [],
  greatestSinglesPageIndex: 0,
};

const getters = {
  featured: (state: BrowsingState): Array<Album> => {
    return state.featured;
  },
  latest: (state: BrowsingState): Array<Album> => {
    return state.latest;
  },
  trendingTapes: (state: BrowsingState): Array<Album> => {
    return state.trendingTapes;
  },
  greatestTapes: (state: BrowsingState): Array<Album> => {
    return state.greatestTapes;
  },
  trendingSingles: (state: BrowsingState): Array<Single> => {
    return state.trendingSingles;
  },
  greatestSingles: (state: BrowsingState): Array<Single> => {
    return state.greatestSingles;
  },
};

enum Mutations {
  FETCH_FEATURED = "FETCH_FEATURED",
  FETCH_LATEST = "FETCH_LATEST",
  FETCH_TRENDING_TAPES = "FETCH_TRENDING_TAPES",
  FETCH_GREATEST_TAPES = "FETCH_GREATEST_TAPES",
  FETCH_TRENDING_SINGLES = "FETCH_TRENDING_SINGLES",
  FETCH_GREATEST_SINGLES = "FETCH_GREATEST_SINGLES",
  RESET = "RESET",
}

const mutations = {
  [Mutations.FETCH_FEATURED]: (
    state: BrowsingState,
    featured: Array<Album>
  ) => {
    state.featured = featured;
  },

  [Mutations.FETCH_LATEST]: (state: BrowsingState, latest: Array<Album>) => {
    state.latest.push(...latest);
    state.latestPageIndex++;
  },

  [Mutations.FETCH_TRENDING_TAPES]: (
    state: BrowsingState,
    trendingTapes: Array<Album>
  ) => {
    state.trendingTapes.push(...trendingTapes);
    state.trendingTapesPageIndex++;
  },

  [Mutations.FETCH_GREATEST_TAPES]: (
    state: BrowsingState,
    greatestTapes: Array<Album>
  ) => {
    state.greatestTapes.push(...greatestTapes);
    state.greatestTapesPageIndex++;
  },

  [Mutations.FETCH_TRENDING_SINGLES]: (
    state: BrowsingState,
    trendingSingles: Array<Single>
  ) => {
    state.trendingSingles.push(...trendingSingles);
    state.trendingSinglesPageIndex++;
  },

  [Mutations.FETCH_GREATEST_SINGLES]: (
    state: BrowsingState,
    greatestSingles: Array<Single>
  ) => {
    state.greatestSingles.push(...greatestSingles);
    state.greatestSinglesPageIndex++;
  },

  [Mutations.RESET]: (state: BrowsingState) => {
    state.featured = [];
    state.latest = [];
    state.latestPageIndex = 0;
    state.trendingTapes = [];
    state.trendingTapesPageIndex = 0;
    state.greatestTapes = [];
    state.greatestTapesPageIndex = 0;
    state.trendingSingles = [];
    state.trendingSinglesPageIndex = 0;
    state.greatestSingles = [];
    state.greatestSinglesPageIndex = 0;
  },
};

const actions = {
  async fetchFeatured(
    context: ActionContext<BrowsingState, unknown>,
    session: MMSession
  ): Promise<void> {
    const featured = await BrowsingService.fetchFeatured(session, () =>
      store.dispatch.fetchFeatured(session)
    );
    context.commit(Mutations.FETCH_FEATURED, featured);
  },

  async fetchLatest(
    context: ActionContext<BrowsingState, unknown>,
    session: MMSession
  ): Promise<void> {
    const latest = await BrowsingService.fetchLatest(
      session,
      context.state.latestPageIndex + 1,
      CONFIG.fetchingSize,
      () => store.dispatch.fetchLatest(session)
    );
    context.commit(Mutations.FETCH_LATEST, latest);
  },

  async fetchTrendingTapes(
    context: ActionContext<BrowsingState, unknown>,
    session: MMSession
  ): Promise<void> {
    const trending = await BrowsingService.fetchTrendingTapes(
      session,
      context.state.trendingTapesPageIndex + 1,
      CONFIG.fetchingSize,
      () => store.dispatch.fetchTrendingTapes(session)
    );
    context.commit(Mutations.FETCH_TRENDING_TAPES, trending);
  },

  async fetchGreatestTapes(
    context: ActionContext<BrowsingState, unknown>,
    session: MMSession
  ): Promise<void> {
    const greatest = await BrowsingService.fetchGreatestTapes(
      session,
      context.state.greatestTapesPageIndex + 1,
      CONFIG.fetchingSize,
      () => store.dispatch.fetchGreatestTapes(session)
    );
    context.commit(Mutations.FETCH_GREATEST_TAPES, greatest);
  },

  async fetchTrendingSingles(
    context: ActionContext<BrowsingState, unknown>,
    session: MMSession
  ): Promise<void> {
    const trending = await BrowsingService.fetchTrendingSingles(
      session,
      context.state.trendingSinglesPageIndex + 1,
      CONFIG.fetchingSize,
      () => store.dispatch.fetchTrendingSingles(session)
    );
    context.commit(Mutations.FETCH_TRENDING_SINGLES, trending);
  },

  async fetchGreatestSingles(
    context: ActionContext<BrowsingState, unknown>,
    session: MMSession
  ): Promise<void> {
    const greatest = await BrowsingService.fetchGreatestSingles(
      session,
      context.state.greatestSinglesPageIndex + 1,
      CONFIG.fetchingSize,
      () => store.dispatch.fetchGreatestSingles(session)
    );
    context.commit(Mutations.FETCH_GREATEST_SINGLES, greatest);
  },

  resetBrowsingState(context: ActionContext<BrowsingState, unknown>): void {
    context.commit(Mutations.RESET);
  },
};

export default defineModule({
  state: initialState,
  getters: getters,
  mutations: mutations,
  actions: actions,
});
