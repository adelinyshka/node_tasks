import { createReadStream } from 'fs';
import { getArrayOfArguments, getAbsolutePath, handleErrors } from './../../helpers.js';

export const cat = async (stringWithArguments) => {
  try {
    const [firstArg] = getArrayOfArguments(stringWithArguments, 1);
    const filePath = await getAbsolutePath(firstArg, 'file');

    const readStream = createReadStream(filePath, 'utf8');

    for await (const data of readStream) {
      console.log(data);
    }
  } catch (err) {
    handleErrors(err);
  }
};
