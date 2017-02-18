class Story {
    constructor(public title: string, public author: string, public original: boolean) { }
}

abstract class Book {
    constructor(public id: string, public title: string, public author: string, public publisher: string, public year: number, public length: number, public isbn: string, public review: string) { }
}

class Novel extends Book {
    constructor(public series: string, public seriesNumber: number, id: string, title: string, author: string, publisher: string, year: number, length: number, isbn: string, review: string) {
        super(id, title, author, publisher, year, length, isbn, review);
    }
}

class Anthology extends Book {
    constructor(public stories: Story[], id: string, title: string, author: string, publisher: string, year: number, length: number, isbn: string, review: string) {
        super(id, title, author, publisher, year, length, isbn, review);
    }
}

var books: Book[] = [];
var stories: Story[] = [];

function deleteObject(position: number) {
    books.splice(position, 1);
    $("#showBookLibrary").click();
}

function addThreeDots(string: string, limit: number) {
    var dots = "...";
    if (string.length > limit) {
        string = string.substring(0, limit) + dots;
    }
    return string;
}

$(function () {
    $("#showAddBook").on("click", function () {
        $("#addBook").show();
        $("#bookLibrary").hide();
    });

    $("#sortById").on("click", function() {
        books = _.sortBy(books, function(b) {
            return b.id;
        });
        $("#showBookLibrary").click();
    });

    $("#sortByTitle").on("click", function() {
        books = _.sortBy(books, function(b) {
            return b.title;
        });
        $("#showBookLibrary").click();
    });

    $("#sortByAuthor").on("click", function() {
        books = _.sortBy(books, function(b) {
            return b.author;
        });
        $("#showBookLibrary").click();
    });

    $("#showBookLibrary").on("click", function () {
        let i = 0;
        $("#addBook").hide();
        $("#bookLibrary").show();
        $('#bookTable > tbody > tr').remove();
    
        books.map(book => {
            if (book instanceof Novel) {
                var series = book.series;
                var seriesNumber = book.seriesNumber;
            }
            var review = addThreeDots(book.review, 50);
            if (series && seriesNumber) {
                $('#bookTable > tbody').append(`<tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.year} (${book.publisher})</td>
                <td>${book.length}</td>
                <td>${series}(#${seriesNumber})</td>
                <td>${book.isbn}</td>
                <td>${review}</td>
                <td><a href="#" onclick="deleteObject(${i})">Delete</a></td>
                </tr>`);
            } else {
                $('#bookTable > tbody').append(`<tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.year} (${book.publisher})</td>
                <td>${book.length}</td>
                <td></td>
                <td>${book.isbn}</td>
                <td>${review}</td>
                <td><a href="#" onclick="deleteObject(${i})">Delete</a></td>
                </tr>`);
            }
            i++;
        });
    });

    $("#bookType").on("change", function () {
        if ($(this).val() == "novel") {
            $("#novel").show();
            $("#anthology").hide();
            $("#novelTitle").attr("required", "required");
            $("#novelAuthor").attr("required", "required");
            $("#anthologylTitle").removeAttr("required");
            $("#anthologyEditor").removeAttr("required");
            $("#anthologyStoryTitle").removeAttr("required");
            $("#anthologyStoryAuthor").removeAttr("required");
            $("#novelYear").attr("max", new Date().getFullYear());
        }
        else if ($(this).val() == "anthology") {
            $("#novel").hide();
            $("#anthology").show();
            $("#anthologylTitle").attr("required", "required");
            $("#anthologyEditor").attr("required", "required");
            $("#anthologyStoryTitle").attr("required", "required");
            $("#anthologyStoryAuthor").attr("required", "required");
            $("#novelTitle").removeAttr("required");
            $("#novelAuthor").removeAttr("required");
            $("#anthologyYear").attr("max", new Date().getFullYear());
        }
    });

    $("#novelForm").submit(function (e) {
        var novel = new Novel(
            $("#novelSeriesName").val(),
            $("#novelSeriesNumber").val(),
            uuid.v4(),
            $("#novelTitle").val(),
            $("#novelAuthor").val(),
            $("#novelPublisher").val(),
            $("#novelYear").val(),
            $("#novelLength").val(),
            $("#novelISBN").val(),
            $("#novelReview").val()
        );
        books.push(novel);
        console.log(novel);
        e.preventDefault();
    });

    $("#anthologyForm").submit(function (e) {
        var anthology = new Anthology(
            stories,
            uuid.v4(),
            $("#anthologyTitle").val(),
            $("#anthologyEditor").val(),
            $("#anthologyPublisher").val(),
            $("#anthologyYear").val(),
            $("#anthologylLength").val(),
            $("#anthologyISBN").val(),
            $("#anthologyReview").val()
        );
        books.push(anthology);
        console.log(anthology);
        e.preventDefault();
    });

    $("#addStory").on("click", function () {
        var title = $("#anthologyStoryTitle").val();
        var author = $("#anthologyStoryAuthor").val();
        var original = $("#anthologyStoryOriginal input[type='radio']:checked").val();
        $("#storyTable > tbody").append(`<tr><td>${title}</td><td>${author}</td><td>${original}</td></tr>`);
        var story = new Story(title, author, original == "true" ? true : false);
        stories.push(story);
    });
});