import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress } from "zlib";
import { getAbsolutePath, handleErrors, } from './../../helpers.js';

export const compress = async (stringWithArguments) => {
  try {
    const [arg1, arg2] = getArrayOfArguments(stringWithArguments, 2);
    const from = await getAbsolutePath(arg1, 'file');
    const to = createPath(arg2);
    const rs = createReadStream(from);
    const brotliCompress = createBrotliCompress();
    const ws = createWriteStream(to);
    const stream = rs.pipe(brotliCompress).pipe(ws);

    await new Promise((res, rej) => {
      stream.on('finish', () => {
        console.log('Compression successful.');
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
