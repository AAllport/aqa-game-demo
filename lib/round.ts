import readline from "node:readline/promises";
import {Game} from "./game.js";

export class Round {
    subIdx: number;
    changes: { removed: string; added: string; };
    readline: readline.Interface;
    private readonly words: string[];
    private readonly round: number;

    constructor({game, round, readline}: { game: Game, round: number, readline: readline.Interface }) {
        this.round = round;
        this.words = game.words
            .sort(() => Math.random() - 0.5)
            .slice(0, 10);
        this.subIdx = Math.round(Math.random() * 9);
        this.changes = {removed: this.words[this.subIdx], added: this.words[this.words.length - 1]};
        this.readline = readline;
    }

    async countdown() {
        for (let i = 5; i > 0; i--) {
            console.log(`Starting in ${i}...`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    printWords(words: string[], cols = 3) {
        for (let i = 0; i < words.length; i += cols) {
            let line = "";
            for (let j = 0; j < 3; j++) {
                line += `${this.words[i + j]}\t`;
            }
            console.log(line);
        }
    }

    async play() {
        console.clear();
        console.log(`Starting round ${this.round}`);

        this.printWords(this.words.slice(0, 9));
        await this.countdown();
        let newWords = this.words
            .filter((_, idx) => idx !== this.subIdx)
            .sort(() => Math.random() - 0.5);

        this.printWords(newWords);

        console.log(this.changes)

        console.log("Let's see if you can remember the missing word...");

        let correct = false;
        while (!correct) {
            let answer = await this.readline.question("Which word was removed? ");
            if (answer.toLowerCase() === this.changes.removed.toLowerCase()) {
                correct = true;
                continue;
            }
            console.log("Incorrect, let's try again...");
        }

        console.log("Correct! Now let's see if you can remember the added word...");

        correct = false;
        while (!correct) {
            let answer = await this.readline.question("Which word was added? ");
            if (answer.toLowerCase() === this.changes.added.toLowerCase()) {
                correct = true;
                continue;
            }
            console.log("Incorrect, let's try again...");
        }

        console.log("Correct!");
        if (Math.random() > 0.25) {
            console.log("You are a genius!")
        }
    }
}
