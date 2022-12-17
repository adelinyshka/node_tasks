import { getUserNameFromCli, showUserPath, welcomeUser } from './src/helpers.js';
import { argv } from 'process';
import { env } from 'process';

function startFM() {
  welcomeUser(getUserNameFromCli(argv));
  showUserPath(env.Home);
}

startFM();