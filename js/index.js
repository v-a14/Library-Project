console.log("Starting making our project");

// book Class
class Book {
  // making constructor 
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}

// Display Class, contains most of the function 

class Display {
  //implementation of addition function using local storage
  // this function basically shows the elements on the front page
  // vaise is function ka naam toh display type kuch hona chaiye tha, because yeh sirf display hi kr rha h  
  add() {
    // getting books present in local storage 
    // books are basically stored as string using JSON 
    let books = localStorage.getItem("books");
    // making local object that holds the total books, after Parsing using JSON
    let localBookObj;
    // if no books, obj will be empty
    if (books == null) {
      localBookObj = [];
    } else {
      // converting string of books, into array type object and storing 
      localBookObj = JSON.parse(books);
    }

    // making empty string, so that it will contain final output of text that need to be displayed 
    let html = "";
    // running complete loop over book object 
    for (let i = 0; i < localBookObj.length; i++) {
      // adding string again and again 
      html += `<tr>
                      <th scope="row" class="content">${i + 1}</th>
                      <td>${localBookObj[i].name}</td>
                      <td>${localBookObj[i].author}</td>
                      <td>${localBookObj[i].type}</td>
                      // this is the button for delete, it will call deleteNote function outside thiis class 
                      <td><button id = "${i}" onclick = "deleteNote(this.id)" class="btn btn-success">Delete Book</button></td>
                </tr>`;
    }
    // getting table body element 
    let tableBody = document.getElementById("tableBody");
    // changing the complete internal html of table body 
    // this will happen again and again for every call of add function 
    tableBody.innerHTML = html;
  }

  // implementation of clear function, this function clears the screen when we add the book into local storage 
  clear() {
    let libraryForm = document.getElementById("libraryForm");
    // calling reset function to reset the div element 
    libraryForm.reset();
  }

  // implemantaion of show function, this will display success or failure message upon pressing "add book" button 
  show(type, showMessage) {
    let message = document.getElementById("message");
    // if type is 'success' it will show green colour message 
    // otherwise if 'warning' it will display red colour message 
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message:  </strong><b>${showMessage}</b>
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                         </div>`;
  }
}
// this is the end of Display class 



// Function to search the books
// creating an element that can form id
let search = document.getElementById("searchTxt");
// whenever we type anything in search box, it will again and again be called 
search.addEventListener("input", searchTheBooks);
// defining the function that will be executed
function searchTheBooks(e) {
  // this is the value that is added in search box, it will change again and again, as soon as something is typed or deleted from the search box 
  let inputValue = search.value;
  // getting hold of the table body, that is going to be manipulated 
  let tableBody = document.getElementById("tableBody");
  // getting the table rows length 
  let n = tableBody.rows.length;
  // running loop for every row 
  for (let i = 0; i < n; i++) {
    // getting all the text for every row, 
    // text that is present in all the colums 
    // we are getting this, because we will use this to find out whether this row should be displayed or not 
    let text = tableBody.rows[i].innerText;
    // if the inputValue is present in this row value, then this row will be visible 
    if(text.includes(inputValue)){
      tableBody.rows[i].style.display = '';
      // console.log(true);
    }else{
      // otherwise hide the display of this row 
      tableBody.rows[i].style.display = 'none';
      // console.log(false);
    }
  }
}


// Function to delete a book
// we are getting the id of the row, that is need to be deleted  
function deleteNote(id) {
  // getting all the books as a string 
  let book = localStorage.getItem("books");
  let localBookObj;
  // if no book is not present because, user can only delete a book when it is present in library, otherwise delete option would not be there 
  // converting book string into the object 
  localBookObj = JSON.parse(book);

  // deleting the element with given id, using splice function 
  localBookObj.splice(id, 1);
  // storing back again in the form of string in the local storage 
  localStorage.setItem("books", JSON.stringify(localBookObj));
  // again calling add or you can say that display function so that books can be displayed again 
  display.add();
}


// implementation of Validate function
function validate(book) {
  if (book.name.length < 2 || book.author.length < 2) return false;
  else return true;
}

// creating an object of Display class and naming it as display 
let display = new Display()
// this is initial call, when page is opened and suppose there is already items in local storage, this will display this 
// local storage can have previous items because if you already have visited the website 
display.add();


/*---------------Main Coding Part------------------------*/

// add Submit event listener to form 'id - libraryForm'
let libraryForm = document.getElementById("libraryForm");
// as soon as someone click add book button, then this will get activated 
libraryForm.addEventListener("submit", libraryFormSubmit);

// function that will run when we click submit button on form
function libraryFormSubmit(e) {
  //   console.log("You have submitted library form");
  // getting all the values, name, author name, type of book 
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("authorName").value;

  // fiction, programming, cooking
  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let cooking = document.getElementById("cooking");
  let type;

  // Logic to get, what is this type of book 
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
  if (temp == true) {
    // if book gets validated, then push into the book object 
    localBookObj.push(book);
    // again setting local storage from book object 
    localStorage.setItem("books", JSON.stringify(localBookObj));
    // now calling add to display the books 
    display.add();
    // clearing form when we done add;
    display.clear();
    // Show Successs message to the user
    display.show("success", "Your book has been added");
  } else {
    // show error to user
    display.show("warning", "Sorry you cannot add this book");
  }
  // this is added to prevent the default behaviour of form, so that it can be easily viewed 
  e.preventDefault();
}
