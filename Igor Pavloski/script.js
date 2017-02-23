//function for putting options in the yearOfPublication select (from 1900 to today)---------------
function optionsGenerator() {
    let from = 1900;
    let to = new Date().getFullYear();
    let generatedOptions = `<option value="N/A" disabled selected>Year of publication</option>`;

    for (let index = from; index <= to; index++) {
        generatedOptions += `<option value="${index}">${index}</option>`;
    }
    $("#yearOfPublication").html(generatedOptions);
}
//calling the function immidiately---------
optionsGenerator();

//clearing the inputs--------------------------------------------------------------------------------
function clearInputs() {
    $("#title").val("");
    $("#author").val("");
    $("#editor").val("");
    $('.selectpicker').selectpicker('val', "N/A");
    $("#pages").val("");
    $("#series").val("");
    $("#seriesNum").val("");
    $("#ISBN").val("");
    $("#review").val("");
    $("#publisher").val("N/A");
}

//is it a Novel or an Anthology---------
function isNovel() {
    let type = $("#typeOfBook").val();

    if (type == "novel") {
        return true;
    } else {
        return false;
    }
}
//adding novel book --------------------
$("#addNovel").click(function () {
    clearAlerts();
    $("#typeOfBook").remove();
    $("#bookInputs").append(
        `<input type="text" value="novel" id="typeOfBook" disabled hidden>`
    );
    $('#bookInputs').show();
    $(".anthology").hide();
    $(".novel").show();
    $('.story').remove();
    clearInputs();
    isNovel();
});


//adding anthology book--------------------
$("#addAnthology").click(function () {
    clearAlerts();
    $("#typeOfBook").remove();
    $("#bookInputs").append(
        `<input type="text" value="anthology" id="typeOfBook" disabled hidden>`
    );
    $(".anthology").show();
    $('#bookInputs').show();
    $(".novel").hide();
    clearInputs();
    isNovel();
});

//closing inputs---------------------
function closeBook() {
    clearAlerts();
    $('.story').remove();
    clearInputs();
}

$("#closeBook").click(function () {
    closeBook();
    $('#bookInputs').hide();
    clearAlerts();
});
//----------------------------------------------------------------------------------------------------
//Book class-------------------------
class Book {
    constructor(title, yearOfPublication, pages, ISBN, review, principalAuthor, additionalInformation, publisher) {
        this.title = title;
        this.yearOfPublication = yearOfPublication;
        this.pages = pages;
        this.ISBN = ISBN;
        this.review = review;
        this.principalAuthor = principalAuthor;
        this.additionalInformation = additionalInformation;
        this.publisher = publisher;
    }
}

//story class----------------------------
class Story {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}
//Stories -----------------------------------------------------------------------------------------------------
//adding story inputs-----------------
let storyList = []
function displayStories() {
    $("#storyListing").html("");
    storyList.forEach(function (element, i) {

        $("#storyListing").append(
            `<ul class= "story">
            <li>"${element.title}" - ${element.author}</li>
            </ul>`
        )
    }, this)

}


$("#addStory").click(function () {
    let title = $("#storyTitle").val();
    let author = $("#storyAuthor").val();
    let story = new Story(title, author);
    storyList.push(story);
    displayStories();
    $("#storyTitle").val("");
    $("#storyAuthor").val("");
});

//function for listing the story authors in the additional information column-------
function displayStoryAuthors() {
    let author = "";
    let authorCounter = 0;
    storyList.forEach(function (element, i) {
        if (author != element.author) {
            author = element.author;
            authorCounter++;
        } else {
            author = element.author;
        }
    }, this);
    if (authorCounter > 1) {
        return `${authorCounter} authors`;
    }
    else {
        return `${author}`;
    }
}
//-----------------------------------------------------------------------------------------------------
let bookList = [];
//--------------save button ---------------------------------------------------------------------------
$("#saveBook").click(function () {
    clearAlerts();

    //input variables---------------------
    let title = $("#title").val();
    let author = $("#author").val();
    let editor = $("#editor").val();
    let yearOfPublication = $("#yearOfPublication option:selected").val();
    let pages = $("#pages").val();
    let series = $("#series").val();
    let seriesNum = $("#seriesNum").val();
    let ISBN = $("#ISBN").val();
    var review = $("#review").val();
    let publisher = $("#publisher option:selected").val();
    let numberOfStories = storyList.length;
    let infoNovel = `${series} (#${seriesNum})`;
    let infoAnthology = `${numberOfStories} stories by ${displayStoryAuthors()}`;
    if (review.length > 50) {
        review = review.substring(0, 46) + "...";
    }

    //validations--------------------------------------------
    if (isNovel() == true) {
        if (title == "" || author == "") {
            emptyInputsAlert("title and author inputs");
        } else {
            let book = new Book(title, yearOfPublication, pages, ISBN, review, author, infoNovel, publisher);
            bookList.push(book);
            successAlert("novel");
            clearingAllEnteredInfo();
        };

    } else {
        if (title == "" || editor == "" || numberOfStories < 2) {
            emptyInputsAlert('title, editor and add at least 2 stories')
        } else {
            let book = new Book(title, yearOfPublication, pages, ISBN, review, editor, infoAnthology, publisher);
            bookList.push(book);
            successAlert("anthology");
            clearingAllEnteredInfo();
        }
    }
});

//---clearing the inputs----------------------------------
function clearingAllEnteredInfo() {
    $("#bookList").html("");
    displayBooks();
    $('.story').remove();
    $("#alertEmptyInputs").html("");
    $("#alertPages").html("");
    clearInputs();
    storyList = [];
}

//---displaying table----------------------------------------------------------------------------------
function displayBooks() {
    bookList.forEach(function (element, i) {
        let bookList = $("#bookList");
        bookList.append(
            `   <tr id="${i}">
                    <td></td>
                    <td>${i + 1}</td>
                    <td>${element.title}</td>
                    <td>${element.principalAuthor}</td>
                    <td>${element.yearOfPublication} (${element.publisher})</td>
                    <td>${element.pages}</td>
                    <td>${element.additionalInformation}</td>
                    <td>${element.ISBN}</td> 
                    <td>${element.review}</td>
                    <td><input type="button" class="btn btn-danger deleteBook" value="delete"></td>
                </tr>`)
    }, this)
};

//deleting a table row/book----------------------------------------
$(document).on('click', 'input.deleteBook', function () {
    let theObject = this;
    $.confirm({
        title: 'Confirm!',
        content: 'Are you sure you want to delete this book?',
        buttons: {
            confirm: function () {
                let tableRow = $(theObject).closest("tr");
                let tableRowId = tableRow.attr('id');
                tableRow.remove();
                bookList.splice(tableRowId, 1);
                $("#bookList").html("");
                displayBooks();
            },
            cancel: function () {
            }
        }
    });
});

//validations on pages and ISBN------------------------------------------------------------------------------------------------------
//validation on number of pages(1-1000)---------------------
$("#pages").change(function () {
    var max = parseInt($(this).attr('max'));
    var min = parseInt($(this).attr('min'));
    if ($(this).val() > max) {
        pagesAlert("larger then 1000");
        $(this).val("");
    }
    else if ($(this).val() < min) {
        pagesAlert("less then 1");
        $(this).val("");
    }
});
//validation for ISBN (string of 15 digits)-----------------
// let isbnRegex = ;
$("#ISBN").change(function () {
    let ISBNvalue = $(this).val();
    if (!/^(\d{15})$/.test(ISBNvalue)) {
        $("#alertISBN").html(` 
                <div class="alert alert-danger alert-dismissable fade in">
                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Alert!</strong> The ISBN must be 15 characters long and only contain digits.
                </div>`)
        $(this).val("");
    }
});

//functions for optimizing alert messages code -------------------------------------------------------------------------------------
//success alert---------------------------------
function successAlert(bookType) {
    $("#alertSuccess").html(` 
                <div class="alert alert-success alert-dismissable fade in">
                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Success!</strong> The ${bookType} has been added to the library.
                </div>`);
}
//empty inputs alert---------------------------
function emptyInputsAlert(whatToFill) {
    $("#alertEmptyInputs").html(` 
                <div class="alert alert-danger alert-dismissable fade in">
                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Alert!</strong> Please fill the ${whatToFill}.
                </div>`);
}
//number of pages range alert------------------
function pagesAlert(range) {
    $("#alertPages").html(` 
         <div class="alert alert-danger alert-dismissable fade in">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            <strong>Alert!</strong> The number of pages can not be ${range}.
         </div>`);
}
//clearing the alerts--------------------------
function clearAlerts() {
    $("#alertSuccess").html("");
    $("#alertEmptyInputs").html("");
    $("#alertPages").html("");
    $("#alertISBN").html("");
}
// Search -----------------------------------------------------------------------------------------------------------------------------
$("#searchTerm").on("keyup", () => {
    let searchTerm = $("#searchTerm").val().toLowerCase();
    let searchFilter = $("#searchFilter option:selected").val();
    let searchedBooks = [];

    if (searchFilter == "title") {
        searchedBooks = bookList.filter(b => {
            if (b.title.toLowerCase().indexOf(searchTerm) !== -1)
                return true;
            return false;
        })
    } else if (searchFilter == "author") {
        searchedBooks = bookList.filter(b => {
            if (b.principalAuthor.toLowerCase().indexOf(searchTerm) !== -1)
                return true;
            return false;
        })
    } else {
        searchedBooks = bookList.filter(b => {
            if (b.pages.toLowerCase().indexOf(searchTerm) !== -1)
                return true;
            return false;
        })
    }

    $("#bookList").html("");
    searchedBooks.forEach(function (element, i) {
        let table = $("#bookList");
        table.append(
            `   <tr id="${i}">
                    <td></td>
                    <td>${i + 1}</td>
                    <td>${element.title}</td>
                    <td>${element.principalAuthor}</td>
                    <td>${element.yearOfPublication} (${element.publisher})</td>
                    <td>${element.pages}</td>
                    <td>${element.additionalInformation}</td>
                    <td>${element.ISBN}</td> 
                    <td>${element.review}</td>
                    <td><input type="button" class="btn btn-danger deleteBook" value="delete"></td>
                </tr>`)
    }, this)
});
//Sorting ------------------------------------------------------------------------------------------------------------------
$("#sortByButton").click(function () {
    let check = '<input type="button" class="btn btn-default btn-sm" value="Title" id="sortByTitle">';

    if ($("#titleTh").html() == check) {
        // $("#idTh").html('ID');
        $("#titleTh").html('Title');
        $("#authorTh").html('Author/Editor');
        $("#publishTh").html('Publishing information');
        $("#lengthTh").html('Length');
        $("#infoTh").html('Additional information');
        $("#isbnTh").html('ISBN');
    } else {
        // $("#idTh").html('<input type="button" class="btn btn-default btn-sm" value="ID" id="sortByID">');
        $("#titleTh").html('<input type="button" class="btn btn-default btn-sm" value="Title" id="sortByTitle">');
        $("#authorTh").html('<input type="button" class="btn btn-default btn-sm" value="Author/Editor" id="sortByAuthor">');
        $("#publishTh").html('<input type="button" class="btn btn-default btn-sm" value="Publishing information" id="sortByPublish">');
        $("#lengthTh").html('<input type="button" class="btn btn-default btn-sm" value="Length" id="sortByLength">');
        $("#infoTh").html('<input type="button" class="btn btn-default btn-sm" value="Additional information" id="sortByInfo">');
        $("#isbnTh").html('<input type="button" class="btn btn-default btn-sm" value="ISBN" id="sortByISBN">');
    }
});
//Sort buttons -------------------------------------------
function sortBooks(selector) {
    bookList.sort((a, b) => selector(a).localeCompare(selector(b)));
    $("#bookList").html("");
    displayBooks();
}

$("#titleTh").click(function () {
    sortBooks(a => a.title);
})
$("#authorTh").click(function () {
    sortBooks(a => a.principalAuthor);
})
$("#publishTh").click(function () {
    sortBooks(a => a.yearOfPublication);
})
$("#lengthTh").click(function () {
    bookList.sort((a, b) => a.pages - b.pages);
    $("#bookList").html("");
    displayBooks();
})
$("#infoTh").click(function () {
    sortBooks(a => a.additionalInformation);
})
$("#isbnTh").click(function () {
    sortBooks(a => a.ISBN);
})
// -------------------------------------------------------------------------------------------------------------------------------------