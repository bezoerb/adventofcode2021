const { run, ask, answer } = require('../lib/utils');

class Navigator1 {
  constructor() {
    this.horizontal = 0;
    this.depth = 0;
  }

  forward(num) {
    this.horizontal += parseFloat(num);
  }
  down(num) {
    this.depth += parseFloat(num);
  }
  up(num) {
    this.depth -= parseFloat(num);
  }

  sum() {
    return this.depth * this.horizontal;
  }
}

class Navigator2 {
  constructor() {
    this.horizontal = 0;
    this.depth = 0;
    this.aim = 0;
  }

  forward(num) {
    this.horizontal += parseFloat(num);
    this.depth += this.aim * parseFloat(num);
  }
  down(num) {
    this.aim += parseFloat(num);
  }
  up(num) {
    this.aim -= parseFloat(num);
  }

  sum() {
    return this.depth * this.horizontal;
  }
}

run((input) => {
  const rows = input.split(/[\r\n]/).map((line) => line.split(' '));

  ask('What do you get if you multiply your final horizontal position by your final depth?');
  const navigator1 = new Navigator1();
  rows.forEach(([method, num]) => navigator1[method](num));
  answer(navigator1.sum());

  ask('What do you get if you multiply your final horizontal position by your final depth?');
  const navigator2 = new Navigator2();
  rows.forEach(([method, num]) => navigator2[method](num));
  answer(navigator2.sum());
});
