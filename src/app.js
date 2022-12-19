import { processUserCommands, showUserPath } from './helpers.js';

function startFM() {
  processUserCommands(process.argv);
}

startFM();