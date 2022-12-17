import { getUserNameFromCli, showUserPath, welcomeUser, processUserCommands } from './src/helpers.js';
import { argv } from 'process';
import { env } from 'process';

function startFM() {
  welcomeUser(getUserNameFromCli(argv));
  showUserPath(env.Home);
  processUserCommands();
}

startFM();