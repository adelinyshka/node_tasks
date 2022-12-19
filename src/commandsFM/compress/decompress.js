import { createReadStream, createWriteStream } from 'fs';
import { createBrotliDecompress } from 'zlib';
import { getArrayOfArguments, createPath, getAbsolutePath, handleErrors } from './../../helpers.js';

export const decompress = async (argsStr) => {
  try {
    const [ arg1, arg2 ] = getArrayOfArguments(argsStr, 2);
    const fromPath = await getAbsolutePath(arg1, 'file');
    const toPath = createPath(arg2);
  
    const readStream = createReadStream(fromPath);
    const brotli = createBrotliDecompress();
    const writeStream = createWriteStream(toPath);

    const stream = readStream.pipe(brotli).pipe(writeStream);

    await new Promise((res, rej) => {
      stream.on('finish', () => {
        console.log('Brolti decompression done.');
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
