import { LocalStorage } from "quasar";

export function appLogout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
        dispatch('saveAppStore');
        resolve();
    });
}

export function saveAppStore({ state }) {
    LocalStorage.set('vuex-store-app', state);
}

export function setPageTitle({ commit }, { name }) {
    return new Promise((resolve, reject) => {
        commit('setPageTitle', { name });
        resolve();
    });
}
