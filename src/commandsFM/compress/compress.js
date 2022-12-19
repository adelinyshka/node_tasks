import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { getArrayOfArguments, createPath, getAbsolutePath, handleErrors } from './../../helpers.js';

export const compress = async (argsStr) => {
  try {
    const [ arg1, arg2 ] = getArrayOfArguments(argsStr, 2);
    const fromPath = await getAbsolutePath(arg1, 'file');
    const toPath = createPath(arg2);
    
    const readStream = createReadStream(fromPath);
    const brotli = createBrotliCompress();
    const writeStream = createWriteStream(toPath);

    const stream = readStream.pipe(brotli).pipe(writeStream);

    await new Promise((res, rej) => {
      stream.on('finish', () => {
        console.log('Brolti compression done.');
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
