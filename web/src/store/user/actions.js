import { LocalStorage } from 'quasar';
import { axiosInstance } from '../../boot/axios';


export function saveUserStore({ state }) {
    LocalStorage.set('vuex-store-user', state);
}

export function userLogout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
        commit('setSessionKey', '');
        commit('setDisplayName', '');
        dispatch('saveUserStore');
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
    dispatch('smartUploadDataStore');
}

export function setDarkModeEnabled({ commit, dispatch }, { enabled }) {
    commit('setDarkModeEnabled', enabled);
    dispatch('smartUploadDataStore');
}

export function setEnableOnlineSync({ commit }, { enabled }) {
    commit('setEnableOnlineSync', enabled);
}
