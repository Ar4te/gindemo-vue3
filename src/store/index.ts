import { createStore } from 'vuex';

export default createStore({
  state: {
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    colors: [
      {
        name: 'Gray',
        color: '#545c64',
      },
      {
        name: 'Blue',
        color: '#126bae',
      },
      {
        name: 'Red',
        color: '#c04851',
      },
      {
        name: 'Green',
        color: '#579572',
      },
      {
        name: 'Black',
        color: '#000000',
      },
    ],
    currentThemeColor: localStorage.getItem('currentThemeColor') && localStorage.getItem('currentThemeColorName') ? {
      name: localStorage.getItem('currentThemeColorName'),
      color: localStorage.getItem('currentThemeColor'),
    } : {
      name: 'Blue',
      color: '#126bae',
    },
  },
  getters: {
    getColorNames(state) {
      return state.colors.map(r => r.name);
    }
  },
  mutations: {
    changeLogin(state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
    },
    changeCurrentThemeColor(state, color) {
      state.currentThemeColor = color;
      localStorage.setItem('currentThemeColor', color.color);
      localStorage.setItem('currentThemeColorName', color.name);
    },
  },
  actions: {
    commitCurrentThemeColor(store, color) {
      store.commit('changeCurrentThemeColor', color);
    },
  },
  modules: {
  },
});
