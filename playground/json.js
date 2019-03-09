// var obj = {
//   title: 'some title'
// };
// var strObj = JSON.stringify(obj);
// console.log(typeof strObj);
// console.log(strObj)

// var str = '{"title": "some title","body": "some body"}';
// var obj = JSON.parse(str);
// console.log(typeof obj);
// console.log(obj);

const fs = require('fs');
let originalNote = {
  title: 'some title',
  body: 'some body'
};
fs.writeFileSync('note.json',JSON.stringify(originalNote));

let strNote = fs.readFileSync('note.json');
// console.log(strNote);
let convNote = JSON.parse(strNote);
console.log(convNote.title);
