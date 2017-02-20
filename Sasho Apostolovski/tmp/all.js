import Story from "../js/Story.js"
import Novel from "../js/Novel.js"
import Anthology from "../js/Anthology.js"

let bookSelect = document.getElementById('selectBookType');
let novelForm = document.getElementById('novel');
let anthologyForm = document.getElementById('anthology');
let library = document.getElementById('library');
let addStoryBtn = document.getElementById('addStory');
let novelInputFeedback = document.getElementById('novelInputFeedback');
let anthologyInputFeedback = document.getElementById('anthologyInputFeedback');
let storyList = document.getElementById('storyList');
let paging = document.getElementById('paging');

let tempStories = [];
let id = 0;

// Initial setup of our bookRepository object 
let bookRepository;
function setBooks(books) {
    bookRepository = {
        books: books,
        shownBooks: books,
        pageIndex: 0,
        pageSize: 10,

        nextPage: function() {
          if (this.pageIndex < (this.shownBooks.length / this.pageSize) -1) {
            this.pageIndex++;
          }

        },
        prevPage: function() {
          if (this.pageIndex > 0) {
            this.pageIndex--;
          }
        },

        // Search Feature
        search: function (searchTerm) {
            bookRepository.pageIndex = 0;
            this.shownBooks = this.books.filter(book => {
                let principal = book.author || book.editor;
                if (book.title.toLowerCase().indexOf(searchTerm) !== -1) return true;
                if (principal.toLowerCase().indexOf(searchTerm) !== -1) return true;
                return false;
            })
        },

        // Sort Feature
        sort: function (sortBy) {
            bookRepository.pageIndex = 0;
            if (sortBy === 'novel') {
                this.shownBooks = this.books.filter(book => book.kind == 'novel');
                return;
            }
            if (sortBy === 'anthology') {
                this.shownBooks = this.books.filter(book => book.kind == 'anthology');
                return;
            }
            this.shownBooks = this.books.sort((a, b) => {
                if (sortBy === 'title') {
                    return a.title.localeCompare(b.title);
                }
                else if (sortBy === 'year') {
                    return Number(b.yearOfPublication || b.year) - Number(a.yearOfPublication || a.year);
                }
            });
        }
    }
}

function displayBooks() {
    let books = bookRepository.shownBooks;
    let startIndex = bookRepository.pageIndex * bookRepository.pageSize;
    let endIndex = (bookRepository.pageIndex + 1) * bookRepository.pageSize;
    books = books.slice(startIndex, endIndex);
    console.log(bookRepository.shownBooks);

    let tbody = document.getElementById('library-table');
    tbody.innerHTML = '';
    books.forEach(book => {
        let additionalInfo;
        let principal;
        let review = '';
        let year = book.year || book.yearOfPublication;
        let length = book.length || book.lengthInPages;
        let isbn = book.isbn || "";
        if (book.kind == 'novel') {
            principal = book.author;
            if (!book.series) additionalInfo = "";
            else additionalInfo = `${book.series} (${book.seriesNumber})`;
        }
        else {
            principal = book.editor;
            let firstStoryAuthor = book.stories[0].author;
            if (book.stories.every(story => story.author == firstStoryAuthor)) {
                additionalInfo = `${book.stories.length} stories by ${firstStoryAuthor}`;
            }
            else {
                let numberOfStories = book.stories.filter(story => story.author == firstStoryAuthor);
                additionalInfo = `${numberOfStories.length} stories by ${firstStoryAuthor} and others`;
            }
        }
        if (book.review){
            if (book.review.length <= 50) review = book.review;
            else review = book.review.slice(0, 47) + '...';
        }

        let tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${principal}</td>
        <td>${year} (${book.publisher})</td>
        <td>${length}</td>
        <td>${additionalInfo}</td>
        <td>${isbn}</td>
        <td>${review}</td>
        <td><button type="button" id="delBtn" class="btn btn-danger" data-toggle="modal" data-target=".bd-example-modal-sm">Delete</button></td>
    `;
        tbody.appendChild(tr);
    })
}

function getBooks(file, cb) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', file);

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 400) {
            // Success!
            var data = JSON.parse(xhr.responseText);
            cb(data);
        } else {
            throw new Error('The server returned an error')
        }
    }
    xhr.onerror = function (error) {
        console.log(error)
    };
    xhr.send();
}

// Validation
function validate(members) {
    let errors = document.createDocumentFragment();
    let allGood = true;
    let formFeedback;
    anthologyInputFeedback.innerHTML = '';
    novelInputFeedback.innerHTML = '';
    if (members.hasOwnProperty('stories')) {
        formFeedback = anthologyInputFeedback
        if (members.stories.length < 2) {
            let alert = document.createElement('div');
            alert.className = 'alert alert-danger';
            alert.innerHTML = `<strong>Input Error</strong> Anthology must have at least 2 stories.`
            errors.appendChild(alert);
            allGood = false;
        }
    }
    else formFeedback = novelInputFeedback;
    let isbn = ISBN.parse(members.isbn);          // bower package for ISBN 
    if (members.isbn && (!isbn || !isbn.isIsbn13())) {
        let alert = document.createElement('div');
        alert.className = 'alert alert-danger';
        alert.innerHTML = `<strong>Input Error</strong> Isbn is not valid.`
        errors.appendChild(alert);
        allGood = false;
    }
    let year = members.yearOfPublication
    let currentYear = new Date();
    if (year && (year < 1900 || year > currentYear.getFullYear())) {
        let alert = document.createElement('div');
        alert.className = 'alert alert-danger';
        alert.innerHTML = `<strong>Input error</strong> Year Of Publication should be between 1900 and present year`;
        errors.appendChild(alert);
        allGood = false;
    }
    let pageLength = members.lengthInPages
    if (pageLength && (pageLength < 1 || pageLength > 1000)) {
        let alert = document.createElement('div');
        alert.className = 'alert alert-danger';
        alert.innerHTML = `<strong>Input error</strong> The number of pages should be between 1 and 1000`;
        errors.appendChild(alert);
        allGood = false;
    }
    let title = members.title;
    let principal = members.hasOwnProperty('author') ? members.author : members.editor;
    if (!title || !principal) {
        let alert = document.createElement('div');
        alert.className = 'alert alert-danger';
        alert.innerHTML = `<strong>Input error</strong> Book title and author are required`;
        errors.appendChild(alert);
        allGood = false;
    }
    formFeedback.appendChild(errors);
    return allGood;
}

setBooks([]);

// Series number is disabled if we dont have series
let series = document.getElementById('novelSeries');
let seriesNumber = document.getElementById('novelSeriesNumber');
seriesNumber.disabled = true;
series.addEventListener('input', () => {
    if (series.value) seriesNumber.disabled = false
    else seriesNumber.disabled = true;
})

// Select book type
bookSelect.addEventListener('change', () => {
    let value = bookSelect.value;
    if (value == "novel") {
        library.classList.add('hidden');
        anthologyForm.classList.add('hidden');
        novelForm.classList.remove('hidden');
        paging.classList.add('hidden');
    }
    if (value == "anthology") {
        library.classList.add('hidden');
        novelForm.classList.add('hidden');
        anthologyForm.classList.remove('hidden');
        paging.classList.add('hidden');
    }
});


// Add Novel
let submitNovelBtn = document.getElementById('submitNovel');
submitNovelBtn.addEventListener('click', () => {
    event.preventDefault();
    let title = document.getElementById('novelTitle');
    let author = document.getElementById('novelAuthor');
    let publisher = document.getElementById('novelPublisher');
    let year = document.getElementById('novelYear');
    let lengthInPages = document.getElementById('novelLength');
    let series = document.getElementById('novelSeries');
    let seriesNumber = document.getElementById('novelSeriesNumber');
    let isbn = document.getElementById('novelIsbn');
    let review = document.getElementById('novelReview');

    let novelMembers = {
        title: title.value,
        author: author.value,
        publisher: publisher.value,
        yearOfPublication: year.value,
        lengthInPages: lengthInPages.value,
        isbn: isbn.value,
        review: review.value,
        series: series.value,
        seriesNumber: seriesNumber.value
    }

    if (!validate(novelMembers)) return;

    let novel = new Novel(novelMembers);
    novel.id = ++id;
    bookRepository.books.push(novel);
    let alert = document.createElement('div');
    alert.className = 'alert alert-success';
    alert.innerHTML = `<strong>Great!</strong> The novel was added to the library`;
    novelInputFeedback.appendChild(alert);
    document.getElementById('novelForm').reset();
})


addStoryBtn.addEventListener('click', () => {
    event.preventDefault();
    let storyTitle = document.getElementById('anthologyStoryTitle');
    let storyAuthor = document.getElementById('anthologyStoryAuthor');
    let original = document.getElementById('checkOriginal');
    let story = new Story(storyTitle.value, storyAuthor.value, original.checked);
    tempStories.push(story);
    let li = document.createElement('li')
    li.innerHTML = story.title + ' by ' + story.author;
    storyList.appendChild(li);
    storyTitle.value = '';
    storyAuthor.value = '';
})

// Add Anthology
let submitAnthologyBtn = document.getElementById('submitAnthology');
submitAnthologyBtn.addEventListener('click', () => {
    event.preventDefault();
    let title = document.getElementById('anthologyTitle');
    let editor = document.getElementById('anthologyEditor');
    let publisher = document.getElementById('anthologyPublisher');
    let year = document.getElementById('anthologyYear');
    let lengthInPages = document.getElementById('anthologyLength');
    let isbn = document.getElementById('anthologyIsbn');
    let review = document.getElementById('anthologyReview');

    let anthologyMembers = {
        title: title.value,
        publisher: publisher.value,
        yearOfPublication: year.value,
        lengthInPages: lengthInPages.value,
        isbn: isbn.value,
        stories: tempStories,
        review: review.value,
        editor: editor.value,
    }

    if (!validate(anthologyMembers)) return;

    let anthology = new Anthology(anthologyMembers);
    anthology.id = ++id;
    bookRepository.books.push(anthology);
    document.getElementById('anthologyForm').reset();
    storyList.innerHTML = '';
    tempStories = [];
    let alert = document.createElement('div');
    alert.className = 'alert alert-success';
    alert.innerHTML = `<strong>Great!</strong> The anthology was added to the library`;
    anthologyInputFeedback.appendChild(alert);
});

// Library
let viewLibrary = document.getElementById('viewLibrary');
viewLibrary.addEventListener('click', function () {
    event.preventDefault();
    novelForm.classList.add('hidden');
    anthologyForm.classList.add('hidden');
    library.classList.remove('hidden');
    paging.classList.remove('hidden');
    bookSelect.value = "disabled";
    displayBooks();
});


// Sorting
let sortSelection = document.getElementById('select-sort');
sortSelection.addEventListener('change', () => {
    bookRepository.sort(sortSelection.value);
    displayBooks();
});

// Search books
let searchInput = document.getElementById('searchInput');
let searchBtn = document.getElementById('search')
searchBtn.addEventListener('click', () => {
    event.preventDefault();
    let searchTerm = searchInput.value.toLowerCase();
    bookRepository.search(searchTerm);
    displayBooks();
})

// Delete book
let bookToDeleteIndex;
library.addEventListener('click', () => {
    // event.preventDefault();
    let clickedElement = event.target;
    if (clickedElement.id == "delBtn") {
        let tr = clickedElement.parentNode.parentNode;
        let index = parseInt(tr.children[0].innerText) - 1;
        bookToDeleteIndex = index;
    }
})
let deleteBtn = document.getElementById('deleteBtn');
let closeModal = document.getElementById('closeModal');
deleteBtn.addEventListener('click', () => {
    let book = bookRepository.books[bookToDeleteIndex];
    let shownBookToDeleteIndex = bookRepository.shownBooks.indexOf(book);
    bookRepository.books.splice(bookToDeleteIndex, 1);
    bookRepository.shownBooks.splice(shownBookToDeleteIndex, 1);
    closeModal.click();
    displayBooks();
})

// Load Books from JSON
let loadBooksBtn = document.getElementById('loadBooks');
let booksFile = 'https://raw.githubusercontent.com/sedc-codecademy/sedc5-frontend-exam/master/books.json';
loadBooksBtn.addEventListener('click', () => {
    console.log('here');
    getBooks(booksFile, function (books) {
        books.forEach(book => book.id = ++id);
        bookRepository.books = bookRepository.books.concat(books);
        bookRepository.shownBooks = bookRepository.books.concat(books);
        displayBooks();
    })
})

//Paging
let previousBtn = document.getElementById('prev');
let nextBtn = document.getElementById('next');

previousBtn.addEventListener('click', () => {
    bookRepository.prevPage();
    displayBooks();
})

nextBtn.addEventListener('click', () => {
    bookRepository.nextPage();
    displayBooks();
})