import { homedir } from 'os';

class ModelFM {
  constructor() {
    this.userDirectory = homedir();
  }

  get userDirectory() {
    return this._userDirectory;
  }

  set userDirectory(path) {
    this._userDirectory = path;
  }

}
export const modelFM = new ModelFM();
