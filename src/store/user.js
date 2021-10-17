import { auth } from "../firebase.js";

const state = {
  user: null,
};

const getters = {};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
};

const actions = {
  getCurrentUser() {
    return new Promise((resolve, reject) => {
      const unsubcribe = auth.onAuthStateChanged(
        (user) => {
          unsubcribe();
          resolve(user);
        },
        () => {
          reject();
        }
      );
    });
  },

  async updateProfile({ commit }, { name, email, password }) {
    const user = auth.currentUser;

    if (name) {
      await user.updateProfile({
        displayName: name,
      });
    }

    if (email) {
      await user.updateEmail(email);
    }

    if (password) {
      await user.updatePassword(password);
    }

    commit("setUser", user);
  },

  async doLogin({ commit }, { email, password }) {
    await auth.signInWithEmailAndPassword(email, password);
    commit("setUser", auth.currentUser);
  },
  async doRegister({ commit }, { name, email, password }) {
    await auth.createUserWithEmailAndPassword(email, password);
    const user = auth.currentUser;
    await user.updateProfile({
      displayName: name,
    });
    commit("setUser", user);
  },
  async doLogout({ commit }) {
    await auth.signOut();
    commit("setUser", null);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
