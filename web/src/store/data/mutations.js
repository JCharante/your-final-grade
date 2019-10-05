import Vue from 'vue';

export function setClass(state, [{ id }, classObj]) {
    Vue.set(state.classes, id, classObj);
}

export function setCategory(state, [{ classid }, { id }, category]) {
    if (classid in state.classes) {
        Vue.set(state.classes[classid].categories, id, category);
    }
}
