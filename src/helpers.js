const getUserNameFromCli = (cliArguments) => {
    let userName;
    if (cliArguments) {
        userName = cliArguments.filter((i) => i.startsWith('--username')).join().slice(11);
    } else { 
        userName = 'Anoniymous'; 
    }
    return userName;
};

const welcomeUser = (name) => {
    console.log(`Welcome to the File Manager, ${name}!`);
}

export { getUserNameFromCli, welcomeUser };