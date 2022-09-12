const { Command } = require("commander");
const program = new Command();

program
  .name("notes to db.json")
  .description("CLI to add and modify notes in .json file")
  .version("0.1.0");

program
  .command("add")
  .description(" adding new note to db.json file")
  .argument(" <title> <body> ", "title and body of note");

program.command("list").description("list notes from db.json file");

program
  .command("edit")
  .description(" editing  note from db.json file")
  .argument(" <title> <body> ", "title of note to edit & new body of it");

program
  .command("delete")
  .description(" deleting  note from db.json file")
  .argument(" <title> ", "title of note to delete");
program.parse();

const fs = require("fs");
const databasePath = "./db.json";
const readDatabase = () => {
  const dbString = fs.readFileSync(databasePath, "utf8") || "[]";
  const db = JSON.parse(dbString);
  return db;
};

const writeDatabase = (data) => {
  fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
  console.log("sucsess");
};
const addNote = (title, body) => {
  let data = readDatabase();
  data.push({ id: Date.now(), title, body });
  writeDatabase(data);
  console.log(data);
};
const deleteNote = (title) => {
  let data = readDatabase();
  data.forEach((element, index, arr) => {
    element.title === title ? arr.splice(index, 1) : "";
  });
  writeDatabase(data);
  console.log(data);
};

const editNote = (title, body) => {
  let data = readDatabase();
  data.forEach((element) => {
    element.title === title ? (element.body = body) : "";
  });
  writeDatabase(data);
  console.log(data);
};
const listNotes = () => {
  let data = readDatabase();
  console.log(data);
};

let [, , action, title, body] = process.argv;

switch (action) {
  case "add":
    addNote(title, body);
    break;
  case "delete":
    deleteNote(title);
    break;
  case "edit":
    editNote(title, body);
    break;

  case "list":
    listNotes();
    break;

  default:
    console.error(
      " you can only use [ list , add , edit , delete] as an action"
    );
}
