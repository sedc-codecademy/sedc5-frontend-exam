


(() => {
    let start = 1900;
    let end = new Date().getFullYear();
    let options = " ";
    for (let year = start; year <= end; year++) {
        options += "<option>" + year + "</option>";
    }
    document.getElementById("novyear").innerHTML = options;
    document.getElementById("anthyear").innerHTML = options;
})();


class Novels {
    constructor(title, author, publisher, novyear, pages, series, novseriesNumb, idDigit, review) {
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.novyear = novyear;
        this.pages = pages;
        this.series = series;
        this.novseriesNumb = novseriesNumb;
        this.idDigit = idDigit;
        this.review = review;
    }
};

class Anthology {
    constructor(title, editor, publisher, anthyear, pages, anthstories, idDigit, review) {
        this.title = title;
        this.editor = editor;
        this.publisher = publisher;
        this.anthyear = anthyear;
        this.pages = pages;
        this.anthstories = anthstories;
        this.idDigit = idDigit;
        this.review = review;
    }
};

class Story {
    constructor(title, author, original) {
        this.title = title;
        this.author = author;
        this.original = original;
    }
};



$(document).ready(function () {


    let arrBooks = [];

    $("#bkNovel").hide();
    $("#bkAnth").hide();
    $(".addedNovel").hide();
    $(".addedAnthology").hide();

    $("#addBook").on('click', () => {
        $("#bkNovel").toggle(true);
        $("#bkAnth").toggle(true);
    })

    $("#bkNovel").on('click', () => {
        $(".addedNovel").toggle('show');
        $(".addedAnthology").toggle(false);
    });


    $("#bkAnth").on('click', () => {
        $(".addedAnthology").toggle('show');
        $(".addedNovel").toggle(false);
    });

    let newNovel = () => {
        $("#allBooksTable").append(`
            <tr>
                <td>${arrBooks[arrBooks.length - 1].title}</td>
                <td>${arrBooks[arrBooks.length - 1].author}</td>
                <td>${arrBooks[arrBooks.length - 1].publisher}</td>
                <td>${arrBooks[arrBooks.length - 1].novyear}</td>
                <td>${arrBooks[arrBooks.length - 1].pages}</td>
                <td>${arrBooks[arrBooks.length - 1].series}</td>
                <td>${arrBooks[arrBooks.length - 1].novseriesNumb}</td>
                <td>${arrBooks[arrBooks.length - 1].idDigit}</td>
                <td>${arrBooks[arrBooks.length - 1].review}</td>
            </tr>
        `);
    };

    let newAnthology = () => {
        $("#allBooksTable").append(`
            <tr>
                <td>${arrBooks[arrBooks.length - 1].title}</td>
                <td>${arrBooks[arrBooks.length - 1].editor}</td>
                <td>${arrBooks[arrBooks.length - 1].publisher}</td>
                <td>${arrBooks[arrBooks.length - 1].anthyear}</td>
                <td>${arrBooks[arrBooks.length - 1].pages}</td>
                <td>${arrBooks[arrBooks.length - 1].anthstories}</td>
                <td></td>
                <td>${arrBooks[arrBooks.length - 1].idDigit}</td>
                <td>${arrBooks[arrBooks.length - 1].review}</td>
            </tr>
        `);
    };

    $("#saveAnthology").on('click', () => {
        arrBooks.push(new Anthology(
            $('#anthtitle').val(), $('#antheditor').val(),
            $('#anthpublisher').val(), $('#anthyear option:selected').val(),
            $('#anthpages').val(), $('#anthstories').val(),
            $('#anthidDigit').val(), $('#anthreview').val()
        ));
        newAnthology();
        console.log(arrBooks);
        $('#anthtitle').val("");
        $('#antheditor').val("");
        $('#anthpublisher').val("");
        $('#anthyear').val("1900");
        $('#anthpages').val("");
        $('#anthstories').val("");
        $('#anthidDigit').val("");
        $('#anthreview').val("");
    });

    $("#saveNovel").on('click', () => {
        arrBooks.push(new Novels(
            $('#novtitle').val(), $('#novauthor').val(),
            $('#novpublisher').val(), $('#novyear option:selected').val(),
            $('#novpages').val(), $('#novseries').val(),
            $('#novseriesNumb').val(), $('#novidDigit').val(),
            $('#novreview').val()
        ));
        newNovel();
        console.log(arrBooks);
        $('#novtitle').val("");
        $('#novauthor').val("");
        $('#novpublisher').val("");
        $('#novyear').val("1900");
        $('#novpages').val("");
        $('#novseries').val("");
        $('#novseriesNumb').val("");
        $('#novidDigit').val("");
        $('#novreview').val("");
    });



    // let chekingSpacesName = (string) => {
    //     let space = " ";
    //     for (i = 0; i < space.length; i++) {
    //         if (string.indexOf(space[i]) > -1) {
    //             space = "<td>" + author + "</td>";
    //         }
    //     return alert("a");
    //     }
    //      document.getElementById("novauthor").innerHTML = numbInput;
    // }




//     let whitespaceCount = (who) => {
//         n1 = who;
//         n2 = who.replace(" ", "");
//         if (n1.length - n2.length < 2) {
//             alert("input havetwo spaces !");
//         } else {
//             return `${"<td>" + who + "</td>"}`;
//             this.value = ' ';
//         }
//         document.getElementById("novauthor").innerHTML = who;

//     };

// var whitespaceCount = "Ime  Prezime ".split("").filter( function(a){ return a === " " } ).length;
// console.log(whitespaceCount > 1);






























});
