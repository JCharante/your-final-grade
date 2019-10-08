import { LocalStorage } from "quasar";

export function saveAppStore({ state }) {
    LocalStorage.set('vuex-store-app', state);
}

export function setPageTitle({ commit }, { name }) {
    return new Promise((resolve, reject) => {
        commit('setPageTitle', { name });
        resolve();
    });
}
