// array to store the books
// let rowNo = 0;
// const myLibrary = [];

// changes regular object to class
class Book {
    static rowNo = 0;
    static myLibrary = [];
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    addBookToLibrary() {
        Book.myLibrary.push(this);
        Book.displayBooks();
    }

    changeStatus() {
        let status = this.status;
        this.status = status.toLowerCase() === "read"? "Not read yet" : "Read";
        Book.displayBooks();
    }

    static displayBooks() {
        Book.resetTable();
        const tableBody = document.querySelector('tbody');
        for(const i of Book.myLibrary) {
            // creating the row
            let row = document.createElement('tr');
            row.className = Book.rowNo;

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
            // use set attribute to set the index to the buttons themselves for easiness to know what book to operate upon
            deleteButton.setAttribute("data-index", Book.rowNo)
            deleteRow.appendChild(deleteButton);
            row.appendChild(deleteRow);

            // status change button
            let changeStatus = document.createElement('td');
            changeStatus.className = 'changeStatus';
            let statusButton = document.createElement('button');
            statusButton.className = "Status";
            statusButton.innerHTML = "Change Status";
            statusButton.setAttribute("data-index", Book.rowNo)
            changeStatus.appendChild(statusButton);
            row.appendChild(changeStatus);

            // updating rowNo and appending the row to the table body
            Book.rowNo++;
            tableBody.appendChild(row);
        }

        // reattach the event listeners
        Book.attatchEventListeners();
    }

    static resetTable() {
        Book.rowNo = 0;
        let tableBody = document.querySelector('tbody');
        while(tableBody.firstChild) {
            tableBody.removeChild(tableBody.lastChild);
        }
    }

    static deleteRow(index) {
        Book.myLibrary.splice(index, 1);
        Book.displayBooks();
    }

    static attatchEventListeners() {
        // use the get attribute to get the index set during the button creation in display table function
        // for the delete buttons
        const deleteButtons = document.querySelectorAll('.Delete');
        deleteButtons.forEach((deleteButtons) => {
            deleteButtons.addEventListener('click', () => {
                let index = deleteButtons.getAttribute("data-index");
                Book.deleteRow(index);
            });
        });
    
        // for the status buttons
        const statusButton = document.querySelectorAll('.Status');
        statusButton.forEach((statusButton) => {
            statusButton.addEventListener('click', () => {
                let index = statusButton.getAttribute("data-index");
                Book.myLibrary[index].changeStatus();
            });
        });
    }
}

// for the form part
let add = document.querySelector('.NewBook');
let close = document.querySelector('.Close');
let dialog = document.querySelector('dialog');
let form = document.querySelector('form');

// open the dialog box
add.addEventListener('click', () => {
    dialog.showModal();
})

// close the dialog box
close.addEventListener('click', () => {
    dialog.close();
})

// when submit button is pressed
form.addEventListener('submit', function(event) {
    // to prevent the submit button from looking for a server by default
    event.preventDefault();
    
    // getting the values and validating them
    let titleInput = document.getElementById('Title');
    let title;
    if(titleInput.validity.valueMissing) {
        missingValueError(titleInput);
        titleInput.reportValidity();
        return;
    } else {
        titleInput.setCustomValidity('');
        title = titleInput.value;
    }

    let authorInput = document.getElementById('Author');
    let author;
    if(authorInput.validity.valueMissing) {
        missingValueError(authorInput);
        authorInput.reportValidity();
        return;
    } else {
        authorInput.setCustomValidity('');
        author = authorInput.value;
    }
    let pagesInput = document.getElementById('Pages');
    let pages;
    if(pagesInput.validity.valueMissing) {
        missingValueError(pagesInput);
        pagesInput.reportValidity();
        return;
    } else {
        pagesInput.setCustomValidity('');
        pages = pagesInput.value;
    }
    let statusInput = document.getElementById('Status');
    let status;
    if(statusInput.validity.valueMissing) {
        missingValueError(statusInput);
        statusInput.reportValidity();
        return;
    } else {
        status = statusInput.value;
        if(status.toLowerCase() != 'read' && status.toLowerCase() != 'not read') {
            statusInput.setCustomValidity("the input must be either read / not read");
            statusInput.reportValidity();
            return;
        } else {
            statusInput.setCustomValidity('');
        }
    }

    // adding a new book to the library
    let newBook = new Book(title, author, pages, status);
    newBook.addBookToLibrary();

    // close dialog box
    dialog.close();

    // Clear form fields
    event.target.reset();
});

function missingValueError(element) {
    element.setCustomValidity("enter value for this field, missing values not allowed");
}

// defaults
const book1 = new Book("Harry Potter and the philosopher's stone", "J.K Rowling", 320, "Read");
book1.addBookToLibrary();

const book2 = new Book("War and peace", "Leo Tolstoy", 1392, "Read");
book2.addBookToLibrary();
Book.displayBooks();


// REGULAR OBJECT ANSWER

// constructor for the book object
// function book(title, author, pages, status) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.status = status;
// }

// function to push the book
// book.prototype.addBookToLibrary = function() {
//     myLibrary.push(this);
//     displayBooks();
// }

// changing the read/not read status
// book.prototype.changeStatus = function() {
//     let status = this.status;
//     this.status = status.toLowerCase() === "read"? "Not read yet" : "Read";
//     displayBooks();
// }

// displaying the books
// function displayBooks() {
//     resetTable();
//     const tableBody = document.querySelector('tbody');
//     for(const i of myLibrary) {
//         // creating the row
//         let row = document.createElement('tr');
//         row.className = rowNo;

//         //creating the columns
//         const col1 = document.createElement('td');
//         col1.innerHTML = i.title;
//         row.appendChild(col1);
//         const col2 = document.createElement('td');
//         col2.innerHTML = i.author;
//         row.appendChild(col2);
//         const col3 = document.createElement('td');
//         col3.innerHTML = i.pages;
//         row.appendChild(col3);
//         const col4 = document.createElement('td');
//         col4.innerHTML = i.status;
//         row.appendChild(col4);

//         // deletion button
//         let deleteRow = document.createElement('td');
//         deleteRow.className = 'deleteDiv';
//         let deleteButton = document.createElement('button');
//         deleteButton.className = "Delete";
//         deleteButton.innerHTML = "Delete";
//         // use set attribute to set the index to the buttons themselves for easiness to know what book to operate upon
//         deleteButton.setAttribute("data-index", rowNo)
//         deleteRow.appendChild(deleteButton);
//         row.appendChild(deleteRow);

//         // status change button
//         let changeStatus = document.createElement('td');
//         changeStatus.className = 'changeStatus';
//         let statusButton = document.createElement('button');
//         statusButton.className = "Status";
//         statusButton.innerHTML = "Change Status";
//         statusButton.setAttribute("data-index", rowNo)
//         changeStatus.appendChild(statusButton);
//         row.appendChild(changeStatus);

//         // updating rowNo and appending the row to the table body
//         rowNo++;
//         tableBody.appendChild(row);
//     }

//     // reattach the event listeners
//     attatchEventListeners();
// }

// resetting the table
// function resetTable() {
//     rowNo = 0;
//     let tableBody = document.querySelector('tbody');
//     while(tableBody.firstChild) {
//         tableBody.removeChild(tableBody.lastChild);
//     }
// }

// deleting the row
// function deleteRow(index) {
//     myLibrary.splice(index, 1);
//     displayBooks();
// }

// setting up event listeners (doing this in a function cause event listeners are only set once. Once gone they have to be reset. So put them in a function and call them after creating the table as if any row is deleted, the event listeners for that row have to be reset)
// function attatchEventListeners() {
//     // use the get attribute to get the index set during the button creation in display table function
//     // for the delete buttons
//     const deleteButtons = document.querySelectorAll('.Delete');
//     deleteButtons.forEach((deleteButtons) => {
//         deleteButtons.addEventListener('click', () => {
//             let index = deleteButtons.getAttribute("data-index");
//             deleteRow(index);
//         });
//     });

//     // for the status buttons
//     const statusButton = document.querySelectorAll('.Status');
//     statusButton.forEach((statusButton) => {
//         statusButton.addEventListener('click', () => {
//             let index = statusButton.getAttribute("data-index");
//             myLibrary[index].changeStatus();
//         });
//     });
// }

