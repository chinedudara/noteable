const fs = require('fs');
const chalk = require('chalk');

let retrieveNotes = () => {
  try {
    notesStr = fs.readFileSync('notes-data.json');
    return JSON.parse(notesStr);
  } catch (e) {
    return [];
  };
};

let saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

let addNote = (title, body) => {
    let notes = [];
    let note = {
      title,
      body
    };
    notes = retrieveNotes();
    let duplicateNote = notes.find((note) => note.title === title);
    if (!duplicateNote) {
      notes.push(note);
      saveNotes(notes);
      return {
        note,
        msg : chalk.green.inverse('Note added')
      };
    } else {return {msg : chalk.red.inverse('Add failed! Duplicate title exists.')}};
};

let getAll = () => {
  let allNotes = retrieveNotes();
  if (allNotes.length) {
    return {
      note: allNotes,
      msg: chalk`{green Printing ${chalk.green.inverse(allNotes.length)} note(s)}`
    }
  } else {return {msg: chalk.blue.inverse('No notes!')}};
};

let getNote = (title) => {
    let notes = retrieveNotes();
    let noteMatch = notes.find((note) => note.title === title);
    if (noteMatch) {
      return {
        note: noteMatch[0],
        msg: chalk.green.inverse('Note found.')
      };
    } else {return {msg: chalk.red.inverse('Note not found!')}};
};

let removeNote = (title) => {
    let notes = retrieveNotes();
    let notesFltrd = notes.filter((note) => note.title !== title);
    if (notesFltrd.length !== notes.length) {
      saveNotes(notesFltrd);
      return chalk.green.inverse('Note removed.');
    } else {return chalk.red.inverse('Remove failed. Note not found')};
};

let logNote = (note) => {
  console.log('-----');
  console.log(chalk.bold.yellowBright('Title: '), chalk.yellow(note.title))
  console.log(chalk.bold.blueBright('Body: '), note.body)
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
