/*Document selectors UI*/
const library = document.querySelector(".libraryObjectGrid");
const openBookForm = document.querySelector(".openBookForm");
const bookForm = document.querySelector("#bookSubmit");
const submitButton = document.querySelector("#formSubmitButton");

/*Create an array to hold the book objects*/
let myLibrary = [];

/*Create a function that saves the array to localstorage*/
function saveToLocalStorage() {
    localStorage.setItem('Books', JSON.stringify(myLibrary))
}

/*Retrieve localstorage*/
const str = localStorage.getItem('Books');
let storedBookArray = JSON.parse(str);

if (str != null) {
    /*Use spread operator to add the stored array to the myLibrary array*/
    myLibrary.push(...storedBookArray);
}

/*Create a book object constructor*/
function Book(listNum, title, author, pageCount, read) {
    this.listNum = listNum
    this.title = title,
    this.author = `by ${author}`,
    this.pageCount = `${pageCount} pages`,
    read ? this.read = "Read" : this.read = "Not Read";
};

/*Create a function that iterates through the array holding the objects.
For each object in the array, create and append an element to the parent in the document.*/
function addBookToLibrary(arr) {
    arr.forEach(element => {
        let bookGridSquare = document.createElement('ol');
        library.appendChild(bookGridSquare);
        bookGridSquare.className = "book";

        for (const property in element) {
            let bookProperty = document.createElement('li');
            bookProperty.className = "bookInfo";
            bookGridSquare.appendChild(bookProperty);
            bookProperty.textContent = element[property];
        }

        bookGridSquare.firstChild.style.display = "none";
        let deleteButton = document.createElement('button');
        deleteButton.className = "deleteBook";
        bookGridSquare.appendChild(deleteButton);
    });
};

addBookToLibrary(myLibrary);

/*Create a function that adds an object to the array upon submitting form*/
function addBookToMyLibraryArray() {
    /*Reset document grid*/
    removeChildren();
    
    /*declare values and construct new object to be added to myLibrary Array*/
    let listNum = myLibrary.length;
    let title = document.querySelector("#bookTitle").value;
    let author = document.querySelector("#bookAuthor").value;
    let pageCount = document.querySelector("#pageCount").value;
    let read = document.querySelector("#bookRead").checked;
    const Books = new Book(listNum, title, author, pageCount, read);
    myLibrary.push(Books);
    addBookToLibrary(myLibrary);

    /*reset form*/
    resetFormValues();
    /*save to local storage*/
    saveToLocalStorage();
    /*activate delete and toggle functions upon submitting book form*/
    deleteFromLibrary();
    toggleRead();
}

/*Create a function that displays and closes a pop-up form*/
function displayBookForm() {
    openBookForm.addEventListener('click', () => {
            bookForm.style.display = "block";

            document.addEventListener('click', (e) => {
                let isClickInside = bookForm.contains(e.target);
                let exceptAddButton = openBookForm.contains(e.target);

                if (!isClickInside && !exceptAddButton) {
                    bookForm.style.display = "none";
                }
            })
    })
}


displayBookForm();

/*Create function that submits the form and prevents default refreshing page */
function preventFormDefault() {
    bookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addBookToMyLibraryArray();
    })
}

preventFormDefault();

/*Create a function to refresh the document grid containing book objects from the array*/
function removeChildren() {
    while (library.firstChild) {
        library.removeChild(library.firstChild);
    }
}

/*Create a function to reset form values*/
function resetFormValues() {
    bookForm.style.display = "none";
    document.querySelector("#bookTitle").value = '';
    document.querySelector("#bookAuthor").value = '';
    document.querySelector("#pageCount").value = '';
    document.querySelector("#bookRead").checked = '';
}

/*Create a function to remove object from array and from document upon clicking delete button*/
function deleteFromLibrary() {
    let deleteButton = document.querySelectorAll('.deleteBook');
    deleteButton.forEach(element => {
        element.addEventListener('click', () => {
            let x = element.parentElement.firstChild.textContent;
            myLibrary.splice(Number(x), 1);

            myLibrary.forEach(e => {
                e.listNum = myLibrary.indexOf(e);
            })

            element.parentElement.remove();
            saveToLocalStorage();
        })
    })
}

deleteFromLibrary();

/*Create a function to toggle between Read and Not read on the book object*/
function toggleRead() {
    let bookGridSquare = document.querySelectorAll('.book');
    bookGridSquare.forEach(element => {
        let readToggle = element.lastChild.previousSibling;
        readToggle.className = 'readToggle';
        (readToggle.textContent == "Read") ? readToggle.style.background = 'green' : readToggle.style.background = 'red';

        readToggle.addEventListener('click', () => {
            (readToggle.textContent == "Read") ? readToggle.textContent = "Not Read" : readToggle.textContent = "Read";
            (readToggle.style.background == 'green') ? readToggle.style.background = 'red' : readToggle.style.background = 'green';
            let x = readToggle.parentElement.firstChild.textContent;
            myLibrary[Number(x)].read = readToggle.textContent;
            saveToLocalStorage();
        }) 
    })
}

toggleRead();


