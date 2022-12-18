import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'process';
import doExit from './commandsFM/basicOperations/doExit.js';

const getUserNameFromCli = (cliArguments) => {
    let userName;
    if (cliArguments) {
        userName = cliArguments.filter((i) => i.startsWith('--username')).join().slice(11);
    } else {
        userName = 'Anonymous';
    }
    return userName;
};

const welcomeUser = (name) => {
    console.log(`Welcome to the File Manager, ${name}!` + `\n`);
};

const showUserPath = (path) => {
    console.log(`You are currently in ${path}` + `\n`);
};

const processUserCommands = () => {
    const consoleLine = readline.createInterface({
        input,
        output
    });

    consoleLine.setPrompt(process.env.HOME + ` >>`);

    consoleLine.on('line', (input) => {
        let userInput = input.split(' ');
        if (userInput[0].includes('.exit')) {
            doExit(getUserNameFromCli());
        }
    });
};

export { getUserNameFromCli, welcomeUser, showUserPath, processUserCommands };