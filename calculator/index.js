class ClassCalculator {
    constructor(data) {
        this.categories = data.categories.map(c => Object.assign({}, c, { grades: data.grades.filter(a => a.category === c.name) }));
        this.grades = data.grades;
    }

    getCurrentGrade(){
        let total = 0;
        this.categories.forEach(element => {
            let cur = this.getCatGrade(element.name,true);
            total += this.maxPercent(element,cur);
        });
        return total;
    }

    /**
     *
     * @param cat A string with the name of the Category
     */
    getCatGrade(cat,reg){
        if (typeof cat === typeof "yo whats up bois I be a string"){
            cat = JSON.parse(JSON.stringify(this.categories.filter(c => c.name === cat)[0]));
        }
        cat = this.dropGrades(cat);
        if (cat.buildUp == true){
            if (cat.topWorthMore){
                cat = this.sortHighestFirst(cat);
                let total = 0;
                let max =  0;
                for (let i = 0; i < cat.topWorthMore && i < cat.grades.length; i++){
                    if (!(cat.grades[i].pointsEarned === undefined)){
                        let cur = cat.grades[i];
                        total += (cur.pointsEarned/cur.maxPoints)*cat.topWorthValue;
                        max += cat.topWorthValue;
                    }
                }
                for (let i = cat.topWorthMore; i < cat.grades.length; i++){
                    if (!(cat.grades[i].pointsEarned === undefined)){
                        let cur = cat.grades[i];
                        total += (cur.pointsEarned/cur.maxPoints)*cat.botWorthValue;
                        max += cat.botWorthValue;
                    }
                }
                let temp = total/max;
                if (max == 0){
                    return 1;
                }
                return total/max;
            }
            let total = 0;
            let max = 0;
            for (let i = 0; i < cat.grades.length; i++){

                if(reg){
                    if (!(cat.grades[i].pointsEarned === undefined) && !cat.grades[i].notYetGraded){
                        let cur = cat.grades[i];
                        //      console.log(cur.pointsEarned);
                        total += cur.pointsEarned;
                        max += cur.maxPoints;
                    }
                } else {
                    if (!(cat.grades[i].pointsEarned === undefined)){
                        let cur = cat.grades[i];
                        //      console.log(cur.pointsEarned);
                        total += cur.pointsEarned;
                        max += cur.maxPoints;
                    }
                }


            }
            if (max == 0){
                return 1;
            }
            //console.log(total);
           ///console.log(max);
            return total/max;
        }

        let currentGrade = cat.maxPoints;
        for (let i = 0; i < cat.grades.length; i++){
            if (!(cat.grades[i].pointsEarned === undefined)){
                currentGrade -= cat.grades[i].maxPoints - cat.grades[i].pointsEarned;
                if (currentGrade < 0){
                    currentGrade = 0;
                }
            }
        }
        if (cat.maxPoints == 0){
            return 1;
        }
        return currentGrade/cat.maxPoints;
    }

    getHighestGrade(){
        let total = 0;
        this.categories.forEach(element => {
            //total += this.getCatHighest(element.name)*element.weight;
            let cur = this.getCatHighest(element.name);
            total += this.maxPercent(element,cur);
        });
        return total;
    }
    /**
     * Return the potential highest score for a category
     * @param cat A string with the name of the Category
     */
    getCatHighest(cat) {
        cat = JSON.parse(JSON.stringify(this.categories.filter(c => c.name === cat)[0]));
        cat.grades.forEach(element =>{
            if (element.pointsEarned === undefined || element.notYetGraded){
                element.pointsEarned = element.maxPoints + (element.possibleExtraScore ? element.possibleExtraScore : 0);
            }
        })
        return this.getCatGrade(cat,false);
    }


    getLowestGrade(){
        let total = 0;
        this.categories.forEach(element => {
            //total += this.getCatLowest(element.name)*element.weight;
            let cur = this.getCatLowest(element.name);
            total += this.maxPercent(element,cur);
        });
        return total;
    }
    /**
     * Return the potential lowest score for a category
     * @param cat A string with the name of the Category
     */
    getCatLowest(cat){
        cat = JSON.parse(JSON.stringify(this.categories.filter(c => c.name === cat)[0]));
        console.log(cat.grades);
        if(cat.grades.length == 0){
           return 0;
        } else {

            cat.grades.forEach(element => {
                if (element.pointsEarned === undefined || element.notYetGraded) {
                    element.pointsEarned = 0;
                }
            })
            return this.getCatGrade(cat, false);
        }
    }


    dropGrades(cat){
        if (cat.droppedGrades){
            cat.grades.sort(function(a, b){
                if (a.pointsEarned === undefined && b.pointsEarned === undefined){
                    return 0;
                }
                else if (a.pointsEarned === undefined){
                    return 1;
                }
                else if (b.pointsEarned === undefined){
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
            cat.grades.splice(0,cat.droppedGrades);
        }
        return cat;
    }

    sortHighestFirst(cat){
        cat.grades.sort(function(a, b){
            if (a.pointsEarned === undefined && b.pointsEarned === undefined){
                return 0;
            }
            else if (a.pointsEarned === undefined){
                return 1;
            }
            else if (b.pointsEarned === undefined){
                return -1;
            }
            if (a.pointsEarned/a.maxPoints > b.pointsEarned/b.maxPoints){
                return -1;
            }
            else if(a.pointsEarned/a.maxPoints < b.pointsEarned/b.maxPoints){
                return 1;
            }
            return 0;
        })
        return cat;
    }

    maxPercent(ele,cur){

        let curTotal = cur*ele.weight;

        // console.log(element.maxPercent);
        if (ele.maxPercent && curTotal > ele.maxPercent){
            curTotal = ele.maxPercent;
        }
        return curTotal;
    }



    getA() {
        return this.data.a;
    }
}



module.exports = {
    ClassCalculator
}
