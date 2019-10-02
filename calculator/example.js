const { ClassCalculator } = require('./index');

const Chem = new ClassCalculator({
    name: "Chem",
    categories: [{
        name: 'Homework Assignments',
        weight: 50,
        buildUp: true,
        droppedGrades: 1
        //maxPoints: 100
    },
        {
            name: 'Exam',
            weight: 50,
            buildUp: true,
            maxPoints: 100
        }],
    grades: [{
        category: 'Homework Assignments',
        pointsEarned: 10,
        maxPoints: 20,
    },
        {
            category: 'Homework Assignments',
            pointsEarned: 15,
            maxPoints: 20,
        },
        {
            category: 'Homework Assignments',
            pointsEarned: 13,
            maxPoints: 20,
        },
        {
            category: 'Homework Assignments',
            pointsEarned: 12,
            maxPoints: 20,
            possibleExtraScore: 10
        },
        {
            category: 'Homework Assignments',
            maxPoints: 20,
            possibleExtraScore: 0
        },
        {
            category: 'Exam',
            pointsEarned: 70,
            maxPoints: 100,
            possibleExtraScore: 0
        },
        {
            category: 'Exam',
            pointsEarned: 80,
            maxPoints: 100,
            possibleExtraScore: 10
        }
    ]
})

//console.log(Chem.getCurrentGrade('Homework Assignments'));
//console.log(Chem.getHighestGrade('Homework Assignments'));


//console.log(Chem.getCurrentGrade('Exam'));
//console.log(Chem.getHighestGrade('Exam'));
console.log(Chem.getCurrentGrade());

console.log(Chem.getCatHighest('Homework Assignments'));
console.log(Chem.getCatHighest('Exam'));
console.log(Chem.getHighestGrade());

console.log(Chem.getCatLowest('Homework Assignments'));
console.log(Chem.getCatLowest('Exam'));
console.log(Chem.getLowestGrade());
