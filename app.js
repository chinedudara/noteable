const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs')

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
const argv = yargs
          .command('add','Add a new note',{title: titleOptions, body: bodyOptions})
          .command('list','List all saved notes')
          .command('read','Read a saved note',{title: titleOptions})
          .command('del','Delete a saved note',{title: titleOptions})
          .help()
          .argv;
const cmd = argv._[0];

if (cmd==='add') {
    let response = notes.addNote(argv.title, argv.body);
    if (response.note) {
      console.log(response.msg)
      notes.logNote(response.note);
    } else {
      console.log(response.msg)
    }
}else if (cmd==='list') {
    let response = notes.getAll();
      console.log(response.msg);
    if (response.note) {
      response.note.forEach((note) => {
        console.log('\n');
        process.stdout.write(`${response.note.indexOf(note)+1}`);
        notes.logNote(note);
      });
    };
}else if (cmd==='read') {
    let response = notes.getNote(argv.title)
    if (response.note) {
      console.log(response.msg)
      notes.logNote(response.note);
    } else {
      console.log(response.msg);
    }
}else if (cmd==='del') {
    let response = notes.removeNote(argv.title);
    console.log(response);
}else {
  console.log('Command not recognized')
}
