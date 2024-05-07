#!/usr/bin/env node

import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

let playerNmae;

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const rainbowTitle = chalkAnimation.rainbow(
    'Who Wants To Be A JavaScript Millionaire?'
  );

  await sleep();

  rainbowTitle.stop();

  console.log(
    chalk.bgBlue(`  I am a process on your computer.
  If you get any question wrong, I will be ${chalk.red('killed')}
  So get all the questions right...`)
  );
}

await main();
