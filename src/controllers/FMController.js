import { modelFM } from "../modelFM/modelFM.js";
import { cd } from "../commandsFM/nwd/cd.js";
import { ls } from "../commandsFM/nwd/ls.js";
import { up } from "../commandsFM/nwd/up.js";

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
}
export const fmController = new FMController();
