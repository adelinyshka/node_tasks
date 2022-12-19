import { osController } from '../../controllers/OsController.js';
import { getArrayOfArguments, handleErrors, InputError } from '../../helpers.js';

export const osProcess = async (stringWithArguments) => {
  try {
    const [arg1] = getArrayOfArguments(stringWithArguments, 1);
    if (!arg1.startsWith('--')) {
      throw new InputError(`Invalid input`);
    }
    const infoTypeOfAnyCase = arg1.slice(2);
    const infoType = infoTypeOfAnyCase.toLowerCase();

    const osOperation = osController[infoType];
    if (osOperation === undefined) {
      throw new InputError('Invalid input');
    }
    await osOperation(stringWithArguments);

  } catch (err) {
    handleErrors(err);
  }
};
