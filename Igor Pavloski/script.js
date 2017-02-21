//cistenje inputi---------------------
function clearInputs() {
    $("#title").val("");
    $("#author").val("");
    $("#editor").val("");
    $("#yearOfPublication").val("");
    $("#pages").val("");
    $("#series").val("");
    $("#seriesNum").val("");
    $("#ISBN").val("");
    $("#review").val("");
    $("#publisher").val("default");
    $("#stories").val("default");
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
    $("#typeOfBook").remove();
    $("#bookInputs").append(
        `<input type="text" value="novel" id="typeOfBook" disabled hidden>`
    );
    $('#bookInputs').show();
    $(".anthology").hide();
    $(".novel").show();
    $('.story').remove();

    isNovel();
});


//adding anthology book--------------------
$("#addAnthology").click(function () {
    $("#typeOfBook").remove();
    $("#bookInputs").append(
        `<input type="text" value="anthology" id="typeOfBook" disabled hidden>`
    );
    $(".anthology").show();
    $('#bookInputs').show();
    $(".novel").hide();

    isNovel();
});

//closing inputs---------------------
function closeBook() {
    $('#bookInputs').hide();
    $('.story').remove();
    clearInputs();
}

$("#closeBook").click(function () {
    closeBook();
});
//----------------------------------------------------------------------------------------------------
//Book class-------------------------
class Book {
    constructor(title, yearOfPublication, pages, ISBN, review, author, series, seriesNum, editor, stories) {
        this.title = title;
        this.yearOfPublication = yearOfPublication;
        this.pages = pages;
        this.ISBN = ISBN;
        this.review = review;
        this.author = author;
        this.series = series;
        this.seriesNum = seriesNum;
        this.editor = editor;
        this.stories = stories;
    }
}
//novel book class-------------------
class Novel extends Book {
    constructor(title, yearOfPublication, pages, ISBN, review, author, series, seriesNum, editor, stories, publisher) {
        super(title, yearOfPublication, pages, ISBN, review, author, series, seriesNum, "N/A", "N/A", publisher);
    }
}
//anthology book class-------------------
class Anthology extends Book {
    constructor(title, yearOfPublication, pages, ISBN, review, author, series, seriesNum, editor, stories, publisher) {
        super(title, yearOfPublication, pages, ISBN, review, "N/A", "N/A", "N/A", editor, stories, publisher);
    }
}
//story class----------------------------
class Story {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}
//-----------------------------------------------------------------------------------------------------
//adding story inputs-----------------
var storyList = []
function displayStories() {
    $("#storyListing").html("");
    storyList.forEach(function (element, i) {

        $("#storyListing").append(
            `<ul>
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

let bookList = [];
//--------------save button ---------------------------------------------------------------------------
$("#saveBook").click(function () {

    //input variables---------------------
    let title = $("#title").val();
    let author = $("#author").val();
    let editor = $("#editor").val();
    let year = $("#yearOfPublication").val();
    let pages = $("#pages").val();
    let series = $("#series").val();
    let seriesNum = $("#seriesNum").val();
    let ISBN = $("#ISBN").val();
    let review = $("#review").val();
    let publisher = $( "#publisher option:selected" ).val();
    let stories = storyList;

    if (isNovel() == true) {
        let book = new Novel(title, year, pages, ISBN, review, author, series, seriesNum, editor, stories, publisher);
        bookList.push(book);
    } else {
        let book = new Anthology(title, year, pages, ISBN, review, author, series, seriesNum, editor, stories, publisher);
        bookList.push(book);
    }


    //---clearing the inputs----------------------------------
    $("#bookList").html("");
    displayBooks();
    closeBook();
    storyList = [];

});
//---displaying table----------------------------------------------------------------------------------
function displayBooks() {
    bookList.forEach(function (element, i) {
        let bookList = $("#bookList");
        bookList.append(
            `   <tr id="${i}">
                    <th>${i + 1}</th>
                    <th>${element.title}</th>
                    <th>${element.author}</th>
                    <th>${element.publisher}</th>
                    <th>${element.yearOfPublication}</th>
                    <th>${element.pages}</th>
                    <th>${element.series}(#${element.seriesNum})</th>
                    <th>${element.ISBN}</th>   
                    <th>${element.editor}</th>
                    <th>${element.stories}</th>
                    <th>${element.review}</th>
                    <th><input type="button" class="btn btn-danger deleteBook" value="delete"></th>
                </tr>`)
    }, this)
};

//deleting a table row/book----------------------------------------
$(document).on('click', 'input.deleteBook', function () {
    let tableRow = $(this).closest("tr");
    let tableRowId = tableRow.attr('id');
    tableRow.remove();
    bookList.splice(tableRowId, 1);
    $("#bookList").html("");
    displayBooks();
});