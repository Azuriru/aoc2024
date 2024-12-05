import fs from 'fs';
import path from 'path';

const entry = path.join(__dirname, 'input.txt');
const input = fs.readFileSync(entry, { encoding: 'utf8' });

const memory = input.trim();

const total = memory
    .match(/mul\([0-9]{1,3}\,[0-9]{1,3}\)/g)
    ?.map((str) => {
        const instruct = str.match(/([0-9]{1,3})\,([0-9]{1,3})/g)?.[0].split(',').map(Number);

        if (instruct) {
            const [x, y] = instruct;

            return x * y;
        }

        return 0;
    })
    .reduce((c, v) => c + v);

console.log(total);