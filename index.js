#!/usr/bin/env node

import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';

let playerName;

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

async function askName() {
  const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name?',
    default() {
      return 'Player';
    },
  });

  playerName = answers.player_name;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: 'question1',
    type: 'list',
    message: 'Javascript was created in 10 days then released on\n',
    choices: [
      'May, 23rd, 1995',
      'Nov 24th, 1995',
      'Dec 4th, 1995',
      'Dec 6th, 1995',
    ],
  });

  return handleAnswer(answers.question1 === 'Dec 4th, 1995');
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner('Checking your answer...').start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Nice Work ${playerName}!` });
  } else {
    spinner.error({
      text: `Sorry ${playerName}, you got it wrong!`,
    });
    process.exit(1);
  }
}

async function question2() {
  const answers = await inquirer.prompt({
    name: 'question2',
    type: 'list',
    message: 'Who created JavaScript?',
    choices: ['Brendan Eich', 'Bill Gates', 'Steve Jobs', 'Mark Zuckerberg'],
  });

  return handleAnswer(answers.question2 === 'Brendan Eich');
}

function winner() {
  console.clear();
  const msg = `Congratulations ${playerName}! You are a JavaScript Millionaire!`;

  figlet.text(
    msg,
    {
      font: 'Standard',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true,
    },
    function (err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      console.log(gradient.pastel.multiline(data));
    }
  );
}

await main();

await askName();

await question1();

await question2();

winner();
