import { fmController } from '../../controllers/FMController.js';
import { getArrayOfArguments, handleErrors, getAbsolutePath } from '../../helpers.js';

export const cd = async (stringWithArguments) => {
  try {
    const [firstArg] = getArrayOfArguments(stringWithArguments, 1);
    const path = await getAbsolutePath(firstArg);
    fmController.setUserDirectory(path);
  } catch (err) {
    handleErrors(err);
  }
};
