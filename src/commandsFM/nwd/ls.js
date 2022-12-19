import { readdir, } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cwd } from 'node:process';
import { showUserPath, handleErrors } from '../../helpers.js';

export default async function ls() {
    try {
        const currentDirectory = resolve(cwd());
        const data = await readdir(currentDirectory, {
            withFileTypes: true,
        });
        console.table(data);
        showUserPath();
    } catch (err) {
        handleErrors(err);
    }
}
