const yargs = require('yargs');
const chalk = require('chalk');

const notes = require('./notes.js');

const titleOptions = {
  describe: 'Title of the note',
  demandOption: true,
  alias: 't',
  type: 'string'
};
const bodyOptions = {
  describe: 'Body of the note',
  demandOption: true,
  alias: 'b'
};
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{title: titleOptions, body: bodyOptions},
    handler: (argv) => {
      let response = notes.addNote(argv.title, argv.body);
      if (response.note) {
        console.log(response.msg)
        notes.logNote(response.note);
      } else {
        console.log(response.msg)
      }
    }
})

yargs.command({
    command: 'list',
    describe: 'List all saved notes',
    handler: () => {
      let response = notes.getAll();
      console.log(response.msg);
      if (response.note) {
        response.note.forEach((note) => {
          process.stdout.write(`${chalk.blue.bold(response.note.indexOf(note)+1)}`);
          notes.logNote(note);
          //Print a new line after each note but not after the last note
          (response.note.indexOf(note)+1 !== response.note.length) ? console.log('\n') : null;
        });
      };
    }
})
yargs.command({
    command: 'read',
    describe: 'Read a saved note',
    builder: {title: titleOptions},
    handler: (argv) => {
      let response = notes.getNote(argv.title)
      if (response.note) {
        console.log(response.msg)
        notes.logNote(response.note);
      } else {
        console.log(response.msg);
      }
    }
})

yargs.command({
    command: 'remove',
    describe: 'remove a saved note',
    builder: {title: titleOptions},
    handler: (argv) => {
      let response = notes.removeNote(argv.title);
      console.log(response);
    }
})

yargs.version('1.1.0');
yargs.help();
yargs.parse();