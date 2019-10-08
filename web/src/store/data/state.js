import { LocalStorage } from "quasar";

function baseGen() {
    return {
        classes: {},
    };
}

let stored = {};
if (LocalStorage.has('vuex-store-data')) {
    stored = LocalStorage.getItem('vuex-store-data');
}

export default Object.assign(baseGen(), stored);
