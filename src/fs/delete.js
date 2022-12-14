import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { isExists } from './../helpers/utils.js';
import { nodeErrorMessage } from '../helpers/constants.js';
import { unlink } from 'node:fs/promises';

const remove = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = path.join(__dirname, '/files');
    const fileNameToDelete = 'fileToRemove.txt';
    const fileToDeletePath = path.join(filePath, fileNameToDelete);
    const isFileExists = await isExists(fileToDeletePath);

    if (!isFileExists) {
        throw new Error(nodeErrorMessage);
    } await unlink(fileToDeletePath);
};

await remove();