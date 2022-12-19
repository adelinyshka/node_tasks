import { createWriteStream } from 'fs';
import { getArrayOfArguments, createPath, handleErrors } from './../../helpers.js';

export const add = async (inputStr) => {
  try {
    const [ arg1 ] = getArrayOfArguments(inputStr, 1);
    const filePath = await createPath(arg1);
    const writeStream = createWriteStream(filePath);
    writeStream.end();
    process.stdout.write(`File ${filePath} successfully created!`);
  } catch(err) {
    handleErrors(err);
  }
};
