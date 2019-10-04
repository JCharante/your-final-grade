export function getClassIds(state) {
    return Object.keys(state.classes);
}

export function getClassById(state) {
    return function (classId) {
        return state.classes[classId];
    };
}
