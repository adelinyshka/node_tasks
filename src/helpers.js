import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'process';
import doExit from './commandsFM/basicOperations/doExit.js';
import up from './commandsFM/nwd/up.js';
import { cwd } from 'node:process';

const showUserPath = () => {
    console.log(`\n` + `You are currently in ${cwd()}` + `\n`);
};

const processUserCommands = (consoleArgs) => {
    const consoleLine = readline.createInterface({ input, output });
    let userDirectory = null;
    let name = consoleArgs.slice(consoleArgs.length - 1).join('').split('--username=');
    const userName = name[1];

    consoleLine.output.write('\n' + `Welcome to the File Manager, ${userName}!` + '\n');
    showUserPath();

    consoleLine.setPrompt(process.env.HOME + ` >> `);
    consoleLine.prompt();

    consoleLine.on('SIGINT', () => {
        doExit(userName);
    });

    consoleLine.on('line', (input) => {
        let userInput = input.split(' ');
        userDirectory = process.env.USERPROFILE;

        if (userInput[0].includes('.exit')) {
            doExit(userName);
        }
        else if (userInput[0].includes('up')) {
            let i = up();
            userDirectory = i;
        }
    });
};

export { showUserPath, processUserCommands };