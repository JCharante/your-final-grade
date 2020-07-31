import { baseCategory, baseGrade } from "./def";

export function getClassIds(state) {
    return Object.keys(state.classes);
}

export function getClassById(state) {
    return function (classId) {
        return state.classes[classId];
    };
}

export function getCategoryByClassAndCategoryId(state) {
    return function (classId, categoryId) {
        return Object.assign({}, baseCategory(), state.classes[classId].categories[categoryId]);
    };
}

export function getGradeByClassAndGradeId(state) {
    return function (classId, gradeId) {
        return Object.assign(
            {},
            baseGrade(),
            state.classes[classId].grades[gradeId],
        );
    };
}
