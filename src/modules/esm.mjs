import * as path from 'node:path';
import { release, version } from 'node:os';
import { createServer as createServerHttp } from 'node:http';
import './files/c.js';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToA = './files/a.json';
const pathToB = './files/b.json';
const random = Math.random();

async function parse(path) {
    return JSON.parse(
        await readFile(
            new URL(path, import.meta.url)
        )
    );
}

let unknownObject;

if (random > 0.5) {
    unknownObject = await parse(pathToA);

} else {
    unknownObject = await parse(pathToB);
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);
console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export {
    unknownObject,
    myServer,
};


//here is old file 'cjsToEsm.cjs' which was renamed

// const path = require('path');
// const { release, version } = require('os');
// const { createServer: createServerHttp } = require('http');
// require('./files/c');

// const random = Math.random();

// let unknownObject;

// if (random > 0.5) {
//     unknownObject = require('./files/a.json');
// } else {
//     unknownObject = require('./files/b.json');
// }

// console.log(`Release ${release()}`);
// console.log(`Version ${version()}`);
// console.log(`Path segment separator is "${path.sep}"`);

// console.log(`Path to current file is ${__filename}`);
// console.log(`Path to current directory is ${__dirname}`);

// const myServer = createServerHttp((_, res) => {
//     res.end('Request accepted');
// });

// const PORT = 3000;

// console.log(unknownObject);

// myServer.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
//     console.log('To terminate it, use Ctrl+C combination');
// });

// module.exports = {
//     unknownObject,
//     myServer,
// };

