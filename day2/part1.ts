import fs from 'fs';
import path from 'path';

const entry = path.join(__dirname, 'input.txt');
const input = fs.readFileSync(entry, { encoding: 'utf8' });

const reports = input
    .split('\n')
    .map((report) => {
        return report
            .split(' ')
            .map(Number)
            .reduce((state, current, index) => {
                if (!state.safe) return state;

                const { previous, flux } = state;
                const difference = current - previous;

                // First run
                if (!index) return {
                    safe: true,
                    previous: current,
                    flux: 0
                };

                if (Math.abs(difference) < 1 || Math.abs(difference) > 3) return {
                    safe: false,
                    // Doesn't matter anymore idt
                    previous,
                    flux
                };

                if (!flux) return {
                    safe: true,
                    previous: current,
                    // Positive if ascending
                    flux: difference > 0 ? 1 : -1
                };

                if (flux === 1) return {
                    safe: difference > 0,
                    previous: current,
                    flux: 1
                };

                return {
                    safe: difference < 0,
                    previous: current,
                    flux: -1
                };
            }, {
                safe: true,
                previous: 0,
                flux: 0
            });
    })
    .reduce((previous, { safe }) => {
        return previous + Number(safe);
    }, 0);

console.log('Safe reports:', reports);