import { createReadStream, createWriteStream } from 'fs';
import { createBrotliDecompress } from 'zlib';
import { getArrayOfArguments, createPath, getAbsolutePath, handleErrors } from './../../helpers.js';

export const decompress = async (stringWithArguments) => {
  try {
    const [arg1, arg2] = getArrayOfArguments(stringWithArguments, 2);
    const from = await getAbsolutePath(arg1, 'file');
    const toPath = createPath(arg2);
    const rs = createReadStream(from);
    const brotliCompress = createBrotliDecompress();
    const ws = createWriteStream(toPath);
    const stream = rs.pipe(brotliCompress).pipe(ws);

    await new Promise((res, rej) => {
      stream.on('finish', () => {
        console.log('Decompression successful.');
        res();
      });
      stream.on('error', (err) => {
        rej(err);
      });
    });


  } catch (err) {
    handleErrors(err);
  }
};
