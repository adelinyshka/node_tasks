import { createWriteStream } from 'fs';
import { getArrayOfArguments, createPath, handleErrors } from './../../helpers.js';

export const add = async (stringWithArguments) => {
  try {
    const [arg1] = getArrayOfArguments(stringWithArguments, 1);
    const filePath = await createPath(arg1);
    const writeStream = createWriteStream(filePath);

    writeStream.end();
    console.log('Success');
  } catch (err) {
    handleErrors(err);
  }
};
