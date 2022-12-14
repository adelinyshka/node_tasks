import { createReadStream } from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const pathToNeededFile = (path.join(__dirname, '/files', 'fileToRead.txt'));
    const readableData = createReadStream(pathToNeededFile, 'utf-8');
    let dataToConsole = '';

    readableData.on('data', (i) => { dataToConsole += i; });
    readableData.on('end', () => process.stdout.write(dataToConsole));
    readableData.on('error', (error) => console.error(error));
};

await read();