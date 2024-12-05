import fs from 'fs';
import path from 'path';

const entry = path.join(__dirname, 'input.txt');
const input = fs.readFileSync(entry, { encoding: 'utf8' });

function isSafeLeap(ascending: boolean, difference: number) {
    if (ascending) return difference < 0;

    return difference > 0;
}

function getReportStatus(report: number[]) {
    let ascending: boolean | null = null;
    let index = 0;
    let max = report.length;

    while (index < max - 1) {
        const difference = report[index] - report[index + 1];

        if (Math.abs(difference) < 1 || Math.abs(difference) > 3) return false;

        if (ascending === null) ascending = difference < 0;

        if (!isSafeLeap(ascending, difference)) return false;

        index++;
    }

    return true;
}

function getAllReportStatus(report: number[]) {
    if (getReportStatus(report)) return true;

    // I was going to check by value, but I really
    // would be fucked if there were duplicate values
    const possibilities = report.map((_, index, report) => {
        return report.filter((_, currentIndex) => currentIndex !== index);
    });

    return possibilities.some(getReportStatus);
}

const reports = input
    .split('\n')
    .map((report) => {
        return report
            .split(' ')
            .map(Number);
    })
    .map(getAllReportStatus)
    .reduce((c, v) => c + Number(v), 0);

console.log('Safe reports:', reports);