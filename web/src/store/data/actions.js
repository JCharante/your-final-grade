import { baseClass } from "./def";

export function addClass({ commit, state }, { name }) {
    return new Promise((resolve, reject) => {
        // check is there is a class with the same name
        if (Object.values(state.classes).filter(c => c.name === name).length === 0) {
            reject('You may not have a class with the same name');
        }
        // create our new class object
        const newClass = baseClass();
        newClass.name = name;
        commit('setClass', newClass, newClass);
        resolve();
    });
}
