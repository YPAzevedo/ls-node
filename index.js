#!/usr/bin/env node
const fs = require("fs");
const chalk = require("chalk");
const path = require("path");

const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (error, filenames) => {
  if (error) {
    console.log(error);
  }

  const lstatPromises = filenames.map((filename) => {
    return lstat(path.join(targetDir, filename));
  });

  const allStats = await Promise.all(lstatPromises);

  allStats.forEach((stat, index) => {
    if (stat.isFile()) {
      console.log(filenames[index]);
    } else {
      console.log(chalk.bold(filenames[index]));
    }
  });
});
