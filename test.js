const fs = require('fs');
const statistics = require('./statistics.txt');
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '.' + mm + '.' + yyyy;


items = [
    { date: "4.12.2021", overall: 1243, rejected: 69, unvaccinated: 45, infected: 24 },
    { date: "5.12.2021", overall: 1423, rejected: 34, unvaccinated: 22, infected: 12 },
    { date: "6.12.2021", overall: 4124, rejected: 23, unvaccinated: 12, infected: 11 },
    { date: "7.12.2021", overall: 2313, rejected: 67, unvaccinated: 21, infected: 46 },
    { date: "8.12.2021", overall: 2342, rejected: 24, unvaccinated: 23, infected: 1 },
    { date: "9.12.2021", overall: 4123, rejected: 64, unvaccinated: 11, infected: 53 },
    { date: "10.12.2021", overall: 1234, rejected: 75, unvaccinated: 12, infected: 63 },
    { date: "11.12.2021", overall: 1243, rejected: 86, unvaccinated: 22, infected: 64 },
    { date: "12.12.2021", overall: 1333, rejected: 68, unvaccinated: 32, infected: 36 },
    { date: "13.12.2021", overall: 3322, rejected: 58, unvaccinated: 8, infected: 50 },
]


function checkIfToday(today){
    var tempData = getData();
    if (tempData[tempData.length-1].date.toString() != today){
        tempData.push({ date: today, overall: 0, rejected: 0, unvaccinated: 0, infected: 0 });
        saveData(tempData);
    }
}

function saveData(data) {
    fs.writeFileSync('statistics.txt', JSON.stringify(data));
}

function getData() {
    return JSON.parse(fs.readFileSync('statistics.txt'))
};






