import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { isExists } from './../helpers/utils.js';
import { createReadStream, createWriteStream } from "node:fs";
import { promisify } from "node:util";
import { pipeline } from "node:stream";
import { createGzip } from "node:zlib";
import { nodeErrorMessage } from '../helpers/constants.js';

const compress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const fileToCompress = path.join(__dirname, '/files', 'fileToCompress.txt');
    const dirToSaveComprFile = path.join(__dirname, '/files', 'archive.gz');
    const isFileToCompressExists = await isExists(fileToCompress);
    const target = createReadStream(fileToCompress);
    const location = createWriteStream(dirToSaveComprFile, 'utf-8');
    const mp = promisify(pipeline);

    if (!isFileToCompressExists) {
        throw new Error(nodeErrorMessage);
    } await mp(target, createGzip(), location);
};

await compress();