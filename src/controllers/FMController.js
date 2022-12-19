import { modelFM } from "../modelFM/modelFM.js";
import { cd } from "../commandsFM/nwd/cd.js";
import { ls } from "../commandsFM/nwd/ls.js";
import { up } from "../commandsFM/nwd/up.js";
import { move } from "../commandsFM/basicOperations/move.js";
import { add } from "../commandsFM/basicOperations/add.js";
import { cat } from "../commandsFM/basicOperations/cat.js";
import { copy } from "../commandsFM/basicOperations/copy.js";
import { remove } from "../commandsFM/basicOperations/remove.js";
import { rename } from "../commandsFM/basicOperations/rename.js";
import { compress } from "../commandsFM/compress/compress.js";
import { decompress } from "../commandsFM/compress/decompress.js";
import { hashCalc } from "../commandsFM/hash/hashCalc.js";
import { osProcess } from "../commandsFM/os/osProcess.js";

class FMController {
  constructor() { }

  getUserDirectory() {
    return modelFM.userDirectory;
  }

  setUserDirectory(path) {
    modelFM.userDirectory = path;
  }

  async up(args) {
    await up(args);
  }

  async cd(args) {
    await cd(args);
  }

  async ls(args) {
    await ls(args);
  }

  async cat(args) {
    await cat(args);
  }

  async add(args) {
    await add(args);
  }

  async rename(args) {
    await rename(args);
  }

  async copy(args) {
    await copy(args);
  }

  async move(args) {
    await move(args);
  }

  async remove(args) {
    await remove(args);
  }

  async os(args) {
    await osProcess(args);
  }

  async compress(args) {
    await compress(args);
  }

  async decompress(args) {
    await decompress(args);
  }

  async hash(args) {
    await hashCalc(args);
  }
}

export const fmController = new FMController();
