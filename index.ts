import {Game} from "./lib/game.js";

console.log("Welcome to the amazing memory game!")
console.log("Let's start the game!")

let game: Game | null = new Game();
await game.loadWords("./resources/wordlist.txt");

await game.play();

console.log("Thanks for playing!");

game.close();
