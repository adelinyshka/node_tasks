import { osController} from '../../controllers/OsController.js'
import { getArrayOfArguments, handleErrors, InputError } from '../../helpers.js';

export const osProcess = async (argsStr) => {
  try {
    const [ arg1 ] = getArrayOfArguments(argsStr, 1);
    if (!arg1.startsWith('--')) {
      throw new InputError(`Invalid input`);
    }
    const infoTypeOfAnyCase = arg1.slice(2);
    const infoType = infoTypeOfAnyCase.toLowerCase();

    const osOperation = osController[infoType];
    if (osOperation === undefined) {
      throw new InputError('Invalid input');
    }
    await osOperation(argsStr);

  } catch(err) {
    handleErrors(err);
  }
};
