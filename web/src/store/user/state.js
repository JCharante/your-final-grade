import { LocalStorage } from 'quasar';

function baseGen() {
    return {
        displayName: '',
        sessionKey: '',
    };
}

let stored = {};
if (LocalStorage.has('vuex-store-user')) {
    stored = LocalStorage.getItem('vuex-store-user');
    console.log(stored);
}

export default Object.assign(baseGen(), stored);
