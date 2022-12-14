import { fileURLToPath } from 'node:url';
import path, {dirname} from 'node:path';
import * as fs from 'fs';
import {pipeline } from "node:stream";

const write = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = path.join(__dirname, '/files', 'fileToWrite.txt');

    const wr = fs.createWriteStream(filePath, 'utf8');
    pipeline(
        process.stdin,
        wr,
        (error) => console.error(error)
    );    
};

await write();