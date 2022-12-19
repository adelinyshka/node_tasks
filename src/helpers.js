import { stat } from 'node:fs/promises';
import { join, isAbsolute } from 'node:path';
import { fmController } from './controllers/FMController.js';
import { constants } from "fs";

export class InputError extends Error { }
export class OperationError extends Error { }

const handleErrors = (err) => {
    if (err instanceof InputError) {
        console.error('Invalid input');
    } if (err instanceof OperationError) {
        console.error(`Operation failed`);
    }
};

const getArrayOfArguments = (argString, argNum) => {
    if (argString.length === 0) {
        if (argNum === 0) {
            return '';
        } else {
            console.error('Invalid input');
        }
    }

    const arrayOfArguments = argString.split(' ');
    if (arrayOfArguments.length !== argNum) {
        console.error('Invalid input');
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
        console.error('Invalid input');
    }
};

const getAbsolutePath = async (string, type) => {
    try {
        const path = createPath(string);
        const chekers = async (path, type) => {
            const check = await stat(path);
            if (type === 'file' && !check.isFile()) {
                console.error('Invalid input');
            }
            if (type === 'folder' && !check.isFolder()) {
                console.error('Invalid input');
            }
        };
        await chekers(path, type);
        return path;
    } catch (err) {
        console.error('Invalid input');
    }
};

export {
    handleErrors,
    getArrayOfArguments,
    getAbsolutePath,
    createPath,
};
