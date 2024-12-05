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
        .split(/\s+/g)
        .map(Number);

    leftList.push(left);
    rightList.push(right);
}

for (let i = 0; i < leftList.length; i++) {
    const initial = leftList[i];
    const appearances = rightList.filter((v) => v === initial).length;

    diffList.push(initial * appearances);
}

console.log(
    'Total difference:',
    diffList.reduce((c, v) => c + v)
);