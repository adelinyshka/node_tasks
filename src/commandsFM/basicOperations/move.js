import { rm } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { getArrayOfArguments, createPath, getAbsolutePath, handleErrors } from './../../helpers.js';

export const move = async (stringWithArguments) => {
  try {
    const [arg1, arg2] = getArrayOfArguments(stringWithArguments, 2);
    const fromPath = await getAbsolutePath(arg1, 'file');
    const toPath = createPath(arg2);

    const readStream = createReadStream(fromPath);
    const writeStream = createWriteStream(toPath);

    const stream = readStream.pipe(writeStream);

    await new Promise((res, rej) => {
      stream.on('finish', () => {
        console.log('Success.');
        res();
      });
      stream.on('error', (err) => {
        rej(err);
      });
    });

    await rm(fromPath);

  } catch (err) {
    handleErrors(err);
  }
};
