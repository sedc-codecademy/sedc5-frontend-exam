import Book from "../js/Book.js";

export default class Anthology extends Book {
    constructor(members) {
        super(members);
        this.kind = 'anthology';
        this.editor = members.editor;
        this.stories = members.stories;
    }
}