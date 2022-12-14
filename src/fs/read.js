import { fileURLToPath } from 'node:url';
import path,{ dirname } from 'node:path';
import { isExists } from './../helpers/utils.js';
import { nodeErrorMessage } from '../helpers/constants.js';
import { readFile } from 'node:fs/promises';

const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = path.join(__dirname, '/files');
    const fileToRead = 'fileToRead.txt';
    const fileToReadPath = path.join(filePath, fileToRead);
    const isFileExists = await isExists(fileToReadPath);

    if (!isFileExists) {
        throw new Error(nodeErrorMessage);
    }
    console.log(await readFile(fileToReadPath, { encoding: 'utf8' }));
};

await read();