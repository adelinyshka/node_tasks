import { getUserNameFromCli, welcomeUser } from './src/helpers.js';
import { argv } from 'process';

function startFM() {
  welcomeUser(getUserNameFromCli(argv));
}

startFM();