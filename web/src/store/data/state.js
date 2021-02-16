import { LocalStorage } from "quasar";

function baseGen() {
    return {
        classes: {
            "602acf09074cc3ec52834c89": {
                id: "602acf09074cc3ec52834c89", name: "Example Class", categories: { "602acf1b56bd09a02f2d7ce3": { id: "602acf1b56bd09a02f2d7ce3", name: "Quizzes", weight: 45, buildUp: true, maxPoints: 0, droppedGrades: 1, maxPercent: 45, topWorthMoreEnabled: false, topWorthMore: 0, topWorthValue: 0, botWorthValue: 0 }, "602ad00cbc98a4de4e5d44c7": { id: "602ad00cbc98a4de4e5d44c7", name: "Midterm Exam", weight: 20, buildUp: true, maxPoints: 0, droppedGrades: 0, maxPercent: 20, topWorthMoreEnabled: false, topWorthMore: 0, topWorthValue: 0, botWorthValue: 0 }, "602ad01882e308141f42756a": { id: "602ad01882e308141f42756a", name: "Final Exam", weight: 25, buildUp: true, maxPoints: 0, droppedGrades: 0, maxPercent: 25, topWorthMoreEnabled: false, topWorthMore: 0, topWorthValue: 0, botWorthValue: 0 }, "602ad038056b26907e3a8c80": { id: "602ad038056b26907e3a8c80", name: "Attendance", weight: 10, buildUp: true, maxPoints: 0, droppedGrades: 0, maxPercent: 10, topWorthMoreEnabled: false, topWorthMore: 0, topWorthValue: 0, botWorthValue: 0 } }, grades: { "602acfe35ba5489131ce2afd": { id: "602acfe35ba5489131ce2afd", classid: "602acf09074cc3ec52834c89", categoryId: "602acf1b56bd09a02f2d7ce3", name: "Quiz 1", maxPoints: 100, pointsEarned: 82, possibleExtraCredit: 0, notYetGraded: false }, "602acfedc8c7fc3b865a8c19": { id: "602acfedc8c7fc3b865a8c19", classid: "602acf09074cc3ec52834c89", categoryId: "602acf1b56bd09a02f2d7ce3", name: "Quiz 2", maxPoints: 100, pointsEarned: 95, possibleExtraCredit: 0, notYetGraded: false }, "602acff9f462ba3c7a7336f3": { id: "602acff9f462ba3c7a7336f3", classid: "602acf09074cc3ec52834c89", categoryId: "602acf1b56bd09a02f2d7ce3", name: "Quiz 3", maxPoints: 100, pointsEarned: 90, possibleExtraCredit: 0, notYetGraded: false }, "602acfffdf990122f593585d": { id: "602acfffdf990122f593585d", classid: "602acf09074cc3ec52834c89", categoryId: "602acf1b56bd09a02f2d7ce3", name: "Quiz 4", maxPoints: 100, pointsEarned: 0, possibleExtraCredit: 0, notYetGraded: true }, "602ad0048f3faacf7e216848": { id: "602ad0048f3faacf7e216848", classid: "602acf09074cc3ec52834c89", categoryId: "602acf1b56bd09a02f2d7ce3", name: "Quiz 5", maxPoints: 100, pointsEarned: 0, possibleExtraCredit: 0, notYetGraded: true }, "602ad021e20a7209f9ecf56a": { id: "602ad021e20a7209f9ecf56a", classid: "602acf09074cc3ec52834c89", categoryId: "602ad00cbc98a4de4e5d44c7", name: "Exam", maxPoints: 100, pointsEarned: 87, possibleExtraCredit: 0, notYetGraded: false } },
            },
        },
    };
}

let stored = {};
if (LocalStorage.has('vuex-store-data')) {
    stored = LocalStorage.getItem('vuex-store-data');
}

export default Object.assign(baseGen(), stored);
