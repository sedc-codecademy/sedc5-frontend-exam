class Anthology extends Book {
    constructor(id, title, author, publisher, yearOfPublication, length, series, seriesNumber, ISBN, review) {
        super(id, "anthology", title, author, publisher, yearOfPublication, length, ISBN, review)
        this.stories = stories;
    }
}