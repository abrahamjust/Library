// array to store the books
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
    for(const i of myLibrary) {
        console.log(`Name of the book: ${i.title}\nAuthor: ${i.author}\nPages: ${i.pages}\nstatus: ${i.status}\n\n`);
    }
}

const book1 = new book("Harry Potter and the philosopher's stone", "J.K Rowling", 320, "read");
book1.addBookToLibrary();

const book2 = new book("War and peace", "Leo Tolstoy", 1392, "read");
book2.addBookToLibrary();
displayBooks();
