var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Book = (function () {
    function Book(title, author, publisher, year, length, isbn, review, id) {
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.year = year;
        this.length = length;
        this.isbn = isbn;
        this.review = review;
        this.id = id;
    }
    return Book;
}());
var Novel = (function (_super) {
    __extends(Novel, _super);
    function Novel(title, author, publisher, year, length, series, seriesNumber, isbn, review, id) {
        var _this = _super.call(this, title, author, publisher, year, length, isbn, review, id) || this;
        _this.series = series;
        _this.seriesNumber = seriesNumber;
        return _this;
    }
    return Novel;
}(Book));
var Anthologie = (function (_super) {
    __extends(Anthologie, _super);
    function Anthologie(title, editor, publisher, year, length, stories, isbn, review, id) {
        var _this = _super.call(this, title, editor, publisher, year, length, isbn, review, id) || this;
        _this.stories = stories;
        return _this;
    }
    return Anthologie;
}(Book));
var Story = (function () {
    function Story(title, author, isOriginal) {
        var _this = this;
        this.title = title;
        this.author = author;
        this.isOriginal = isOriginal;
        this.toString = function () {
            return "" + _this.author;
        };
    }
    return Story;
}());
