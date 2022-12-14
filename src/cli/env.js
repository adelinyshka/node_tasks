import * as process from 'node:process';

const parseEnv = () => {
    const envVars = process.env;

    const answer = Object.keys(envVars)
        .filter(i => i.startsWith('RSS_'))
        .join(`; `);

    console.log(answer);
};

parseEnv();