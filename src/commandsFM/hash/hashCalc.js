import { createReadStream } from 'fs';
import { stdout } from 'process';
import { getArrayOfArguments, createPath, handleErrors } from './../../helpers.js';
import { createHash } from 'crypto';

export const hashCalc = async (stringWithArguments) => {
  try {
    const [firstArg] = getArrayOfArguments(stringWithArguments, 1);
    const filePath = await createPath(firstArg, 'file');

    const stream = createReadStream(filePath, 'utf8');
    const hash = createHash('sha256');

    const hex = await new Promise((resolve, reject) => {
      stream.on('data', chunk => hash.update(chunk));
      stream.on('end', () => {
        stream.destroy();
        const hex = hash.digest('hex');
        resolve(hex);
      });
      stream.on('error', err => reject(err));
    });

    stdout.write(`${hex}\n`);
  } catch (err) {
    handleErrors(err);
  }
};
