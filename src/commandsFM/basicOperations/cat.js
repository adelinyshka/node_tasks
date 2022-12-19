import { createReadStream } from 'fs';
import { getArrayOfArguments, getAbsolutePath, handleErrors } from './../../helpers.js';

export const cat = async (inputStr) => {
  try {
    const [ firstArg ] = getArrayOfArguments(inputStr, 1);
    const filePath = await getAbsolutePath(firstArg, 'file');

    const readStream = createReadStream(filePath, 'utf8');

    for await (const data of readStream) {
      console.log(data);
    }

  } catch(err) {
    handleErrors(err);
  }
};
