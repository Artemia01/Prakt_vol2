import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state: {
    count: 0,
    isWhite: true,
  },
  plugins: [createPersistedState()],
  mutations: {
    setCount: (state, count) => (state.count = count),
    changeTheme: (state, isWhite) => (state.isWhite = isWhite),
  },
  getters: {
    getCount: (state) => {
      return state.count;
    },
    getTheme: (state) => {
      return state.isWhite;
    },
  },
});
export default store;
