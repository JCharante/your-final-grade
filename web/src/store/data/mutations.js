import Vue from 'vue';

export function setClass(state, [{ id }, classObj]) {
    Vue.set(state.classes, id, classObj);
}
