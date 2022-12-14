import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { isExists } from './../helpers/utils.js';
import { nodeErrorMessage } from '../helpers/constants.js';
import { fork } from "node:child_process";

const spawnChildProcess = async (args) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const cpFile = path.join(__dirname, '/files','script.js');
    const isCpFileExists = await isExists(cpFile);

    if (!isCpFileExists) {
        throw new Error(nodeErrorMessage);
    } fork(cpFile, args);
};

spawnChildProcess();