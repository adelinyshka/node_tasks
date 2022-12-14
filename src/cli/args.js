const parseArgs = () => {
    const neededArgs = process.argv;
    
    console.log(neededArgs
        .filter(i => i.startsWith('--'))
        .map(i => `${i} is ${neededArgs[neededArgs.indexOf(i) + 1]}`)
        .join(', '));
};

parseArgs();