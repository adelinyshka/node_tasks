import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { createReadStream } from 'node:fs';

const { createHash } = await import('node:crypto');

const calculateHash = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const pathToNeededFile = path.join(__dirname, '/files', 'fileToCalculateHashFor.txt');
    const hash = createHash('sha256');
    const input = createReadStream(pathToNeededFile);

    input.on('data', (i) => {
        const data = i.toString();
        const answer = hash.update(data).digest('hex');
        console.log(answer);
    });
};

await calculateHash();