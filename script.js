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

book.prototype.changeStatus = function() {
    let status = this.status;
    this.status = status.toLowerCase() === "read"? "Not read yet" : "Read";
    displayBooks();
}

function displayBooks() {
    resetTable();
    const tableBody = document.querySelector('tbody');
    for(const i of myLibrary) {
        // creating the row
        let row = document.createElement('tr');
        row.className = rowNo;

        //creating the columns
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

        // deletion button
        let deleteRow = document.createElement('td');
        deleteRow.className = 'deleteDiv';
        let deleteButton = document.createElement('button');
        deleteButton.className = "Delete";
        deleteButton.innerHTML = "Delete";
        deleteButton.setAttribute("data-index", rowNo)
        deleteRow.appendChild(deleteButton);
        row.appendChild(deleteRow);

        // status change button
        let changeStatus = document.createElement('td');
        changeStatus.className = 'changeStatus';
        let statusButton = document.createElement('button');
        statusButton.className = "Status";
        statusButton.innerHTML = "Change Status";
        statusButton.setAttribute("data-index", rowNo)
        changeStatus.appendChild(statusButton);
        row.appendChild(changeStatus);

        // updating rowNo and appending the row to the table body
        rowNo++;
        tableBody.appendChild(row);
    }

    // reattach the event listeners
    attatchEventListeners();
}

function resetTable() {
    rowNo = 0;
    let tableBody = document.querySelector('tbody');
    while(tableBody.firstChild) {
        tableBody.removeChild(tableBody.lastChild);
    }
}

function deleteRow(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

const book1 = new book("Harry Potter and the philosopher's stone", "J.K Rowling", 320, "Read");
book1.addBookToLibrary();

const book2 = new book("War and peace", "Leo Tolstoy", 1392, "Read");
book2.addBookToLibrary();
displayBooks();

function attatchEventListeners() {
    const deleteButtons = document.querySelectorAll('.Delete');
    deleteButtons.forEach((deleteButtons) => {
        deleteButtons.addEventListener('click', () => {
            let index = deleteButtons.getAttribute("data-index");
            deleteRow(index);
        });
    });

    const statusButton = document.querySelectorAll('.Status');
    statusButton.forEach((statusButton) => {
        statusButton.addEventListener('click', () => {
            let index = statusButton.getAttribute("data-index");
            myLibrary[index].changeStatus();
        });
    });
}

let add = document.querySelector('.NewBook');
let close = document.querySelector('.Close');
let dialog = document.querySelector('dialog');

add.addEventListener('click', () => {
    dialog.showModal();
})

close.addEventListener('click', () => {
    dialog.close();
})