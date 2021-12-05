const { run, ask, answer } = require('../lib/utils');
const { sum } = require('../lib/array');

run((input) => {
  const [first, ...rows] = input.split(/[\r\n]/).map((num) => parseFloat(num));

  const [, count, windows] = rows.reduce(
    ([last, count, windows], current, index) => {
      const currentWindow = [current];
      for (let i = Math.max(index - 1, 0); i <= index; i++) {
        windows[i] = [...(windows[i] || []), current];
      }

      return [current, current > last ? count + 1 : count, [...windows, currentWindow]];
    },
    [first, 0, [[first]]]
  );

  ask('How many measurements are larger than the previous measurement?');
  answer(count);

  ask('How many sums are larger than the previous sum?');
  const [firstSum, ...sums] = windows.filter((window) => window.length === 3).map((window) => sum(window));
  const [, countSum] = sums.reduce(
    ([last, count], current) => {
      return [current, current > last ? count + 1 : count];
    },
    [firstSum, 0]
  );

  answer(countSum);
});
