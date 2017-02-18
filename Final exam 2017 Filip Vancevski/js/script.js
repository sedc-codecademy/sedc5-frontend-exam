class Novel {
    constructor(title, author, publisher, year, length, series, numSeries, isbn, review) {
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.year = year;
        this.length = length;
        this.series = series;
        this.numSeries = numSeries;
        this.isbn = isbn;
        this.review = review;
    }
}

class Antology {
    constructor(title, editor, publisher, year, length, stories, isbn, review) {
        this.title = title;
        this.editor = editor;
        this.publisher = publisher;
        this.year = year;
        this.length = length;
        this.stories = stories;
        this.isbn = isbn;
        this.review = review;
    }
}





$(() => {
    let booksTable = $("#booksTable");
    let novels = [];
    let antologies = [];
    let storiesIncluded = [];
    let storiesObj = {}
    let arrayStories = [];
    let id = 1;
    let allBooks = [] // used for sorting
    let pageSize = 3;
    let pageNumber = 1;

    $("#select__books").on("change", () => {

        if ($("#select__books option:selected").val() == "novel") {
            $(".novel").toggle(".hide");
        }
        else if ($("#select__books option:selected").val() == "antology") {
            $(".antology").toggle(".hide");
        }
    })


    $("#saveNovel").on("click", () => {
        novels.push(new Novel($("#titleNovel").val(), $("#authorNovel").val(), $("#publisherNovel").val(), $("#yearOfPublicationNovel").val(), $("#pagesNovel").val(), $("#seriesNovel").val(), $("#numInSeries").val(), $("#isbnNovel").val(), $("#reviewNovel").val()));
        allBooks.push(new Novel($("#titleNovel").val(), $("#authorNovel").val(), $("#publisherNovel").val(), $("#yearOfPublicationNovel").val(), $("#pagesNovel").val(), $("#seriesNovel").val(), $("#numInSeries").val(), $("#isbnNovel").val(), $("#reviewNovel").val()));

        booksTable.append(

            `
    <tr class="bg-success">
            <td>${id++}</td>
            <td>${$(novels)[novels.length - 1].title}</td>
            <td>${$(novels)[novels.length - 1].author}</td>
            <td>${$(novels)[novels.length - 1].year + " " + $(novels)[novels.length - 1].publisher}</td>
            <td>${$(novels)[novels.length - 1].length}</td>
            <td>${$(novels)[novels.length - 1].series + " " + $(novels)[novels.length - 1].numSeries}</td>
            <td>${$(novels)[novels.length - 1].isbn}</td>
            <td>${$(novels)[novels.length - 1].review}</td>
            <td><button id="deleteBook" class="btn btn-danger">Delete</button></td>
        </tr>
    
    `
        )




        $(".booksShow").toggle(".hide");
        $(".novel").toggle(".hide");

    })

    $("#addStory").on("click", () => {
        storiesObj["title"] = $("#storyTitle").val();
        storiesObj["author"] = $("#authorStory").val();
        storiesObj["original"] = $("#storySelect option:selected").val();

        arrayStories.push(storiesObj);

        storiesIncluded.push($("#storyTitle").val() + ",");
        $("#stories").val(storiesIncluded);
        $("#storyTitle").val("");

    })


    $("#saveAntology").on("click", () => {
        antologies.push(new Antology($("#titleAntology").val(), $("#editorAntology").val(), $("#publisherAntology").val(), $("#yearOfPublicationAntology").val(), $("#pagesAntology").val(), storiesIncluded, $("#isbn_antology").val(), $("#reviewAntology").val()));
        allBooks.push(new Antology($("#titleAntology").val(), $("#editorAntology").val(), $("#publisherAntology").val(), $("#yearOfPublicationAntology").val(), $("#pagesAntology").val(), storiesIncluded, $("#isbn_antology").val(), $("#reviewAntology").val()));

        $(".antology").toggle(".hide");
        $(".booksShow").toggle(".hide");
        booksTable.append(
            `
        <tr class="bg-success">
            <td>${id++}</td>
            <td>${$(antologies)[antologies.length - 1].title}</td>
            <td>${$(antologies)[antologies.length - 1].editor}</td>
            <td>${$(antologies)[antologies.length - 1].year + " " + $(antologies)[antologies.length - 1].publisher}</td>
            <td>${$(antologies)[antologies.length - 1].length}</td>
            <td>${storiesIncluded.length + " stories by " + $(arrayStories)[arrayStories.length - 1].author}</td>
            <td>${$(antologies)[antologies.length - 1].isbn}</td>
            <td>${$(antologies)[antologies.length - 1].review}</td>
            <td><button id="deleteBook" class="btn btn-danger">Delete</button></td>
        </tr>
        
        `
        )
        storiesObj = {};

    })

    $("#addBook").on("click", () => {
        $(".booksShow").toggle(".hide");
        $(".novel").toggle(".hide");
    })

});
// CODE BELLOW DOES NOT WORK RESTRUCTURE THE CODE ABOVE

    // let removeRows = function () {
    //     booksTable.html("");
    // }

    // let displayPage = (pageNumber, pageSize, allBooks, booksTable) => {
    //     
    //     removeRows(booksTable);

    //     // let startIndex = (pageNumber - 1) * pageSize;
    //     let endIndex = pageNumber * pageSize;
    //     var currentBooks = [];
    //     var counter = pageSize > allBooks.length ? allBooks.length : pageSize;
    //     for (let i = 0; i < counter; i++) {
    //         currentBooks.push(allBooks[endIndex, i]);
    //     }
    //     let displayBooks = currentBooks;
    //     for (let i = 0; i < displayBooks.length; i++) {
    //        
    //         booksTable.append(
    //             `
    //     <tr class="bg-success">
    //     <td>${id++}</td>
    //     <td>${displayBooks[i].title}</td>
    //     <td>${displayBooks[i].author}</td>
    //     <td>${displayBooks[i].publisher + " " + displayBooks[i].year}</td>
    //     <td>${displayBooks[i].length}</td>
    //     <td>${displayBooks[i].series + " " + displayBooks[i].numSeries}</td>
    //     <td>${displayBooks[i].isbn}</td>
    //     <td>${displayBooks[i].review}</td>
    //     <td><button id="deleteBook" class="btn btn-danger">Delete</button></td>
    //     </tr>
        
    //     `
    //         )
    //     }
    //     id--;

    // }





//     $("#tableTitle").on("click", () => {
//         let sorted = false;
//         if (!sorted) {
//             allBooks.sort(function (a, b) {
//                 if (a.title < b.title) {
//                     sorted = true;
//                     return -1;
//                 }
//                 if (a.title > b.title) {
//                     return 1
//                 }
//                 return 0;
//             })
//         }
//     })