const myLibrary = [];
const dialog = document.getElementById('dialog');
const addBookPrompt = document.getElementById('addBookPrompt');

class Book {
  constructor(name, author, pages, hasRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.info = function () {
      return `${this.name} by ${this.author}, ${this.pages} pages, ${this.hasRead ? 'read' : 'not read yet'}`;
    };
  }
}

function createBook() {
  const name = document.getElementById('book').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const hasRead = document.getElementById('status').value === 'read';
  const book = new Book(name, author, pages, hasRead);
  addBookToLibrary(book);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  const container = document.getElementById('container');
  container.innerHTML = '';
  myLibrary.forEach((book, index) =>   {
    const div = document.createElement('div');
    const info = document.createElement('p');
    info.textContent = book.info();
    div.appendChild(info);
    const changeStatusButton = document.createElement('button');
    changeStatusButton.classList.add('change-status');
    changeStatusButton.textContent = 'Change Status';
    changeStatusButton.addEventListener('click', () => {
      book.hasRead = !book.hasRead;
      info.textContent = book.info();
    });
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      myLibrary.splice(index, 1);
      displayBooks();
    });
  div.appendChild(changeStatusButton);
  div.appendChild(removeButton);
  container.appendChild(div);
  });
}

document.getElementById('submit').addEventListener('click', (event) => {
  event.preventDefault();
  dialog.close(); 
  createBook();
  displayBooks(); 
});

addBookPrompt.addEventListener('click', (event) => {
  event.preventDefault();
  dialog.showModal();
})

