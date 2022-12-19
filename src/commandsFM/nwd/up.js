import { showUserPath } from "../../helpers.js";

export default function up() {
    try {
        process.chdir('..');
        showUserPath();
    } catch (error) {
        console.error('Operation failed' + '\n');
    }
};
