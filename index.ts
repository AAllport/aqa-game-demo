import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

console.log("Welcome to the amazing memory game!")
const name = await rl.question("What's your name? ")
console.log(`Hello ${name}!`)
console.log("Let's start the game!")

