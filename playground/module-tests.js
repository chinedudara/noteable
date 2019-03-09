const validator = require('validator');
const chalk = require('chalk');

const log = console.log;

log(validator.isURL('abc.comaite'));

log(`My name is ${chalk.red.bold.underline('Chinedu Dara')}`);
log(chalk.green(
    'I am a green line ' +
    chalk.blue.underline.bold('with a blue substring') +
    ' that becomes green again!'));

    log(`
    CPU: ${chalk.red('90%')}
    RAM: ${chalk.green('40%')}
    DISK: ${chalk.yellow('70%')}
    `);

    log(process.argv);