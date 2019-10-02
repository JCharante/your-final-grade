class ClassCalculator {
    constructor(data) {
        this.categories = data.categories.map(c => Object.assign({}, c, { grades: data.grades.filter(a => a.category === c.name) }))
        this.grades = data.grades;
    }

    getCurrentGrade(){
        let total = 0;
        this.categories.forEach(element => {
            total += getCatGrade(element);
        });
        return total;
    }

    /**
     *
     * @param cat A string with the name of the Category
     */
    getCatGrade(cat){
        cat = this.categories.filter(c => c.name === cat)[0];
        if (cat.droppedGrades){
            cat.grades.sort(function(a, b){
                if (!a.pointsEarned && !b.pointsEarned){
                    return 0;
                }
                else if (!a.pointsEarned){
                    return 1;
                }
                else if (!b.pointsEarned){
                    return -1;
                }
                if (a.maxPoints - a.pointsEarned > b.maxPoints - b.pointsEarned){
                    return -1;
                }
                else if(a.maxPoints - a.pointsEarned < b.maxPoints - b.pointsEarned){
                    return 1;
                }
                return 0;
            })
            cat.grades.splice(0,droppedGrades);
        }
        if (cat.buildUp == true){
            
        }
    }


    getHighestGrade(){
        let total = 0;
        this.categories.forEach(element => {
            total += getCatHighest(element);
        });
        return total;
    }
    /**
     *
     * @param cat A string with the name of the Category
     */
    getCatHighest(cat){
        cat = this.categories.filter(c => c.name === cat)[0];
        let losePoints = 0;
        let totalPoints = 0;
        cat.grades.forEach(element => {
            if(element.maxPoints){
                totalPoints += element.pointsEarned;
            }
            if(element.possibleExtraCredit){
                totalPoints += element.possibleExtraCredit;
            }
            if(element.maxPoints && element.pointsEarned) {
                losePoints += element.maxPoints - element.pointsEarned;
            }
        });
        return cat.weight*losePoints/totalPoints
    }
    
    getA() {
        return this.data.a;
    }
}

module.exports = {
    ClassCalculator
}
