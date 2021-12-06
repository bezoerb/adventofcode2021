const { run, ask, answer } = require('../lib/utils');

const commonBits = (arr, target) =>
  arr
    .reduce((result, row) => {
      row.forEach((num, index) => {
        result[index] += num;
      });

      return result;
    }, Array(arr[0].length).fill(0))
    .map((num) => (num >= arr.length / 2 ? target : Math.abs(target - 1)));

const weightedBits = (arr, target, index = 0) => {
  const length = arr[0].length;

  const common = commonBits(arr, target);
  const current = common[index];
  const filtered = arr.filter((item) => item[index] === current);

  if (filtered.length < 2 || index === length - 1) {
    return commonBits(filtered, 1);
  }

  return weightedBits(filtered, target, index + 1);
};

run((input) => {
  const rows = input.split(/[\r\n]/).map((line) => line.split('').map((num) => parseFloat(num)));

  ask('What is the power consumption of the submarine?');

  const gamma = parseInt(commonBits(rows, 1).join(''), 2);
  const epsilon = parseInt(commonBits(rows, 0).join(''), 2);

  answer(gamma * epsilon);

  ask('What is the life support rating of the submarine?');
  const oxygen = parseInt(weightedBits(rows, 1).join(''), 2);
  const co2 = parseInt(weightedBits(rows, 0).join(''), 2);
  answer(oxygen * co2);
});
