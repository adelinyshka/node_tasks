import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output, cwd } from 'node:process';
import doExit from './commandsFM/basicOperations/doExit.js';
import up from './commandsFM/nwd/up.js';
import ls from './commandsFM/nwd/ls.js';
import cd from './commandsFM/nwd/cd.js';
import { access, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

async function isPathExists(path) {
    try {
        await access(path);
        return true;
    } catch (error) {
        return false;
    }
}

async function isExists(path) {
    try {
        path = resolve(path);
        const link = await stat(path);
        return link.isExists();
    } catch (error) {
        return false;
    }
}

function getFileName(url) {
    return fileURLToPath(url);
}

const showUserPath = () => {
    console.log(`\n` + `You are currently in ${cwd()}` + `\n`);
};

export class InputError extends Error { }
export class OperationError extends Error { }

const handleErrors = (err) => {
    if (err instanceof InputError || err instanceof OperationError) {
        console.error('Invalid input');
    } else {
        console.error(`Operation failed!\n${err}`);
    }
};

const getArrayOfArguments = (argString, argNum) => {
    if (argString.length === 0) {
      if (argNum === 0) {
        return '';
      } else {
        throw new InputError(
         `Invalid input`
        );
      }
    }
    
    const arrayOfArguments = argString.split(' ');
    if (arrayOfArguments.length !== argNum) {
      throw new InputError(
        `Invalid input`
      );
    } else {
      return arrayOfArguments;
    }
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

    consoleLine.on('line', (command) => {
        let userInput = command.split(' ');
        userDirectory = process.env.USERPROFILE;

        if (userInput[0].includes('.exit')) {
            doExit(userName);
        }
        else if (userInput[0].includes('up')) {
            let i = up();
            userDirectory = i;
        }
        else if (userInput[0].includes('ls')) {
            ls();
        } 
        else if (userInput[0].includes('cd')) {
            let i = cd(userDirectory, command);
            userDirectory = i;
        }
    });
};

export { showUserPath, processUserCommands, handleErrors, isPathExists, isExists, getFileName, getArrayOfArguments };