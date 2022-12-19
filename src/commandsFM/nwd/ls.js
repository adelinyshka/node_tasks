import { readdir } from 'node:fs/promises';
import { fmController } from '../../controllers/FMController.js';
import { getArrayOfArguments, handleErrors, } from '../../helpers.js';

export const ls = async (stringWithArguments) => {
    try {
        getArrayOfArguments(stringWithArguments, 0);
        const userDirectory = fmController.getUserDirectory();
        const data = await readdir(userDirectory, {
            withFileTypes: true,
        });
        console.table(data);
    } catch (err) {
        handleErrors(err);
    }
};
