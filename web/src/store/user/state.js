import { LocalStorage } from 'quasar';

function baseGen() {
    return {
        displayName: '',
        sessionKey: '',
        locale: 'en-us',
        darkModeEnabled: false,
        enableOnlineSync: true,
    };
}

let stored = {};
if (LocalStorage.has('vuex-store-user')) {
    stored = LocalStorage.getItem('vuex-store-user');
}

export default Object.assign(baseGen(), stored);
