import { createReadStream, createWriteStream } from 'fs';
import { getArrayOfArguments, createPath, getAbsolutePath, handleErrors } from './../../helpers.js';

export const cp = async (argsStr) => {
  try {
    const [ arg1, arg2 ] = getArrayOfArguments(argsStr, 2);
    const fromPath = await getAbsolutePath(arg1, 'file');
    const toPath = createPath(arg2);
    
    const readStream = createReadStream(fromPath);
    const writeStream = createWriteStream(toPath);

    const stream = readStream.pipe(writeStream);

    await new Promise((res, rej) => {
      stream.on('finish', () => {
        console.log('File copied successfully.');
        res();
      });
      stream.on('error', (err) => {
        rej(err);
      });
    });

  } catch(err) {
    handleErrors(err);
  }
};
