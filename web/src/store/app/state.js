import { LocalStorage } from "quasar";

function baseGen() {
    return {
        pageTitle: 'Your Final Grade',
    };
}

let stored = {};
if (LocalStorage.has('vuex-store-app')) {
    stored = LocalStorage.getItem('vuex-store-app');
}

export default Object.assign(baseGen(), stored);
