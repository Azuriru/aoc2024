import fs from 'fs';
import path from 'path';

const entry = path.join(__dirname, 'input.txt');
const input = fs.readFileSync(entry, { encoding: 'utf8' });

const memory = input.trim();

let mul = true;
const total = memory
    .match(/(mul\(\d{1,3}\,\d{1,3}\))|(do\(\))|(don\'t\(\))/g)
    ?.reduce((bytes, instruct) => {
        switch(instruct) {
            case 'don\'t()':
                mul = false;

                return bytes;
            case 'do()':
                mul = true;

                return bytes;
            default:
                if (!mul) return bytes;
                const [x, y] = instruct.match(/(\d{1,3})/g)!.map(Number) as [ number, number ];

                return bytes + x * y;
        }
    }, 0);

console.log(total);