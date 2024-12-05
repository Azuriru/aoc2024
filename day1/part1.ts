import fs from 'fs';
import path from 'path';

const input = path.join(__dirname, 'input.txt');
const columns = fs.readFileSync(input, { encoding: 'utf8' });

const leftList: number[] = [];
const rightList: number[] = [];
const diffList: number[] = [];

for (const row of columns.split('\n')) {
    const [left, right] = row
        .trim()
        .replace(/\s+/g, '|')
        .split('|')
        .map(Number);

    leftList.push(left);
    rightList.push(right);
}

leftList.sort();
rightList.sort();

for (let i = 0; i < leftList.length; i++) {
    diffList.push(Math.abs(leftList[i] - rightList[i]));
}

console.log(
    'Total difference:',
    diffList.reduce((c, v) => c + v)
);