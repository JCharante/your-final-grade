import { LocalStorage } from "quasar";
import { baseClass, mongoObjectId } from "./def";

export function saveDataStore({ state }) {
    LocalStorage.set('vuex-store-data', state);
}

export function addClass({ commit, state }, { name }) {
    return new Promise((resolve, reject) => {
        // check is there is a class with the same name
        if (Object.values(state.classes).filter(c => c.name === name).length > 0) {
            reject('You may not have a class with the same name');
            return;
        }
        // create our new class object
        const newClass = baseClass();
        newClass.name = name;
        commit('setClass', [newClass, newClass]);
        resolve();
    });
}

export function addCategory({ commit }, [{ classid }, categoryObj]) {
    return new Promise((resolve, reject) => {
        if (!('id' in categoryObj)) {
            categoryObj.id = mongoObjectId();
        }
        commit('setCategory', [{ classid }, categoryObj, categoryObj]);
        resolve(categoryObj.id);
    });
}

export function modifyCategory({ commit }, [{ classid, id }, categoryObj]) {
    return new Promise((resolve, reject) => {
        commit('setCategory', [{ classid }, { id }, categoryObj]);
        resolve();
    });
}

export function setGrade({ commit }, [{ classid, id }, gradeObj]) {
    return new Promise((resolve, reject) => {
        commit('setGrade', [{ classid }, { id }, gradeObj]);
        resolve();
    });
}
