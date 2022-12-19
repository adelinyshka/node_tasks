import { rename as rnm } from 'node:fs/promises';
import { getArrayOfArguments, createPath, getAbsolutePath, handleErrors } from './../../helpers.js';

export const rename = async (stringWithArguments) => {
  try {
    const [arg1, arg2] = getArrayOfArguments(stringWithArguments, 2);
    const fromPath = await getAbsolutePath(arg1, 'file');
    const toPath = createPath(arg2);

    await rnm(fromPath, toPath);
    console.log('Success');
  } catch (err) {
    handleErrors(err);
  }
};
