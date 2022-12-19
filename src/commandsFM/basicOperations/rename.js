import { rename as rnm } from 'node:fs/promises';
import { getArrayOfArguments, createPath, getAbsolutePath, handleErrors } from './../../helpers.js';

export const rename = async (argsStr) => {
  try {
    const [ arg1, arg2 ] = getArrayOfArguments(argsStr, 2);
    const fromPath = await getAbsolutePath(arg1, 'file');
    const toPath = createPath(arg2);
    
    await rnm(fromPath, toPath);
  } catch(err) {
    handleErrors(err);
  }
};
