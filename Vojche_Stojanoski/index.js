var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Story = (function () {
    function Story(title, author, original) {
        this.title = title;
        this.author = author;
        this.original = original;
    }
    return Story;
}());
var Book = (function () {
    function Book(id, title, author, publisher, year, length, isbn, review) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.year = year;
        this.length = length;
        this.isbn = isbn;
        this.review = review;
    }
    return Book;
}());
var Novel = (function (_super) {
    __extends(Novel, _super);
    function Novel(series, seriesNumber, id, title, author, publisher, year, length, isbn, review) {
        var _this = _super.call(this, id, title, author, publisher, year, length, isbn, review) || this;
        _this.series = series;
        _this.seriesNumber = seriesNumber;
        return _this;
    }
    return Novel;
}(Book));
var Anthology = (function (_super) {
    __extends(Anthology, _super);
    function Anthology(stories, id, title, author, publisher, year, length, isbn, review) {
        var _this = _super.call(this, id, title, author, publisher, year, length, isbn, review) || this;
        _this.stories = stories;
        return _this;
    }
    return Anthology;
}(Book));
var books = [];
var stories = [];
function deleteObject(position) {
    books.splice(position, 1);
    $("#showBookLibrary").click();
}
function addThreeDots(string, limit) {
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
    $("#sortById").on("click", function () {
        books = _.sortBy(books, function (b) {
            return b.id;
        });
        $("#showBookLibrary").click();
    });
    $("#sortByTitle").on("click", function () {
        books = _.sortBy(books, function (b) {
            return b.title;
        });
        $("#showBookLibrary").click();
    });
    $("#sortByAuthor").on("click", function () {
        books = _.sortBy(books, function (b) {
            return b.author;
        });
        $("#showBookLibrary").click();
    });
    $("#showBookLibrary").on("click", function () {
        var i = 0;
        $("#addBook").hide();
        $("#bookLibrary").show();
        $('#bookTable > tbody > tr').remove();
        books.map(function (book) {
            if (book instanceof Novel) {
                var series = book.series;
                var seriesNumber = book.seriesNumber;
            }
            var review = addThreeDots(book.review, 50);
            if (series && seriesNumber) {
                $('#bookTable > tbody').append("<tr>\n                <td>" + book.id + "</td>\n                <td>" + book.title + "</td>\n                <td>" + book.author + "</td>\n                <td>" + book.year + " (" + book.publisher + ")</td>\n                <td>" + book.length + "</td>\n                <td>" + series + "(#" + seriesNumber + ")</td>\n                <td>" + book.isbn + "</td>\n                <td>" + review + "</td>\n                <td><a href=\"#\" onclick=\"deleteObject(" + i + ")\">Delete</a></td>\n                </tr>");
            }
            else {
                $('#bookTable > tbody').append("<tr>\n                <td>" + book.id + "</td>\n                <td>" + book.title + "</td>\n                <td>" + book.author + "</td>\n                <td>" + book.year + " (" + book.publisher + ")</td>\n                <td>" + book.length + "</td>\n                <td></td>\n                <td>" + book.isbn + "</td>\n                <td>" + review + "</td>\n                <td><a href=\"#\" onclick=\"deleteObject(" + i + ")\">Delete</a></td>\n                </tr>");
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
        var novel = new Novel($("#novelSeriesName").val(), $("#novelSeriesNumber").val(), uuid.v4(), $("#novelTitle").val(), $("#novelAuthor").val(), $("#novelPublisher").val(), $("#novelYear").val(), $("#novelLength").val(), $("#novelISBN").val(), $("#novelReview").val());
        books.push(novel);
        console.log(novel);
        e.preventDefault();
    });
    $("#anthologyForm").submit(function (e) {
        var anthology = new Anthology(stories, uuid.v4(), $("#anthologyTitle").val(), $("#anthologyEditor").val(), $("#anthologyPublisher").val(), $("#anthologyYear").val(), $("#anthologylLength").val(), $("#anthologyISBN").val(), $("#anthologyReview").val());
        books.push(anthology);
        console.log(anthology);
        e.preventDefault();
    });
    $("#addStory").on("click", function () {
        var title = $("#anthologyStoryTitle").val();
        var author = $("#anthologyStoryAuthor").val();
        var original = $("#anthologyStoryOriginal input[type='radio']:checked").val();
        $("#storyTable > tbody").append("<tr><td>" + title + "</td><td>" + author + "</td><td>" + original + "</td></tr>");
        var story = new Story(title, author, original == "true" ? true : false);
        stories.push(story);
    });
});
