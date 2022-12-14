import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { isExists } from './../helpers/utils.js';
import { createReadStream, createWriteStream } from "node:fs";
import { promisify } from "node:util";
import { pipeline } from "node:stream";
import { createUnzip } from "node:zlib";
import { nodeErrorMessage } from '../helpers/constants.js';

const decompress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const fileToDecompress = path.join(__dirname, '/files', 'archive.gz');
    const dirToSaveDecompress = path.join(__dirname, '/files', 'fileToCompress.txt');
    const isfileToDecompressExists = await isExists(fileToDecompress);
    const target = createReadStream(fileToDecompress);
    const location = createWriteStream(dirToSaveDecompress, 'utf-8');
    const mp = promisify(pipeline);

  if (!isfileToDecompressExists) {
    throw new Error(nodeErrorMessage);
  } await mp(target, createUnzip(), location);
}

await decompress();