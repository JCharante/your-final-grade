import Vue from 'vue';

export function setClass(state, [{ id }, classObj]) {
    Vue.set(state.classes, id, classObj);
}

export function setCategory(state, [{ classid }, { id }, category]) {
    if (classid in state.classes) {
        Vue.set(state.classes[classid].categories, id, category);
    }
}

export function setGrade(state, [{ classid }, { id }, grade]) {
    if (classid in state.classes) {
        Vue.set(state.classes[classid].grades, id, grade);
    }
}

export function setClassName(state, [{ classid }, { name }]) {
    if (classid in state.classes) {
        Vue.set(state.classes[classid], 'name', name);
    }
}

export function deleteGrade(state, [{ classid }, { id }]) {
    if (classid in state.classes) {
        Vue.delete(state.classes[classid].grades, id);
    }
}
