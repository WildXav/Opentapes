import { defineModule } from "direct-vuex";
import { Mixtape } from "@/models/mixtape";
import { ActionContext } from "vuex";
import { rootActionContext } from "@/store";
import { MixtapeService } from "@/services/mixtape-service";

interface BrowsingState {
  featured: Array<Mixtape>;
}

const initialState: BrowsingState = {
  featured: [],
};

const getters = {
  featured: (state: BrowsingState): Array<Mixtape> => {
    return state.featured;
  },
};

enum Mutations {
  FETCH_FEATURED = "FETCH_FEATURED",
}

const mutations = {
  [Mutations.FETCH_FEATURED]: (
    state: BrowsingState,
    featured: Array<Mixtape>
  ) => {
    state.featured = featured;
  },
};

const actions = {
  async fetchFeatured(
    context: ActionContext<BrowsingState, unknown>
  ): Promise<void> {
    const { rootState } = rootActionContext(context);
    const session = rootState.core.session;
    // TODO: better error handling
    if (!session) {
      console.log("not ready");
      return;
    }

    const featured = await MixtapeService.fetchFeatured(session);
    context.commit(Mutations.FETCH_FEATURED, featured);
  },
};

export default defineModule({
  state: initialState,
  getters: getters,
  mutations: mutations,
  actions: actions,
});
