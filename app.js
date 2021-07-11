const mainDiv = document.querySelector(".container");
const newBtn = document.getElementById("newbook-btn");
const form = document.querySelector(".form-container");
const addBookBtn = document.querySelector(".addBtn");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pageInput = document.getElementById("pages");
const readInput = document.getElementById("read");
const cardContainer = document.getElementById("card-container");
const formCloseBtn = document.getElementById("close-btn");
const randomNum = () => Math.floor(Math.random() * 300);



let myLibrary = [];

class Book {
    constructor(id, title, author, pages, read) {
        this.id = id;
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }


    addBookToLibrary() {
        this.id = randomNum();
        this.title = titleInput.value;
        this.author = authorInput.value;
        this.pages = pageInput.value;
        this.read = readInput.value;

        const newBook = new Book(id, title, author, pages, read);
        myLibrary.push(newBook);
    }
};

addBookToLibrary.prototype = Object.create(Book.prototype);

function displayBooks() {
    myLibrary.forEach(function (Book) {

        // Create Card div

        let card = document.createElement('div');
        card.dataset.index = `${Book.id}`;
        card.classList.add("card");
        cardContainer.appendChild(card);


        // Book properties

        let titleData = document.createElement('h3');
        titleData.innerText = `${Book.title}`
        card.appendChild(titleData);
        let authorData = document.createElement('p');
        authorData.innerText = `${Book.author}`
        card.appendChild(authorData);
        let pageData = document.createElement('p');
        pageData.innerText = `${Book.pages}`;
        card.appendChild(pageData);

        // Read status button

        let editBtn = document.createElement('button');
        editBtn.innerText = `${Book.read}`;
        editBtn.classList.add("status-btn");
        card.appendChild(editBtn);

        // Change read status

        editBtn.addEventListener('click', (e) => {
            let read = e.target;
            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].read === "yes") {
                    myLibrary[i].read = "no";
                    read.innerText = myLibrary[i].read;
                    read.style.backgroundColor = "indianred";
                } else {
                    myLibrary[i].read = "yes";
                    read.innerText = myLibrary[i].read;
                    read.style.backgroundColor = "lawngreen";
                };
            };
        });

        // Remove Button

        let removeBtn = document.createElement('button');
        removeBtn.innerText = "Remove";
        removeBtn.classList.add("remove-btn");
        card.appendChild(removeBtn);

        // Remove html element

        removeBtn.addEventListener('click', (e) => {
            let delElement = e.target.parentElement;
            let delId = delElement.getAttribute('data-index');
            delElement.remove();

            // Remove Book from myLibrary

            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].id == delId) {
                    myLibrary.splice(i, 1);
                };
            };
        });

    });
};

newBtn.addEventListener('click', () => {
    form.style.display = "block";
});


form.addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary();

    // clears card container
    cardContainer.querySelectorAll("div").forEach(e => e.remove());

    displayBooks();
    form.reset();

});

formCloseBtn.addEventListener('click', () => {
    form.style.display = "none";
});






