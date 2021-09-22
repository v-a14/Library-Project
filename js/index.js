// const { table } = require("console");

console.log("Starting making our project");

// book constructor
class Book {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}

// display constructor

class Display {
  //implementation of addition function using local storage
  add() {
    //   console.log("Adding to ui");
    let books = localStorage.getItem("books");
    let localBookObj;
    if (books == null) {
      localBookObj = [];
    } else {
      localBookObj = JSON.parse(books);
    }

    let html = "";
    for (let i = 0; i < localBookObj.length; i++) {
      html += `<tr>
                      <th scope="row" class="content">${i + 1}</th>
                      <td>${localBookObj[i].name}</td>
                      <td>${localBookObj[i].author}</td>
                      <td>${localBookObj[i].type}</td>
                      <td><button id = "${i}" onclick = "deleteNote(this.id)" class="btn btn-success">Delete Book</button></td>
                </tr>`;
    }
    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = html;
  }

  // implementation of clear function
  clear() {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
  }

  // implemantaion of show function
  show(type, showMessage) {
    let message = document.getElementById("message");
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message:  </strong><b>${showMessage}</b>
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                         </div>`;
  }
}

let display = new Display();
display.add();

// Function to search the books
let search = document.getElementById("searchTxt");
search.addEventListener("input", searchTheBooks);

function searchTheBooks(e) {
  let inputValue = search.value;
  let tableBody = document.getElementById("tableBody");
  let n = tableBody.rows.length;
  for (let i = 0; i < n; i++) {
    let text = tableBody.rows[i].innerText;
    if(text.includes(inputValue)){
      // document.getElementById(i).style.display;
      tableBody.rows[i].style.display = '';
      console.log(true);
    }else{
      tableBody.rows[i].style.display = 'none';
      console.log(false);
    }
  }
}

// Function to delete a book
function deleteNote(id) {
  let localBooks = localStorage.getItem("books");
  let localBookObj;
  if (localBooks == null) {
    localBookObj = [];
  } else {
    localBookObj = JSON.parse(localBooks);
  }

  let bookElem = document.getElementById(id);
  localBookObj.splice(id, 1);
  localStorage.setItem("books", JSON.stringify(localBookObj));
  display.add();
}

// implementation of Validate function
function validate(book) {
  if (book.name.length < 2 || book.author.length < 2) return false;
  else return true;
}

// add Submit event listener to form 'id - libraryForm'
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

// function that will run when we click submit button on form
function libraryFormSubmit(e) {
  //   console.log("You have submitted library form");
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("authorName").value;

  // fiction, programming, cooking
  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let cooking = document.getElementById("cooking");
  let type;
  //   console.log(fiction.value);
  //   console.log(programming.value);
  //   console.log(cooking.value);
  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
  }

  // adding to the local storage
  let localBook = localStorage.getItem("books");
  if (localBook == null) {
    localBookObj = [];
  } else {
    localBookObj = JSON.parse(localBook);
  }
  let book = new Book(name, author, type);
  //   console.log(book);

  let temp = validate(book);
  // console.log(temp);
  console.log(temp);
  if (temp == true) {
    localBookObj.push(book);
    localStorage.setItem("books", JSON.stringify(localBookObj));
    display.add();
    // clearing form when we done add;
    display.clear();
    // Show Successs message to the user
    display.show("success", "Your book has been added");
  } else {
    // show error to user
    display.show("warning", "Sorry you cannot add this book");
  }
  e.preventDefault();
}
