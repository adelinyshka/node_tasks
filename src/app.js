import { stdin, stdout } from 'node:process';
import { createInterface } from 'readline';
import { fmController } from './controllers/FMController.js';
import { handleErrors } from './helpers.js';

const startFM = async () => {
  try {
    const getUserName = (stringWithArguments) => {
      let name = stringWithArguments.slice(stringWithArguments.length - 1).join('').split('--username=');
      const userName = name[1];
      return userName;
    };
    const userName = getUserName(process.argv);

    console.log(`Welcome to the File Manager, ${userName}! \n`);

    const consoleLine = createInterface({ input: stdin, output: stdout });

    consoleLine.setPrompt(`${process.env.HOME} >> `);
    consoleLine.prompt();

    consoleLine.on('SIGINT', () => {
      console.log(`\nThank you for using File Manager, ${userName}, goodbye! \n`);
      consoleLine.close();
    });


    const handleInput = async (answerStr) => {
      try {
        const splitInput = (answerStr) => {
          const spaceIndex = answerStr.indexOf(' ');
          if (spaceIndex > 0) {
            const spaceIndex = answerStr.indexOf(' ');
            const operationName = answerStr.slice(0, spaceIndex);
            const argsStr = answerStr.slice(spaceIndex + 1, answerStr.length);
            return [operationName, argsStr];
          } else {
            return [answerStr, ''];
          }
        };
        const [operationName, argsStr] = splitInput(answerStr);
        const operation = fmController[operationName];
        if (operation === undefined) {
          console.error('Invalid input');
        }
        await operation(argsStr);
      } catch (err) {
        handleErrors(err);
      }
    };

    const ask = async () => {
      process.stdout.write(`\n You are currently in ${fmController.getUserDirectory()} \n`);
      consoleLine.question('', async (command) => {
        if (command != '.exit') {
          await handleInput(command);
          await ask();
        }
        else {
          console.log(`\nThank you for using File Manager, ${userName}, goodbye! \n`);
          consoleLine.close();
        }
      });
    };
    await ask();

  } catch (err) {
    handleErrors(err);
  }
};

startFM();