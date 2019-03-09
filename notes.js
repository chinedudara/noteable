const fs = require('fs');

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
    let duplicateNotes = notes.filter((note) => note.title === title);
    if (duplicateNotes.length === 0) {
      notes.push(note);
      saveNotes(notes);
      return {
        note,
        msg : 'Note added'
      };
    } else {return {msg : 'Add failed! Duplicate title exists.'}};
};

let getAll = () => {
  let allNotes = retrieveNotes();
  if (allNotes.length) {
    return {
      note: allNotes,
      msg: `Printing ${allNotes.length} note(s)`
    }
  } else {return {msg: 'No notes!'}};
};

let getNote = (title) => {
    let notes = retrieveNotes();
    let noteMatch = notes.filter((note) => note.title === title);
    if (noteMatch.length) {
      return {
        note: noteMatch[0],
        msg: 'Note found.'
      };
    } else {return {msg: 'Note not found!'}};
};

let removeNote = (title) => {
    let notes = retrieveNotes();
    let notesFltrd = notes.filter((note) => note.title !== title);
    if (notesFltrd.length !== notes.length) {
      saveNotes(notesFltrd);
      return 'Note removed.';
    } else {return 'Delete failed. Note not found'};
};

let logNote = (note) => {
  console.log('-----');
  console.log('Title: ', note.title)
  console.log('Body: ', note.body)
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
