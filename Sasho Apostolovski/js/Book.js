var isbnIsValid = require('isbn-validator');

export default class Book {
    constructor(members) {
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
}