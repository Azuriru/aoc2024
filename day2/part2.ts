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
                if (state.strike > 1) return state;

                const { previous, flux, strike } = state;
                const difference = current - previous;

                // First run
                if (!index) return {
                    strike,
                    previous: current,
                    flux: 0
                };

                if (Math.abs(difference) < 1 || Math.abs(difference) > 3) return {
                    strike: strike + 1,
                    // Does matter now
                    previous,
                    flux
                };

                if (!flux) return {
                    strike,
                    previous: current,
                    // Positive if ascending
                    flux: difference > 0 ? 1 : -1
                };

                if (flux === 1) return {
                    strike: strike + Number(difference < 0),
                    previous: current,
                    flux: 1
                };

                return {
                    strike: strike + Number(difference > 0),
                    previous: current,
                    flux: -1
                };
            }, {
                strike: 0,
                previous: 0,
                flux: 0
            });
    })
    .reduce((previous, { strike }) => {
        return previous + Number(strike < 2);
    }, 0);

console.log('Safe reports:', reports);