let booksForTable = [];
booksForTable = JSON.parse(localStorage.getItem('books'));

let numberOfEntriesPerPage = 10;
let pageNumber = 1;

let $bodyOfTheTable = $("#listing");

let addBookToTable = function (id, book, booksContainer) {
    debugger;
    console.log(book);

    booksContainer.append(`<tr>
                            <td class="idNumb">${id}</td>
                            <td class="titleOfTheBook">${book.title}</td>
                            <td class="PublishingInformation">${book.year} (${book.publisher})</td>
                            <td class="AdditionalInformation">${book.type === "Novel" ? (book.series === null ? '': book.series):book.stories.length + ` by ${book.storiesAuthor}`} 
                                (<span class="roman">${book.type === "Novel" ?(book.seriesNumber === null ? '': 2):''} 
                                </span>)
                            </td>
                            <td class="ISBN">${book.idISBN}</td>
                            <td class="Review">${book.review}</td>
                            <td class="Action">
                                <button class="Delete">Delete Book</button>
                            </td>
                        </tr>`);
};


let removeRows = function (booksContainer) {
    booksContainer.html("");
}

let displayPage = (pageNumber, pageSize, books, booksContainer) => {
    removeRows(booksContainer);
    let startIndex = (pageNumber - 1) * pageSize;
    let endIndex = pageNumber * pageSize;
    let displayBooks = books.slice(startIndex, endIndex);
    displayBooks.forEach((b, x) => addBookToTable(x, b, booksContainer));
    $('.roman').romannumerals();
}

$(() => {


    displayPage(pageNumber, numberOfEntriesPerPage, booksForTable, $bodyOfTheTable);
})
