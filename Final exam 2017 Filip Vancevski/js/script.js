class Book {
    constructor(title, publisher, year, length, isbn, review) {
        this.title = title;
        this.publisher = publisher;
        this.year = year;
        this.length = length;
        this.isbn = isbn;
        this.review = review;
    }
}



class Novel extends Book {
    constructor(title, author, publisher, year, length, series, numSeries, isbn, review) {
        super(title, publisher, year, length, isbn, review)
        this.type = "Novel";
        this.author = author;
        this.series = series;
        this.numSeries = numSeries;

    }
}

class Antology extends Book {
    constructor(title, editor, publisher, year, length, stories, isbn, review) {
        super(title, publisher, year, length, isbn, review)
        this.type = "Antology";
        this.editor = editor;
        this.stories = stories;


    }
}






$(() => {
    let booksTable = $("#booksTable");
    let novels = [];
    let antologies = [];
    let storiesIncluded = [];
    let storiesObj = {}
    let arrayStories = [];
    let id = 0;
    let allBooks = [] // used for sorting
    let pageSize = 3;
    let pageNumber = 1;

    $("#select__books").on("change", () => {

        if ($("#select__books option:selected").val() == "novel") {
            $(".novel").toggle(".hide");
        } else if ($("#select__books option:selected").val() == "antology") {
            $(".antology").toggle(".hide");
        }

    })

    // add books kako funkcija treba da se popravi bidejki raboti tocno samo za noveli, mora da se napravi klasa Books !!!!
    let addBooks = (books, booksTable, id) => {
        debugger;
        if (books.type === "Novel") {

            booksTable.append(
                `<tr class="bg-success">
            <td>${id + 1}</td>
            <td>${books.title}</td>
            <td>${books.author}</td>
            <td>${books.year + " " + books.publisher}</td>
            <td>${books.length}</td>
            <td>${books.series + " " + books.numSeries}</td>
            <td>${books.isbn}</td>
            <td>${books.review}</td>
            <td><button id="deleteBook" class="btn btn-danger">Delete</button></td>
        </tr>`
            )
        } else if (books.type === "Antology") {
            debugger;

            booksTable.append(
                `<tr class="bg-success">
            <td>${id + 1}</td>
            <td>${books.title}</td>
            <td>${books.editor}</td>
            <td>${books.year + " " + books.publisher}</td>
            <td>${books.length}</td>
            <td>${arrayStories.length + " by " + $(arrayStories)[arrayStories.length - 1].writer}</td>
            <td>${books.isbn}</td>
            <td>${books.review}</td>
            <td><button id="deleteBook" class="btn btn-danger">Delete</button></td>
        </tr>`
            )
        }

    }



    $("#saveNovel").on("click", () => {
        debugger
        novels.push(new Novel($("#titleNovel").val(), $("#authorNovel").val(), $("#publisherNovel").val(), $("#yearOfPublicationNovel").val(), $("#pagesNovel").val(), $("#seriesNovel").val(), $("#numInSeries").val(), $("#isbnNovel").val(), $("#reviewNovel").val()));
        allBooks.push(new Novel($("#titleNovel").val(), $("#authorNovel").val(), $("#publisherNovel").val(), $("#yearOfPublicationNovel").val(), $("#pagesNovel").val(), $("#seriesNovel").val(), $("#numInSeries").val(), $("#isbnNovel").val(), $("#reviewNovel").val()));

        displayPage(pageNumber, pageSize, allBooks, booksTable);

        $(".booksShow").toggle(".hide");
        $(".novel").toggle(".hide");
        $("#searchBooks").toggle(".hide");

    })



    $("#saveAntology").on("click", () => {
        debugger;
        antologies.push(new Antology($("#titleAntology").val(), $("#editorAntology").val(), $("#publisherAntology").val(), $("#yearOfPublicationAntology").val(), $("#pagesAntology").val(), arrayStories, $("#isbn_antology").val(), $("#reviewAntology").val()));
        allBooks.push(new Antology($("#titleAntology").val(), $("#editorAntology").val(), $("#publisherAntology").val(), $("#yearOfPublicationAntology").val(), $("#pagesAntology").val(), arrayStories, $("#isbn_antology").val(), $("#reviewAntology").val()));

        displayPage(pageNumber, pageSize, allBooks, booksTable);

        $(".booksShow").toggle(".hide");
        $(".antology").toggle(".hide");
        $("#searchBooks").toggle(".hide");

        storiesIncluded =[];
        storiesObj = {};
        arrayStories = [];

    })


    $("#addStory").on("click", () => {
        debugger;
        storiesObj["title"] = $("#storyTitle").val();
        storiesObj["writer"] = $("#authorStory").val();
        storiesObj["original"] = $("#storySelect option:selected").val();

        arrayStories.push(storiesObj);

        storiesIncluded.push($("#storyTitle").val() + ",");
        $("#stories").val(storiesIncluded);
        $("#storyTitle").val("");

    })


    $("#addBook").on("click", () => {
        debugger;
        $(".booksShow").toggle(".hide");
        $("#select__books").val($("#mySelect option:first").val());
        
    })



    let removeRows = () => {
        booksTable.html("");
    }


    let displayPage = (pageNumber, pageSize, books, booksTable) => {
        debugger;
        removeRows(booksTable);

        let startindex = (pageNumber - 1) * pageSize;
        let endIndex = pageNumber * pageSize;
        displayBooks = allBooks.slice(startindex, endIndex);
        displayBooks.forEach((a, id) => addBooks(a, booksTable, id));
    }

    // all books se koristi koga se povikuva funkcijata poso tamu se site knigi nezagadeni od drug kod.
    $("#btnNext").on("click", () => {
        debugger;
        let maxPageNumber = Math.ceil(allBooks.length / pageSize);
        if (pageNumber < maxPageNumber) {
            pageNumber += 1;
        }
        displayPage(pageNumber, pageSize, allBooks, booksTable);
    })

    $("#btnPrevious").on("click", () => {
        if (pageNumber > 1) {
            pageNumber -= 1;
        }
        displayPage(pageNumber, pageSize, allBooks, booksTable);
    })

    $("#searchBooks").on("keyup", () => {
        debugger;
        let searchBook = $("#searchBooks").val();
        if (!searchBook)
            return;
        searchBook = searchBook.replace(/\s+/g, ' ').toLowerCase();

        let filterBooks = allBooks.filter(book => {
            if (book.author.replace(/\s+/g, ' ').toLowerCase().indexOf(searchBook) !== -1)
                return true;
            if (book.title.replace(/\s+/g, ' ').toLowerCase().indexOf(searchBook) !== -1)
                return true;
            return false;
        });
        pageNumber = 1;

        displayPage(pageNumber, pageSize, allBooks, booksTable);

        booksTable.html("");
        filterBooks.forEach((book) => {
            addBooks(book, booksTable);
        })

        if (searchBook.val == "") {
            displayPage(pageNumber, pageSize, filterBooks, booksTable);
        
        }
})

});