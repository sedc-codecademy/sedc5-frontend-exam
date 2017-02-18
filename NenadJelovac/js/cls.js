var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Book = (function () {
    function Book(title, publisher, year, lengthInPages, idISBN, review) {
        this.title = title;
        this.publisher = publisher;
        this.year = year;
        this.lengthInPages = lengthInPages;
        this.idISBN = idISBN;
        this.review = review;
    }
    return Book;
}());
var Novel = (function (_super) {
    __extends(Novel, _super);
    function Novel(title, publisher, year, lengthInPages, idISBN, review, author, series, seriesNumber) {
        var _this = _super.call(this, title, publisher, year, lengthInPages, idISBN, review) || this;
        //constants
        _this.type = "Novel";
        _this.author = author;
        _this.series = series;
        _this.seriesNumber = seriesNumber;
        return _this;
    }
    return Novel;
}(Book));
var Anthology = (function (_super) {
    __extends(Anthology, _super);
    function Anthology(title, publisher, year, lengthInPages, idISBN, review, editor, stories) {
        var _this = _super.call(this, title, publisher, year, lengthInPages, idISBN, review) || this;
        //constants
        _this.type = "Anthology";
        _this.editor = editor;
        _this.stories = stories;
        return _this;
    }
    return Anthology;
}(Book));
var Story = (function () {
    function Story(title, storiesAuthor, isOriginal) {
        if (isOriginal === void 0) { isOriginal = false; }
        this.title = title;
        this.storiesAuthor = storiesAuthor;
        this.isOriginal = isOriginal;
    }
    return Story;
}());
