const { run, ask, answer } = require('../lib/utils');

run((input) => {
  const rows = input.split(/[\r\n]/).map((line) => line.split('').map((num) => parseFloat(num)));

  ask('What is the power consumption of the submarine?');

  const temp = rows.reduce((result, row) => {
    row.forEach((num, index) => {
      result[index] += num;
    });

    return result;
  }, Array(rows[0].length).fill(0));

  const gamma = parseInt(temp.map((num) => (num > rows.length / 2 ? 1 : 0)).join(''), 2);
  const epsilon = parseInt(temp.map((num) => (num > rows.length / 2 ? 0 : 1)).join(''), 2);

  answer(gamma * epsilon);
});
