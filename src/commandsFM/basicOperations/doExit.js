export default function doExit(userName) {
    process.stdout.write(`Thank you for using File Manager, ${userName}, goodbye!` + `\n`);
    process.exit(0);
}