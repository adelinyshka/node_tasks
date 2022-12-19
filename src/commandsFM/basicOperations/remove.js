import { rm } from 'node:fs/promises';
import { getArrayOfArguments, getAbsolutePath, handleErrors } from './../../helpers.js';

export const remove = async (stringWithArguments) => {
  try {
    const [arg1] = getArrayOfArguments(stringWithArguments, 1);
    const path = await getAbsolutePath(arg1, 'file');

    await rm(path);
    console.log('Success');

  } catch (err) {
    handleErrors(err);
  }
};
