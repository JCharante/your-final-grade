import { LocalStorage } from "quasar";
import { axiosInstance } from '../../boot/axios';

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

export function smartUploadDataStore({ dispatch, getters }) {
    return new Promise((resolve, reject) => {
        if (getters.getSessionKey.length === 0 // no session key stored
            || getters.getSessionKey === 'unregistered' // user is on demo account
            || !getters.getEnableOnlineSync) { // user has disabled online sync
            resolve();
            return;
        }
        dispatch('uploadDataStore');
        resolve();
    });
}

export function uploadDataStore({ rootState, getters }) {
    return new Promise((resolve, reject) => {
        if (getters.getSessionKey.length === 0 || getters.getSessionKey === 'unregistered') {
            reject();
            return;
        }
        axiosInstance.post('/', {
            sessionKey: getters.getSessionKey,
            requestType: 'updateStore',
            dataStore: {
                app: rootState.app,
                data: rootState.data,
                user: rootState.user,
            },
        })
            .then(resolve())
            .catch((err) => {
                reject(err);
            });
    });
}

export function smartRetrieveDataStore({ dispatch, getters }) {
    return new Promise((resolve, reject) => {
        if (getters.getSessionKey.length === 0 // no session key stored
            || getters.getSessionKey === 'unregistered' // user is on demo account
            || !getters.getEnableOnlineSync) { // user has disabled online sync
            resolve();
            return;
        }
        dispatch('retrieveDataStore');
        resolve();
    });
}

export function retrieveDataStore({ commit, dispatch, getters }) {
    return new Promise((resolve, reject) => {
        if (getters.getSessionKey.length === 0 || getters.getSessionKey === 'unregistered') {
            reject();
            return;
        }
        axiosInstance.post('/', {
            sessionKey: getters.getSessionKey,
            requestType: 'getStore',
        })
            .then((response) => {
                console.log(response);
                const { data, app, user } = response.data.dataStore;
                commit('recoverDataFromAnotherStore', data);
                commit('recoverUserFromAnotherStore', user);
                resolve();
            })
            .catch(err => reject(err));
    });
}
