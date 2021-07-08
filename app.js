// "use strict";
// Book Constructor

class Book {
  constructor(
    title = "Unknown",
    author = "Unkown",
    pages = "0",
    isRead = "false"
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

// Books Array

let myLibrary = [];

function addToLibrary (newbook) {
  myLibrary.push(newbook);
}

const removeFromLibrary = (bookTitle) =>{
  myLibrary = myLibrary.filter((book) => book.title !== bookTitle);
}

// Popup
const newBookbtn = document.querySelector(".new-book-btn");
const popup = document.querySelector(".popup");
const overlay = document.querySelector(".popup-overlay");


window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePopup();
});

const openPopup = () => {
  form.reset();
  popup.classList.toggle("popup-open");
  overlay.classList.toggle("overlay-open");
}

const closePopup = () => {
  popup.classList.toggle("popup-open");
  overlay.classList.toggle("overlay-open");
}

//Form

const form = document.querySelector(".popup-form")

const addBook = (e) => {
  e.preventDefault();
  addToLibrary(getFromInput());
  updateGrid();
  closePopup();
}

const getFromInput = () => {
  const titleVal = document.querySelector("#title").value;
  const authorVal = document.querySelector("#author").value;
  const pagesVal = document.querySelector("#pages").value;
  const isReadVal = document.querySelector("#is-read").checked;

  return new Book(titleVal, authorVal, pagesVal, isReadVal);
}

// Book Grid

const bookGrid = document.querySelector(".shelf")

function editBooks (e) {
  if (e.target.classList.contains("remove-btn")) {
    removeFromLibrary(e.target.parentNode.firstChild.innerHTML);
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  }
  
}

const updateGrid = () => {
  resetGrid();
  for (let element of myLibrary) {
    createBook(element);
  }
}

const resetGrid = () => {
  bookGrid.innerHTML = "";
}

const createBook = (book) => {
  const bookCard = document.createElement("div");
  const title = document.createElement("h3");
  const author = document.createElement("h3");
  const pages = document.createElement("h3");
  const readButton = document.createElement("button");
  const removeButton = document.createElement("button");

  bookCard.classList.add("book-grid-book-card");
  title.classList.add("book-grid-book-text");
  author.classList.add("book-grid-book-text");
  pages.classList.add("book-grid-book-text");
  readButton.classList.add("button", "is-read-btn");
  removeButton.classList.add("remove-btn");

  title.innerHTML = `<i class="fas fa-book-open"></i> ${book.title}`;
  author.innerHTML = `<i class="far fa-user"></i> ${book.author}`;
  pages.textContent = `${book.pages} pages`
  removeButton.textContent = "Remove";
  if (book.isRead) {
    readButton.textContent = "Read";
    readButton.classList.add("btn-green");
  } else {
    readButton.textContent = "Not Read";
    readButton.classList.add("btn.red")
  }

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(readButton);
  bookCard.appendChild(removeButton);
  bookGrid.appendChild(bookCard);

}

//EVENT LISTENERS
newBookbtn.addEventListener("click", openPopup);
overlay.addEventListener("click", closePopup);
form.addEventListener("submit", addBook);
bookGrid.addEventListener("click", editBooks);
