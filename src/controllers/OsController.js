import { EOL, cpus, homedir, userInfo, arch } from 'os';
import { stdout } from 'process';

class OsController {
  constructor() { }

  eol() {
    const eolStr = JSON.stringify(EOL);
    stdout.write(eolStr);
  }

  cpus() {
    const cpusArr = cpus();
    console.log(cpusArr.length);
    for (const cpuObj of cpusArr) {
      console.log(cpuObj.model);
    }
  }

  homedir() {
    const homeDirStr = homedir();
    console.log(homeDirStr);
  }

  username() {
    const systemUserName = userInfo().username;
    console.log(systemUserName);
  }

  architecture() {
    console.log(arch);
  }
}

export const osController = new OsController();
