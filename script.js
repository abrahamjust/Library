// array to store the books
let rowNo = 0;
const myLibrary = [];

// constructor for the book object
function book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

// function to push the book
book.prototype.addBookToLibrary = function() {
    myLibrary.push(this);
}

function displayBooks() {
    resetTable();
    const tableBody = document.querySelector('tbody');
    for(const i of myLibrary) {
        let row = document.createElement('tr');
        row.className = rowNo;
        const col1 = document.createElement('td');
        col1.innerHTML = i.title;
        row.appendChild(col1);
        const col2 = document.createElement('td');
        col2.innerHTML = i.author;
        row.appendChild(col2);
        const col3 = document.createElement('td');
        col3.innerHTML = i.pages;
        row.appendChild(col3);
        const col4 = document.createElement('td');
        col4.innerHTML = i.status;
        row.appendChild(col4);
        let deleteRow = document.createElement('button');
        deleteRow.className = rowNo;
        rowNo++;
        row.appendChild(deleteRow);
        tableBody.appendChild(row);
    }
}

function resetTable() {
    let tableBody = document.querySelector('tbody');
    while(tableBody.firstChild) {
        tableBody.removeChild(tableBody.lastChild);
    }
}

const book1 = new book("Harry Potter and the philosopher's stone", "J.K Rowling", 320, "read");
book1.addBookToLibrary();

const book2 = new book("War and peace", "Leo Tolstoy", 1392, "read");
book2.addBookToLibrary();
displayBooks();
