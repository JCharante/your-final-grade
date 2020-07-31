/*
    Credit for mongObjectId() goes to https://gist.github.com/solenoid/1372386
 */
export function mongoObjectId() {
    // eslint-disable-next-line no-bitwise
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
        // eslint-disable-next-line no-bitwise
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
}

export function baseClass() {
    return {
        id: mongoObjectId(),
        name: '',
        categories: {},
        grades: {},
    };
}

export function baseCategory() {
    return {
        name: '', // string
        weight: 0, // int from 0 -100
        buildUp: true, // bool
        maxPoints: 0, // (optional) (in iff buildUp is false)
        droppedGrades: 0, // (optional)
        maxPercent: 0, // (optional)
        topWorthMore: 0, // (optinal) int (can't be in if buildUp is false)
        topWorthValue: 0, // (optional) int (only in if topWorthMore is in)
        botWorthValue: 0, // (optional) int (only in if topWorthMore is in)
    };
}

export function baseGrade() {
    return {
        category: '', // string
        name: '', // string
        maxPoints: 0, // int
        pointsEarned: 0, // (optional) int
        possibleExtraCredit: 0, // int
    };
}
