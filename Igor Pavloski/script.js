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
    $("#alertSuccess").html("");
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
    $("#alertSuccess").html("");
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
    $("#alertEmptyInputs").html("");
    $("#alertPages").html("");
    $('.story').remove();
    clearInputs();
}

$("#closeBook").click(function () {
    closeBook();
    $('#bookInputs').hide();
    $("#alertSuccess").html("");
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

    //input variables---------------------
    let title = $("#title").val();
    let author = $("#author").val();
    let editor = $("#editor").val();
    let principalAuthor = "";
    let yearOfPublication = $("#yearOfPublication option:selected").val();
    let pages = $("#pages").val();
    let series = $("#series").val();
    let seriesNum = $("#seriesNum").val();
    let ISBN = $("#ISBN").val();
    let review = $("#review").val();
    let publisher = $("#publisher option:selected").val();
    let numberOfStories = storyList.length;
    let infoNovel = `${series} (#${seriesNum})`;
    let infoAnthology = `${numberOfStories} stories by ${displayStoryAuthors()}`;
    let additionalInformation = "";

    //validations--------------------------------------------
    if (isNovel() == true) {
        if (title == "" || author == "") {
            $("#alertEmptyInputs").html(` 
                <div class="alert alert-danger alert-dismissable fade in">
                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Alert!</strong> Please fill the title and author inputs.
                </div>`);
        } else {
            principalAuthor = author;
            additionalInformation = infoNovel;
            let book = new Book(title, yearOfPublication, pages, ISBN, review, principalAuthor, additionalInformation, publisher);
            bookList.push(book);

            $("#alertSuccess").html(` 
                <div class="alert alert-success alert-dismissable fade in">
                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Success!</strong> The novel has been added to the library.
                </div>`);
            clearingAllEnteredInfo();
        };

    } else {
        if (title == "" || editor == "" || numberOfStories < 2) {
            $("#alertEmptyInputs").html(` 
                <div class="alert alert-danger alert-dismissable fade in">
                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Alert!</strong> Please fill the title, editor and add at least 2 stories.
                </div>`);
        } else {
            principalAuthor = editor;
            additionalInformation = infoAnthology;
            let book = new Book(title, yearOfPublication, pages, ISBN, review, principalAuthor, additionalInformation, publisher);
            bookList.push(book);

            $("#alertSuccess").html(` 
                <div class="alert alert-success alert-dismissable fade in">
                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Success!</strong> The anthology has been added to the library.
                </div>`);
            clearingAllEnteredInfo();
        }
    }
});

//---clearing the inputs----------------------------------
function clearingAllEnteredInfo() {
    $("#bookList").html("");
    displayBooks();
    closeBook();
    storyList = [];
}

//---displaying table----------------------------------------------------------------------------------
function displayBooks() {
    bookList.forEach(function (element, i) {
        let bookList = $("#bookList");
        bookList.append(
            `   <tr id="${i}">
                    <th>${i + 1}</th>
                    <th>${element.title}</th>
                    <th>${element.principalAuthor}</th>
                    <th>${element.yearOfPublication} (${element.publisher})</th>
                    <th>${element.pages}</th>
                    <th>${element.additionalInformation}</th>
                    <th>${element.ISBN}</th> 
                    <th>${element.review}</th>
                    <th><input type="button" class="btn btn-danger deleteBook" value="delete"></th>
                </tr>`)
    }, this)
};

//deleting a table row/book----------------------------------------
$(document).on('click', 'input.deleteBook', function () {
    $.confirm({
        title: 'Confirm!',
        content: 'Are you sure you want to delete this book?',
        buttons: {
            confirm: function () {
                let tableRow = $(this).closest("tr");
                let tableRowId = tableRow.attr('id');
                tableRow.remove();
                bookList.splice(tableRowId, 1);
                $("#bookList").html("");
                displayBooks();
            },
            cancel: function () {
                $.alert('Canceled!');
            }
        }
    });
});

//validation on number of pages(1-1000) ------------------------------------------------------------------------------
$("#pages").change(function () {
    var max = parseInt($(this).attr('max'));
    var min = parseInt($(this).attr('min'));
    if ($(this).val() > max) {
        $("#alertPages").html(` 
         <div class="alert alert-danger alert-dismissable fade in">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            <strong>Alert!</strong> The number of pages can not be larger then 1000.
         </div>`);
        $(this).val("");
    }
    else if ($(this).val() < min) {
        $("#alertPages").html(` 
         <div class="alert alert-danger alert-dismissable fade in">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            <strong>Alert!</strong> The number of pages can not be less then 1.
         </div>`);
        $(this).val("");
    }
}); 