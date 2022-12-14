import { cp } from "node:fs/promises";
import { access, writeFile } from "node:fs/promises";

const isExists = async (path) => {
    try {
        await access(path);
        return true;
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        }
        throw err;
    }
};

// create.js
const createNewFile = async (filePath, textInside) => {
    await writeFile(filePath, textInside);
};

// copy.js
const copyDir = async(folderPath, destinationPath) =>{
   await cp(folderPath, destinationPath, {
        recursive: true,
        errorOnExist: true,
      force: false,
      })
}

export { isExists, createNewFile, copyDir };