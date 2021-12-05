const fs = require("fs");
const { promisify } = require("util");
const callsite = require("callsite");
const path = require("path");
const chalk = require("chalk");
const readFileAsync = promisify(fs.readFile);

module.exports.run = async (callback = () => true, file = "input.txt") => {
  const stack = callsite();
  const [, tmp] = stack || [];

  if (!tmp) {
    throw new Error("Could not be called directly");
  }

  try {
    const root = path.dirname(tmp.getFileName());
    const input = await readFileAsync(root + `/${file}`, "utf-8");
    await callback(input);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports.ask = (str) => console.log(chalk.cyan(`\n${str}`));
module.exports.answer = (str) => console.log(chalk.green.bold(str));
