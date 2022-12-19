import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { stat } from 'node:fs/promises';
import { join, isAbsolute } from 'node:path';
import doExit from './commandsFM/basicOperations/doExit.js';
import { fmController } from './controllers/FMController.js';

function getFileName(uconsoleLine) {
    return fileUconsoleLineToPath(uconsoleLine);
}

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

const createPath = (path) => {
    try {
        if (isAbsolute(path)) {
            return path;
        } else {
            const userDirectory = fmController.getUserDirectory();
            const readyPath = join(userDirectory, path);
            return readyPath;
        }
    } catch (err) {
        throw new InputError(`Invalid input`);
    }
};

const getAbsolutePath = async (string, type) => {
    try {
        const path = createPath(string);
        const chekers = async (path, type) => {
            const check = await stat(path);
            if (type === 'file' && !check.isFile()) {
                throw new InputError(`Invalid input`);
            }
            if (type === 'folder' && !check.isFolder()) {
                throw new InputError(`Invalid input! Not a folder.`);
            }
        };
        await chekers(path, type);
        return path;
    } catch (err) {
        throw new InputError(`Invalid input`);
    }
};

const processUserCommands = async () => {
    try {
        const getUserName = (stringWithArguments) => {
            let name = stringWithArguments.slice(stringWithArguments.length - 1).join('').split('--username=');
            const userName = name[1];
            return userName;
        };
        const userName = getUserName(process.argv);

        console.log(`Welcome to the File Manager, ${userName}! \n`);

        const consoleLine = readline.createInterface({ input, output });

        consoleLine.on('.exit', () => {
            doExit(userName)
        });
        consoleLine.on('SIGINT', () => {
            doExit(userName)
        });

        const handleUserCommand = async (command) => {
            try {
                const splitInput = (command) => {
                    const spaceIndex = command.indexOf(' ');
                    if (spaceIndex > 0) {
                        const spaceIndex = command.indexOf(' ');
                        const operationName = command.slice(0, spaceIndex);
                        const argsStr = command.slice(spaceIndex + 1, command.length);
                        return [operationName, argsStr];
                    } else {
                        return [command, ''];
                    }
                };
                const [operationName, argsStr] = splitInput(command);
                const operation = fmController[operationName];
                if (operation === undefined) {
                    throw new InputError('Invalid input');
                }
                await operation(argsStr);
            } catch (err) {
                handleErrors(err);
            }
        };

        const ask = async () => {
            output.write(`\nYou are currently in ${fmController.getUserDirectory()} \n`);
            consoleLine.question('', async (command) => {
                if (command != '.exit') {
                    await handleUserCommand(command);
                    await ask();
                }
                else {
                    consoleLine.close();
                }
            });
        };
        await ask();

    } catch (err) {
        handleErrors(err);
    }
};

export {
    showUserPath,
    handleErrors,
    getFileName,
    getArrayOfArguments,
    getAbsolutePath,
    createPath,
    processUserCommands,
};
