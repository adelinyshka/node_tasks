import { isExists } from '../helpers/utils.js';
import { nodeErrorMessage } from '../helpers/constants.js';
import { rename as renaming } from 'node:fs/promises';

const rename = async () => {
    const sourceName = new URL("./files/wrongFilename.txt", import.meta.url);
    const targetName = new URL("./files/properFilename.md", import.meta.url);
    const existedTargetName = await isExists(targetName);
    const existedSourceName = await isExists(sourceName);

    if (existedTargetName || !existedSourceName) {
        throw new Error(nodeErrorMessage);
    } else { await renaming(sourceName, targetName); }
};

await rename();