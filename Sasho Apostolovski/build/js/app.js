(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Book2 = require("../js/Book.js");

var _Book3 = _interopRequireDefault(_Book2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Anthology = function (_Book) {
    _inherits(Anthology, _Book);

    function Anthology(members) {
        _classCallCheck(this, Anthology);

        var _this = _possibleConstructorReturn(this, (Anthology.__proto__ || Object.getPrototypeOf(Anthology)).call(this, members));

        _this.kind = 'anthology';
        _this.editor = members.editor;
        _this.stories = members.stories;
        return _this;
    }

    return Anthology;
}(_Book3.default);

exports.default = Anthology;

},{"../js/Book.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isbnIsValid = require('isbn-validator');

var Book = function Book(members) {
    _classCallCheck(this, Book);

    this.title = members.title;
    this.publisher = members.publisher;
    this.year = members.year;
    this.length = members.length;
    this.isbn = members.isbn;
    this.review = members.review;
}

// set yearOfPublication(year) {
//     this.yearOfPublication = year;
// }
// set yearOfPublication(year) {
//     let minYear = 1900;
//     let thisYear = new Date().getFullYear();
//     if (year > minYear && year < thisYear) this.yearOfPublication = year;
//     throw new Error(`Year must be between 1900 and ${thisYear}` )
// }


// set lengthInPages(length) {
//     let minLength = 1;
//     let maxLength = 1000;
//     if (length > minLength && length < maxLength) {
//         return length;
//     }
//     throw new Error(`Length must be between ${minLength} and ${maxLength}` )

// }

// set isbn(isbn) {
//     return isbnIsValid(isbn);
// }
;

exports.default = Book;

},{"isbn-validator":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Book2 = require('../js/Book.js');

var _Book3 = _interopRequireDefault(_Book2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Novel = function (_Book) {
    _inherits(Novel, _Book);

    function Novel(members) {
        _classCallCheck(this, Novel);

        var _this = _possibleConstructorReturn(this, (Novel.__proto__ || Object.getPrototypeOf(Novel)).call(this, members));

        _this.kind = 'novel';
        _this.author = members.author;
        _this.series = members.series;
        _this.seriesNumber = members.seriesNumber;
        return _this;
    }

    return Novel;
}(_Book3.default);

exports.default = Novel;

},{"../js/Book.js":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Story = function Story(title, author, original) {
    _classCallCheck(this, Story);

    this.title = title;
    this.author = author;
    this.original = original;
};

exports.default = Story;

},{}],5:[function(require,module,exports){
module.exports = isbnValidator;

function isbnValidator(isbnCode){

  var self = this;

  if (typeof(isbnCode) !== "string") return false;

  self.replaceDashes = function format(sequence){
      return sequence.replace(/\-/g, '');
  }

  self.sumOfSequence = function hasRemainder(sequence){
    var numberTenInISBN = "X";
    var sum = 0;
    var factor = 10;
    var characterIndex = 0;
    var isValid = undefined;
    var sequenceEnd = sequence.length - 1;

    for(; factor > 0; factor--, characterIndex++){
      if (characterIndex === sequenceEnd && 
        sequence.charAt(characterIndex) === numberTenInISBN){
        sum += 10 * factor;
      } else {
        sum += sequence.charAt(characterIndex) * factor;
      }
    }
    return sum;
  };

  self.isCorrectFormat = function correctFormat(isbn){
    return isbn.match(/\d\d\d\d\d\d\d\d\d[0-9|xX]$/);
  };

  self.validate = function validate(sequence){
    var isValid = (sumOfSequence(sequence) % 11 === 0) ? true : false;
    return isValid;
  }

  self.isbn = self.replaceDashes(isbnCode);

  if(self.isCorrectFormat(self.isbn)) {
    return self.validate((self.isbn));
  } else {
    return false;
  }
};



},{}],6:[function(require,module,exports){
"use strict";

var _Story = require("../js/Story.js");

var _Story2 = _interopRequireDefault(_Story);

var _Novel = require("../js/Novel.js");

var _Novel2 = _interopRequireDefault(_Novel);

var _Anthology = require("../js/Anthology.js");

var _Anthology2 = _interopRequireDefault(_Anthology);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bookSelect = document.getElementById('selectBookType');
var novelForm = document.getElementById('novel');
var anthologyForm = document.getElementById('anthology');
var library = document.getElementById('library');
var addStoryBtn = document.getElementById('addStory');
var novelInputFeedback = document.getElementById('novelInputFeedback');
var anthologyInputFeedback = document.getElementById('anthologyInputFeedback');
var storyList = document.getElementById('storyList');
var loadBooksBtn = document.getElementById('loadBooks');

var tempStories = [];
var id = 0;

// Initial setup of our bookRepository object 
var bookRepository = {
    books: [],
    shownBooks: [],
    pageIndex: 0,
    pageSize: 10,

    nextPage: function nextPage() {
        if (this.pageIndex < this.shownBooks.length / this.pageSize - 1) {
            this.pageIndex++;
        }
    },
    prevPage: function prevPage() {
        if (this.pageIndex > 0) {
            this.pageIndex--;
        }
    },

    // Search Feature
    search: function search(searchTerm) {
        bookRepository.pageIndex = 0;
        this.shownBooks = this.books.filter(function (book) {
            var principal = book.author || book.editor;
            if (book.title.toLowerCase().indexOf(searchTerm) !== -1) return true;
            if (principal.toLowerCase().indexOf(searchTerm) !== -1) return true;
            return false;
        });
    },

    // Filter Feature    --Needs refactoring                   
    filter: function filter(filterBy, options) {
        bookRepository.pageIndex = 0;
        if (filterBy == 'year') {
            this.shownBooks = this.books.filter(function (book) {
                var thisYear = new Date().getFullYear();
                var fromYear = options.from || 1900;
                var toYear = options.to || thisYear;
                if (book.year && book.year > fromYear && book.year < toYear) return true;else return false;
            }).sort(function (a, b) {
                return a.year - b.year;
            });
            return;
        }
        if (filterBy == 'filterAllNovels') {
            this.shownBooks = this.books.filter(function (book) {
                return book.kind == 'novel';
            });
            return;
        }
        if (filterBy == 'filterPartNovels') {
            this.shownBooks = this.books.filter(function (book) {
                var hasSeries = book.hasOwnProperty('series') && book.series;
                return book.kind == 'novel' && hasSeries;
            });
            return;
        }
        if (filterBy == 'filterSpecificNovel') {
            this.shownBooks = this.books.filter(function (book) {
                var hasSeries = book.hasOwnProperty('series') && book.series;
                return hasSeries && book.series.toLowerCase().indexOf(options.seriesName) != -1;
            });
            return;
        }
        if (filterBy == 'filterAllAnthologies') {
            this.shownBooks = this.books.filter(function (book) {
                return book.kind == 'anthology';
            });
            return;
        }
        if (filterBy == 'filterAnthOriginal') {
            this.shownBooks = this.books.filter(function (book) {
                return book.kind == 'anthology' && book.stories.every(function (story) {
                    return story.original;
                });
            });
            return;
        }
    },

    // Sort Feature
    sort: function sort(sortBy) {
        bookRepository.pageIndex = 0;
        if (sortBy == 'additionalInfo') {
            this.shownBooks = this.shownBooks.sort(function (a, b) {
                return b.kind == 'novel' && a.kind == 'anthology' ? 1 : 0;
            }).sort(function (a, b) {
                if (b.kind == 'novel' && !b.series && (a.kind != 'novel' || a.series)) return 1;
                return 0;
            });
            return;
        }
        this.shownBooks = this.shownBooks.sort(function (a, b) {
            switch (sortBy) {
                case 'id':
                case 'length':
                    return Number(a[sortBy]) - Number(b[sortBy]);
                    break;
                case 'year':
                    return Number(b.year) - Number(a.year);
                    break;
                case 'principal':
                    var aPrincipal = a.author || a.editor;
                    var bPrincipal = b.author || b.editor;
                    return aPrincipal.localeCompare(bPrincipal);
                    break;
                case 'isbn':
                    var aIsbn = a.isbn || "";
                    var bIsbn = b.isbn || "";
                    return aIsbn.localeCompare(bIsbn);
                    break;
                default:
                    return a[sortBy].localeCompare(b[sortBy]);
                    break;
            }
        });
    }
};

function displayBooks() {
    var books = bookRepository.shownBooks;
    var startIndex = bookRepository.pageIndex * bookRepository.pageSize;
    var endIndex = (bookRepository.pageIndex + 1) * bookRepository.pageSize;
    books = books.slice(startIndex, endIndex);
    console.log(bookRepository.shownBooks);

    var tbody = document.getElementById('library-table');
    tbody.innerHTML = '';
    books.forEach(function (book) {
        var additionalInfo = void 0;
        var principal = void 0;
        var review = '';
        var year = book.year;
        var length = book.length;
        var isbn = book.isbn || "";
        if (book.kind == 'novel') {
            principal = book.author;
            if (!book.series) additionalInfo = "";else additionalInfo = book.series + " (#" + book.seriesNumber + ")";
        } else {
            principal = book.editor;
            var firstStoryAuthor = book.stories[0].author;
            if (book.stories.every(function (story) {
                return story.author == firstStoryAuthor;
            })) {
                additionalInfo = book.stories.length + " stories by " + firstStoryAuthor;
            } else {
                var numberOfStories = book.stories.filter(function (story) {
                    return story.author == firstStoryAuthor;
                });
                additionalInfo = numberOfStories.length + " stories by " + firstStoryAuthor + " and others";
            }
        }
        if (book.review) {
            if (book.review.length <= 50) review = book.review;else review = book.review.slice(0, 47) + '...';
        }

        var tr = document.createElement('tr');
        tr.innerHTML = "\n        <td>" + book.id + "</td>\n        <td>" + book.title + "</td>\n        <td>" + principal + "</td>\n        <td>" + year + " (" + book.publisher + ")</td>\n        <td>" + length + "</td>\n        <td>" + additionalInfo + "</td>\n        <td>" + isbn + "</td>\n        <td>" + review + "</td>\n        <td><button type=\"button\" id=\"delBtn\" class=\"btn btn-danger\" data-toggle=\"modal\" data-target=\".bd-example-modal-sm\">Delete</button></td>\n    ";
        tbody.appendChild(tr);
    });

    var pageNumber = document.getElementById('pageNumber');
    console.log(pageNumber);
    pageNumber.innerText = "Page: " + (bookRepository.pageIndex + 1);
}

function getBooks(file, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file);

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 400) {
            // Success!
            var data = JSON.parse(xhr.responseText);
            cb(data);
        } else {
            throw new Error('The server returned an error');
        }
    };
    xhr.onerror = function (error) {
        console.log(error);
    };
    xhr.send();
}

// Validation
function validate(members) {
    var errors = document.createDocumentFragment();
    var allGood = true;
    var formFeedback = void 0;
    anthologyInputFeedback.innerHTML = '';
    novelInputFeedback.innerHTML = '';
    if (members.hasOwnProperty('stories')) {
        formFeedback = anthologyInputFeedback;
        if (members.stories.length < 2) {
            var alert = document.createElement('div');
            alert.className = 'alert alert-danger';
            alert.innerHTML = "<strong>Input Error</strong> Anthology must have at least 2 stories.";
            errors.appendChild(alert);
            allGood = false;
        }
    } else formFeedback = novelInputFeedback;
    var isbn = ISBN.parse(members.isbn); // bower package for ISBN 
    if (members.isbn && (!isbn || !isbn.isIsbn13())) {
        var _alert = document.createElement('div');
        _alert.className = 'alert alert-danger';
        _alert.innerHTML = "<strong>Input Error</strong> Isbn is not valid. Valid isbn would be (ex. 978-1-56619-909-4)";
        errors.appendChild(_alert);
        allGood = false;
    }
    var year = members.year;
    var currentYear = new Date();
    if (year && (year < 1900 || year > currentYear.getFullYear())) {
        var _alert2 = document.createElement('div');
        _alert2.className = 'alert alert-danger';
        _alert2.innerHTML = "<strong>Input error</strong> Year Of Publication should be between 1900 and present year";
        errors.appendChild(_alert2);
        allGood = false;
    }
    var pageLength = members.length;
    if (pageLength && (pageLength < 1 || pageLength > 1000)) {
        var _alert3 = document.createElement('div');
        _alert3.className = 'alert alert-danger';
        _alert3.innerHTML = "<strong>Input error</strong> The number of pages should be between 1 and 1000";
        errors.appendChild(_alert3);
        allGood = false;
    }
    var title = members.title;
    var principal = members.hasOwnProperty('author') ? members.author : members.editor;
    if (!title || !principal) {
        var _alert4 = document.createElement('div');
        _alert4.className = 'alert alert-danger';
        _alert4.innerHTML = "<strong>Input error</strong> Book title and author are required";
        errors.appendChild(_alert4);
        allGood = false;
    }
    formFeedback.appendChild(errors);
    return allGood;
}

// setBooks([]);

// Series number is disabled if we dont have series
var series = document.getElementById('novelSeries');
var seriesNumber = document.getElementById('novelSeriesNumber');
seriesNumber.disabled = true;
series.addEventListener('input', function () {
    if (series.value) seriesNumber.disabled = false;else seriesNumber.disabled = true;
});

// Select book type
bookSelect.addEventListener('change', function () {
    var value = bookSelect.value;
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
var submitNovelBtn = document.getElementById('submitNovel');
submitNovelBtn.addEventListener('click', function () {
    event.preventDefault();
    var title = document.getElementById('novelTitle');
    var author = document.getElementById('novelAuthor');
    var publisher = document.getElementById('novelPublisher');
    var year = document.getElementById('novelYear');
    var length = document.getElementById('novelLength');
    var series = document.getElementById('novelSeries');
    var seriesNumber = document.getElementById('novelSeriesNumber');
    var isbn = document.getElementById('novelIsbn');
    var review = document.getElementById('novelReview');

    var novelMembers = {
        title: title.value,
        author: author.value,
        publisher: publisher.value,
        year: year.value,
        length: length.value,
        isbn: isbn.value,
        review: review.value,
        series: series.value,
        seriesNumber: seriesNumber.value
    };

    if (!validate(novelMembers)) return;

    var novel = new _Novel2.default(novelMembers);
    novel.id = ++id;
    bookRepository.books.push(novel);
    var alert = document.createElement('div');
    alert.className = 'alert alert-success';
    alert.innerHTML = "<strong>Great!</strong> The novel was added to the library";
    novelInputFeedback.appendChild(alert);
    document.getElementById('novelForm').reset();
});

addStoryBtn.addEventListener('click', function () {
    event.preventDefault();
    var storyTitle = document.getElementById('anthologyStoryTitle');
    var storyAuthor = document.getElementById('anthologyStoryAuthor');
    var original = document.getElementById('checkOriginal');
    var story = new _Story2.default(storyTitle.value, storyAuthor.value, original.checked);
    tempStories.push(story);
    var li = document.createElement('li');
    li.innerHTML = story.title + ' by ' + story.author;
    storyList.appendChild(li);
    storyTitle.value = '';
    storyAuthor.value = '';
});

// Add Anthology
var submitAnthologyBtn = document.getElementById('submitAnthology');
submitAnthologyBtn.addEventListener('click', function () {
    event.preventDefault();
    var title = document.getElementById('anthologyTitle');
    var editor = document.getElementById('anthologyEditor');
    var publisher = document.getElementById('anthologyPublisher');
    var year = document.getElementById('anthologyYear');
    var length = document.getElementById('anthologyLength');
    var isbn = document.getElementById('anthologyIsbn');
    var review = document.getElementById('anthologyReview');

    var anthologyMembers = {
        title: title.value,
        publisher: publisher.value,
        year: year.value,
        length: length.value,
        isbn: isbn.value,
        stories: tempStories,
        review: review.value,
        editor: editor.value
    };

    if (!validate(anthologyMembers)) return;

    var anthology = new _Anthology2.default(anthologyMembers);
    anthology.id = ++id;
    bookRepository.books.push(anthology);
    document.getElementById('anthologyForm').reset();
    storyList.innerHTML = '';
    tempStories = [];
    var alert = document.createElement('div');
    alert.className = 'alert alert-success';
    alert.innerHTML = "<strong>Great!</strong> The anthology was added to the library";
    anthologyInputFeedback.appendChild(alert);
});

// Library
var viewLibrary = document.getElementById('viewLibrary');
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
var bookTableHead = document.getElementById('bookTableHead');
bookTableHead.addEventListener('click', function () {
    event.preventDefault();
    if (event.target.tagName == 'A') {
        console.log(event.target.id);
        event.stopPropagation();
        bookRepository.sort(event.target.id);
        displayBooks();
    }
});

// Filtering
function filterByPublication() {
    var filterFrom = parseInt(document.getElementById('filterFrom').value);
    var filterTo = parseInt(document.getElementById('filterTo').value);
    var filterOptions = { from: filterFrom, to: filterTo };

    bookRepository.filter('year', filterOptions);
}

function filterByNovels() {
    var filterBy = document.querySelector('input[name="filterByNovelsRadio"]:checked').id;
    var filterOptions = {};
    if (filterBy == 'filterSpecificNovel') {
        filterOptions.seriesName = seriesNameToFilterBy.value.toLowerCase();
    }

    bookRepository.filter(filterBy, filterOptions);
}

function filterByAnthology() {
    var filterBy = document.querySelector('input[name="filterByAnthologiesRadio"]:checked').id;

    bookRepository.filter(filterBy, filterOptions);
}

var filterSelector = document.getElementById('filterSelector');
var filterBtn = document.getElementById('filter');
var closeFilterOptionsBtn = document.getElementById('closeFilterOptions');
var filterByPubForm = document.getElementById('filterByPeriodForm');
var filterByNovelForm = document.getElementById('filterByNovelsForm');
var filterByAnthForm = document.getElementById('filterByAnthForm');

var filterSpecificNovel = document.getElementById('filterSpecificNovel');
var seriesNameToFilterBy = document.getElementById('seriesNameToFilterBy');
filterSpecificNovel.addEventListener('change', function () {
    if (filterSpecificNovel.checked == true) seriesNameToFilterBy.disabled = false;
});

filterSelector.addEventListener('click', function () {
    var selected = filterSelector.value;
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
});

filterBtn.addEventListener('click', function () {
    var selected = filterSelector.value;
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
});

// Search books
var searchInput = document.getElementById('searchInput');
var searchBtn = document.getElementById('search');
searchBtn.addEventListener('click', function () {
    event.preventDefault();
    var searchTerm = searchInput.value.toLowerCase();
    bookRepository.search(searchTerm);
    displayBooks();
});

// Delete book
var bookToDeleteId = void 0;
library.addEventListener('click', function () {
    // event.preventDefault();
    var clickedElement = event.target;
    if (clickedElement.id == "delBtn") {
        var tr = clickedElement.parentNode.parentNode;
        bookToDeleteId = parseInt(tr.children[0].innerText);
    }
});
var deleteBtn = document.getElementById('deleteBtn');
var closeModal = document.getElementById('closeModal');
deleteBtn.addEventListener('click', function () {
    var book = bookRepository.books.find(function (book) {
        return book.id == bookToDeleteId;
    });
    var bookToDeleteIndex = bookRepository.books.indexOf(book);
    var shownBookToDeleteIndex = bookRepository.shownBooks.indexOf(book);
    bookRepository.shownBooks = bookRepository.shownBooks.slice(0); // disconnect from bookRepository.books
    bookRepository.books.splice(bookToDeleteIndex, 1);
    bookRepository.shownBooks.splice(shownBookToDeleteIndex, 1);
    closeModal.click();
    displayBooks();
});

// Load Books from JSON
var booksFile = 'https://raw.githubusercontent.com/sedc-codecademy/sedc5-frontend-exam/master/books.json';
loadBooksBtn.addEventListener('click', function () {
    console.log('here');
    getBooks(booksFile, function (books) {
        books.forEach(function (book) {
            return book.id = ++id;
        });
        bookRepository.books = bookRepository.books.concat(books);
        bookRepository.shownBooks = bookRepository.books.slice(0);
        displayBooks();
    });
});

//Paging
var previousBtn = document.getElementById('prev');
var nextBtn = document.getElementById('next');

previousBtn.addEventListener('click', function () {
    bookRepository.prevPage();
    displayBooks();
});

nextBtn.addEventListener('click', function () {
    bookRepository.nextPage();
    displayBooks();
});

},{"../js/Anthology.js":1,"../js/Novel.js":3,"../js/Story.js":4}]},{},[6]);
