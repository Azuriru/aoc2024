import fs from 'fs';
import path from 'path';

const entry = path.join(__dirname, 'input.txt');
const input = fs.readFileSync(entry, { encoding: 'utf8' });

const wordsearch = input.trim();
const rows = wordsearch.split('\n');
const match = ['X', 'M', 'A', 'S'];
const directions = Array(8).fill(null).map((_, i) => i); // Don't ask

let appeared = 0;

enum Directions {
    TopLeft,
    Top,
    TopRight,
    Right,
    BottomRight,
    Bottom,
    BottomLeft,
    Left
}

// THIS SHOULD BE [ Y, X ] BUT I HAD TOO LITTLE FORESIGHT
function move(dir: Directions, y: number, x: number): [number, number] {
    switch(dir) {
        case Directions.TopLeft:
            return [x - 1, y - 1];
        case Directions.Top:
            return [x, y - 1];
        case Directions.TopRight:
            return [x + 1, y - 1];
        case Directions.Right:
            return [x + 1, y];
        case Directions.BottomRight:
            return [x + 1, y + 1];
        case Directions.Bottom:
            return [x, y + 1];
        case Directions.BottomLeft:
            return [x - 1, y + 1];
        case Directions.Left:
            return [x - 1, y];
    }
}

function matchDirection(direction: Directions, y: number, x: number) {
    const matched = match.indexOf(rows[y][x]);

    if (matched !== -1) {
        // You completely matched the string
        if (matched === match.length - 1) return appeared++;

        // If not keep looking
        const [xXx, yYy] = move(direction, y, x);
        const scout = rows[yYy]?.[xXx];
        const find = match[matched + 1];

        if (scout && scout === find) {
            matchDirection(direction, yYy, xXx);
        }
    }
}

// Try to get a lead on where to look
function matchSurrounding(y: number, x: number) {
    const matched = match.indexOf(rows[y][x]);

    if (matched !== -1) { // Now it's X
        // Check surrounding for M
        const find = match[matched + 1];

        // I regret using an enum
        // for (const dir of Object.values(Directions).filter((direction) => isNaN(Number(direction)))) {
        //     console.log(Directions[dir]);
        // }

        // Not much better, I will use a const next time.
        for (const dir of directions) {
            const [left, top] = move(dir, y, x);
            const scout = rows[top]?.[left];

            // Looks like it found 'M'
            // So we keep looking in this direction
            if (scout && scout === find) {
                // console.log(rows[y][x], y, x, 'found a match at', top, left, find);
                matchDirection(dir, y, x);
            }
        }
    }
}

for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
        if (rows[y][x] === 'X') {
            matchSurrounding(y, x);
        }
    }
}

console.log(appeared);