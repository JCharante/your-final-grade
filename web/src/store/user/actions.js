import { LocalStorage } from 'quasar';
import { axiosInstance } from '../../boot/axios';


export function saveUserStore({ state }) {
    LocalStorage.set('vuex-store-user', state);
}

export function logout({ commit }) {
    return new Promise((resolve, reject) => {
        localStorage.clear();
        commit('setSessionKey', '');
        commit('setDisplayName', '');
        resolve();
    });
}

export function login({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

export function setDisplayName({ commit, dispatch }, { displayName }) {
    localStorage.setItem('displayName', displayName);
    commit('setDisplayName', displayName);
    dispatch('saveUserStore');
}

export function setSessionDoc({ commit, dispatch }, { sessionKey }) {
    localStorage.setItem('sessionKey', sessionKey);
    commit('setSessionKey', sessionKey);
    dispatch('saveUserStore');
}

export function setLocale({ commit, dispatch }, { locale }) {
    commit('setLocale', locale);
    dispatch('saveUserStore');
}
