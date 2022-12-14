import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { isExists, copyDir } from './../helpers/utils.js';
import { nodeErrorMessage } from '../helpers/constants.js';

const copy = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const pathToSourceFolder = path.join(__dirname, '/files');
    const pathToTargetFolder = path.join(__dirname, '/files_copy');
    const isTargetFolderExists = await isExists(pathToTargetFolder);
    const isSourceFolderExists = await isExists(pathToSourceFolder);

    if (!isTargetFolderExists && isSourceFolderExists) {
        await copyDir(pathToSourceFolder, pathToTargetFolder);
    } else {
        throw new Error(nodeErrorMessage);
    }
};

copy();