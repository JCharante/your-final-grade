export function getSessionKey(state) {
    return state.sessionKey;
}

export function getDisplayName(state) {
    return state.displayName;
}

export function isProbablySignedIn(state) {
    return state.sessionKey.length > 0;
}

export function getLocale(state) {
    return state.locale;
}

export function getDarkModeEnabled(state) {
    return state.darkModeEnabled;
}

export function getEnableOnlineSync(state) {
    return state.enableOnlineSync;
}
