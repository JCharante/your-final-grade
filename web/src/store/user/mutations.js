import Vue from 'vue';

export function setSessionKey(state, val) {
    Vue.set(state, 'sessionKey', val);
}

export function setDisplayName(state, val) {
    Vue.set(state, 'displayName', val);
}

export function setLocale(state, val) {
    Vue.set(state, 'locale', val);
}

export function setDarkModeEnabled(state, val) {
    Vue.set(state, 'darkModeEnabled', val);
}

export function setEnableOnlineSync(state, val) {
    Vue.set(state, 'enableOnlineSync', val);
}

export function recoverUserFromAnotherStore(state, otherStore) {
    Vue.set(state, 'darkModeEnabled', otherStore.darkModeEnabled);
    Vue.set(state, 'enableOnlineSync', otherStore.enableOnlineSync);
    Vue.set(state, 'locale', otherStore.locale);
}
