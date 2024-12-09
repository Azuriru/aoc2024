import fs from 'fs';
import path from 'path';

const entry = path.join(__dirname, 'input.txt');
const input = fs.readFileSync(entry, { encoding: 'utf8' });

const wordsearch = input.trim();

const rows = wordsearch.split('\n');
const columns = Array(rows[0].length - 1).fill(null).map((_, colIndex) => {
    return Array(rows.length).fill(null).map((__, rowIndex) => {
        return rows[rowIndex][colIndex];
    }).join('');
});

const rowForward = rows
    .map((row) => row.match(/XMAS/g))
    .filter(Boolean)
    // No, it can't be undefined I fucking filtered it shut up
    .reduce((count, found) => count + found!.length, 0);

const rowReverse = rows
    .map((row) => row.match(/SAMX/g))
    .filter(Boolean)
    .reduce((count, found) => count + found!.length, 0);

const columnForward = columns
    .map((col) => col.match(/XMAS/g))
    .filter(Boolean)
    .reduce((count, found) => count + found!.length, 0);

const columnReverse = columns
    .map((col) => col.match(/SAMX/g))
    .filter(Boolean)
    .reduce((count, found) => count + found!.length, 0);
