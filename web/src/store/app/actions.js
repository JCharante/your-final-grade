export function setPageTitle({ commit }, { name }) {
    return new Promise((resolve, reject) => {
        commit('setPageTitle', { name });
        resolve();
    });
}
