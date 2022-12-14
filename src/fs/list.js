import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { isExists } from './../helpers/utils.js';
import { nodeErrorMessage } from '../helpers/constants.js';
import { readdir } from 'node:fs/promises';

const list = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const folderPath = path.join(__dirname, '/files');
    const isFolderExists = await isExists(folderPath);

    if (!isFolderExists) {
        throw new Error(nodeErrorMessage);
    } console.log(await readdir(folderPath));
};

await list();