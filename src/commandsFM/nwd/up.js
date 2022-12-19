import { parse } from 'node:path';
import { fmController } from '../../controllers/FMController.js';
import { getArrayOfArguments, handleErrors } from '../../helpers.js';

export const up = async (stringWithArguments) => {
    try {
        getArrayOfArguments(stringWithArguments, 0);
        const userDirectory = fmController.getUserDirectory();
        const parsed = parse(userDirectory);
        const newDirectory = parsed.dir;
        fmController.setUserDirectory(newDirectory);
    } catch (err) {
        handleErrors(err);
    }
};
