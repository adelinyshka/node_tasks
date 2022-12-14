import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { isExists, createNewFile } from './../helpers/utils.js';
import { nodeErrorMessage } from '../helpers/constants.js';

const create = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = path.join(__dirname, '/files');
    const newFileContent = 'I am fresh and young';
    const newFileName = 'fresh.txt';
    const newFilePath = path.join(filePath, newFileName);
    const isFileExists = await isExists(newFilePath);

    try {
        if (isFileExists) {
            throw new Error(nodeErrorMessage);
        }
        await createNewFile(newFilePath, newFileContent);
    } catch (error) {
        console.error(error);
    }
};

await create(); 
