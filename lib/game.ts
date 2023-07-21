import * as fs from "fs/promises";
import readline from "node:readline/promises";
import {stdin as input, stdout as output} from "process";

import {Round} from "./round.js";

export class Game {
    round: number;
    private readonly readline: readline.Interface;

    constructor() {
        this.round = 0
        this.readline = readline.createInterface({input, output});
    }

    private _words: string[] = [];

    get words(): string[] {
        return this._words;
    }

    async loadWords(file: string) {
        const data = await fs.readFile(file);

        this._words = data.toString().split("\n");
    }

    async startRound() {
        let currentRound = new Round({game: this, round: this.round++, readline: this.readline});
        await currentRound.play();
    }

    async play() {
        while (true) {
            await this.startRound();
            const answer = await this.readline.question("Play again? (y/n)");
            if (answer.toLowerCase() !== "y") {
                break;
            }
        }
    }

    close() {
        this.readline.close();
    }
}
