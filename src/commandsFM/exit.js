export default function exit(userName) {
    process.stdout.write(`\n`);
    process.stdout.write(`Thank you for using File Manager, ${userName}, goodbye!` + `\n`);
    process.exit(0);
}