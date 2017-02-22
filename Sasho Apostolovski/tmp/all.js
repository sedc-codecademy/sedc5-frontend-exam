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
let loadBooksBtn = document.getElementById('loadBooks');

let tempStories = [];
let id = 0;

// Initial setup of our bookRepository object 
let bookRepository = {
    books: [],
    shownBooks: [],
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

    // Filter Feature    --Needs refactoring                   
    filter: function(filterBy, options) {
        bookRepository.pageIndex = 0;
        if (filterBy == 'year') {
            this.shownBooks = this.books.filter(book => { 
                let thisYear = new Date().getFullYear();
                let fromYear = options.from || 1900;
                let toYear = options.to || thisYear;
                if (book.year && (book.year > fromYear && book.year < toYear))
                    return true;
                else
                    return false
            }).sort((a, b) => a.year - b.year);
            return;
        }
        if (filterBy == 'filterAllNovels') {
            this.shownBooks = this.books.filter(book => book.kind == 'novel');
            return;
        }
        if (filterBy == 'filterPartNovels') {
            this.shownBooks = this.books.filter(book => { 
                let hasSeries = book.hasOwnProperty('series') && book.series;
                return book.kind == 'novel' && hasSeries;
            });
            return;
        }
        if (filterBy == 'filterSpecificNovel') {
            this.shownBooks = this.books.filter(book => { 
                let hasSeries = book.hasOwnProperty('series') && book.series;
                return hasSeries && (book.series.toLowerCase().indexOf(options.seriesName) != -1);
            });
            return;
        }
        if (filterBy == 'filterAllAnthologies') {
            this.shownBooks = this.books.filter(book => book.kind == 'anthology');
            return;
        }
        if (filterBy == 'filterAnthOriginal') {
            this.shownBooks = this.books.filter(book => {
                return book.kind == 'anthology' &&
                        book.stories.every(story => story.original);
            });
            return;
        }

    },

    // Sort Feature
    sort: function(sortBy) {
        bookRepository.pageIndex = 0;
        if (sortBy == 'additionalInfo') {
            this.shownBooks = this.shownBooks.sort((a, b) => {
                return b.kind == 'novel' && a.kind == 'anthology' ? 1 : 0;
            }).sort((a, b) => {
                if ((b.kind == 'novel' && !b.series) && (a.kind != 'novel' || a.series))
                    return 1;
                return 0;
            });
            return;
        }
        this.shownBooks = this.shownBooks.sort((a, b) => {
            switch (sortBy) {
                case 'id':
                case 'length':
                    return Number(a[sortBy]) - Number(b[sortBy]);
                    break;
                case 'year':
                    return Number(b.year) - Number(a.year);
                    break;
                case 'principal':
                    let aPrincipal = a.author || a.editor;
                    let bPrincipal = b.author || b.editor;
                    return aPrincipal.localeCompare(bPrincipal);
                    break;
                case 'isbn':
                    let aIsbn = a.isbn || "";
                    let bIsbn = b.isbn || "";
                    return aIsbn.localeCompare(bIsbn);
                    break;
                default:
                    return a[sortBy].localeCompare(b[sortBy]);
                    break;
            }
        });
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
        let year = book.year;
        let length = book.length;
        let isbn = book.isbn || "";
        if (book.kind == 'novel') {
            principal = book.author;
            if (!book.series) additionalInfo = "";
            else additionalInfo = `${book.series} (#${book.seriesNumber})`;
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

    let pageNumber = document.getElementById('pageNumber');
    console.log(pageNumber);
    pageNumber.innerText = `Page: ${bookRepository.pageIndex + 1}`
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
        alert.innerHTML = `<strong>Input Error</strong> Isbn is not valid. Valid isbn would be (ex. 978-1-56619-909-4)`
        errors.appendChild(alert);
        allGood = false;
    }
    let year = members.year;
    let currentYear = new Date();
    if (year && (year < 1900 || year > currentYear.getFullYear())) {
        let alert = document.createElement('div');
        alert.className = 'alert alert-danger';
        alert.innerHTML = `<strong>Input error</strong> Year Of Publication should be between 1900 and present year`;
        errors.appendChild(alert);
        allGood = false;
    }
    let pageLength = members.length;
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

// setBooks([]);

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
        loadBooksBtn.classList.add('hidden');
        anthologyForm.classList.add('hidden');
        novelForm.classList.remove('hidden');
    }
    if (value == "anthology") {
        loadBooksBtn.classList.add('hidden');
        library.classList.add('hidden');
        novelForm.classList.add('hidden');
        anthologyForm.classList.remove('hidden');
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
    let length = document.getElementById('novelLength');
    let series = document.getElementById('novelSeries');
    let seriesNumber = document.getElementById('novelSeriesNumber');
    let isbn = document.getElementById('novelIsbn');
    let review = document.getElementById('novelReview');

    let novelMembers = {
        title: title.value,
        author: author.value,
        publisher: publisher.value,
        year: year.value,
        length: length.value,
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
    let length = document.getElementById('anthologyLength');
    let isbn = document.getElementById('anthologyIsbn');
    let review = document.getElementById('anthologyReview');

    let anthologyMembers = {
        title: title.value,
        publisher: publisher.value,
        year: year.value,
        length: length.value,
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
    loadBooksBtn.classList.remove('hidden');
    bookSelect.value = "disabled";
    bookRepository.shownBooks = bookRepository.books.slice(0);
    console.log(bookRepository.books);
    displayBooks();
});


// Sorting
let bookTableHead = document.getElementById('bookTableHead');
bookTableHead.addEventListener('click', () => {
    event.preventDefault();
    if (event.target.tagName == 'A') {
        console.log(event.target.id);
        event.stopPropagation();
        bookRepository.sort(event.target.id);
        displayBooks();
    }
})

// Filtering
function filterByPublication() {
  let filterFrom = parseInt(document.getElementById('filterFrom').value);
  let filterTo = parseInt(document.getElementById('filterTo').value);
  let filterOptions = {from: filterFrom, to: filterTo};
  
  bookRepository.filter('year', filterOptions);
}

function filterByNovels() {
  let filterBy = document.querySelector('input[name="filterByNovelsRadio"]:checked').id;
  let filterOptions = {};
  if (filterBy == 'filterSpecificNovel') {
      filterOptions.seriesName = seriesNameToFilterBy.value.toLowerCase();
  }
  
  bookRepository.filter(filterBy, filterOptions);
}

function filterByAnthology() {
  let filterBy = document.querySelector('input[name="filterByAnthologiesRadio"]:checked').id;
  
  bookRepository.filter(filterBy, filterOptions);
}

let filterSelector = document.getElementById('filterSelector');
let filterBtn = document.getElementById('filter');
let closeFilterOptionsBtn = document.getElementById('closeFilterOptions');
let filterByPubForm = document.getElementById('filterByPeriodForm');
let filterByNovelForm = document.getElementById('filterByNovelsForm');
let filterByAnthForm = document.getElementById('filterByAnthForm');

let filterSpecificNovel = document.getElementById('filterSpecificNovel');
let seriesNameToFilterBy = document.getElementById('seriesNameToFilterBy');
filterSpecificNovel.addEventListener('change', () => {
    if (filterSpecificNovel.checked == true)
        seriesNameToFilterBy.disabled = false;
})

filterSelector.addEventListener('click', () => {
    let selected = filterSelector.value;
    if (selected == 'filterByPub') {
        filterByPubForm.classList.remove('hidden');
        filterByNovelForm.classList.add('hidden');
        filterByAnthForm.classList.add('hidden');
    }
    if (selected == 'filterByNovels') {
        filterByNovelForm.classList.remove('hidden');
        filterByPubForm.classList.add('hidden');
        filterByAnthForm.classList.add('hidden');
    }
    if (selected == 'filterByAnthologies') {
        filterByAnthForm.classList.remove('hidden');
        filterByNovelForm.classList.add('hidden');
        filterByPubForm.classList.add('hidden');
    }
})

filterBtn.addEventListener('click', () => {
    let selected = filterSelector.value;
    if (selected == 'filterByPub') {
        filterByPublication();
        displayBooks();
    }
    if (selected == 'filterByNovels') {
        filterByNovels();
        displayBooks();
    }
    if (selected == 'filterByAnthologies') {
        filterByAnthology();
        displayBooks();
    }
    filterByAnthForm.classList.add('hidden');
    filterByNovelForm.classList.add('hidden');
    filterByPubForm.classList.add('hidden');
    filterSelector.value = 'disabled';
    closeFilterOptionsBtn.click();
})

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
let bookToDeleteId;
library.addEventListener('click', () => {
    // event.preventDefault();
    let clickedElement = event.target;
    if (clickedElement.id == "delBtn") {
        let tr = clickedElement.parentNode.parentNode;
        bookToDeleteId = parseInt(tr.children[0].innerText);
    }
})
let deleteBtn = document.getElementById('deleteBtn');
let closeModal = document.getElementById('closeModal');
deleteBtn.addEventListener('click', () => {
    let book = bookRepository.books.find(book => book.id == bookToDeleteId)
    let bookToDeleteIndex = bookRepository.books.indexOf(book);
    let shownBookToDeleteIndex = bookRepository.shownBooks.indexOf(book);
    bookRepository.shownBooks = bookRepository.shownBooks.slice(0); // disconnect from bookRepository.books
    bookRepository.books.splice(bookToDeleteIndex, 1);
    bookRepository.shownBooks.splice(shownBookToDeleteIndex, 1);
    closeModal.click();
    displayBooks();
})

// Load Books from JSON
let booksFile = 'https://raw.githubusercontent.com/sedc-codecademy/sedc5-frontend-exam/master/books.json';
loadBooksBtn.addEventListener('click', () => {
    console.log('here');
    getBooks(booksFile, function (books) {
        books.forEach(book => book.id = ++id);
        bookRepository.books = bookRepository.books.concat(books);
        bookRepository.shownBooks = bookRepository.books.slice(0);
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