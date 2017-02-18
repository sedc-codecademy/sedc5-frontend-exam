$(() => {
    // menu toggle
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    //--------------Delete
    $("#allRecTable").on('click', "button.delete", function (event) {

        let currentRow = $(this).parent().parent();
        currentRow.remove(); //from UI table

        let firstTD = currentRow.children()[0].innerText; //index of the element
        delete allBooks[firstTD - 1]; //delete ellement from recipe arr
    });
    //--------------View
    $("#allRecTable").on('click', "button.view", function (event) {

        let currentRow = $(this).parent().parent();
        let firstTD = currentRow.children()[0].innerText; //index of the element

        let clickedBook = allBooks[firstTD - 1];

        displayModal(clickedBook);
    });

    // display modal
    let displayModal = function (clickedBook) {
        let container = $("#modalContainer");
        container = container.html("");
        container.append(`<tr>
                <td>${clickedBook.novel}</td>
                <td>${clickedBook.antology}</td>

            </tr>`);

    };

    $("#allNewRecipeH").on('click', function (event) {
        event.preventDefault();
        $("#allRecDisplay").toggle();
    });
});

let allBooks = [];

class Bookss {
    constructor(novel, antology) {
        this.novel = novel;
        this.antology = antology;
    }
}

$("#enterBooks").on("click", (event) => {
    event.preventDefault();
    //debugger
    let novel = $("#enterNovel").val();
    let antology = $("#enterAntology").val();
    let currentBooks = new Bookss(novel, antology);

    allBooks.push(currentBooks);
    displayBooks(allBooks);

    $("#addBooksNA").trigger('reset');
});

//short
$("#sort").on("click", function (event) {
    displayBooks.sort();
    allBooks(displayBooks);
});


let displayBooks = function (allBooks) {
    let container = $("#allRecTable");
    container = container.html("");

    let count = 0
    allBooks.forEach((books) => {
        count++
        container.append(`<tr>
                <td>${count}</td>
                <td>${books.novel}</td>
                <td>${books.antology}</td>
                <td><button type="button" class="btn btn-default" data-toggle="modal" data-target="#novelsModal">Open Modal</button></td>
                <td><button type="button" class="btn btn-default delete" data-toggle="modal" data-target=".bs-example-modal-lg">Delete</button></td>
               
            </tr>`);
    });
    // alert('success');
} //End displayBooks






// novels
let allNovels = [];

class Novels {
    constructor(ntitle, nauthor, npublisher, npublication, npages, nseries, nnumber, nisbn, nreview) {
        this.ntitle = ntitle;
        this.nauthor = nauthor;
        this.npublisher = npublisher;
        this.npublication = npublication;
        this.npages = npages;
        this.nseries = nseries;
        this.nnumber = nnumber;
        this.nisbn = nisbn;
        this.nreview = nreview;
    }
}

$("#enterNovels").on("click", (event) => {
    event.preventDefault();
    let ntitle = $("#novelTitle").val();
    let nauthor = $("#novelAuthor").val();
    let npublisher = $("#novelPublisher").val();
    let npublication = $("#novelPublication").val();
    let npages = $("#novelLength").val();
    let nseries = $("#novelSeries").val();
    let nnumber = $("#novelNumber").val();
    let nisbn = $("#novelISBN").val();
    let nreview = $("#novelReview").val();

    let currentNovels = new Novels(ntitle, nauthor, npublisher, npublication, npages, nseries, nnumber, nisbn, nreview);

    allNovels.push(currentNovels);
    displayNovels(allNovels);

    $("#resetNovels").trigger('reset');
});


    $("#allNovelsHD").on('click', function (event) {
        event.preventDefault();
        $("#allNovTable").toggle();
    });

let displayNovels = function (allNovels) {
    let container = $("#allNovTable");
    container = container.html("");

    let count = 0
    allNovels.forEach((nov) => {
        count++
        container.append(`<tr>
                <td>${count}</td>
                <td>${nov.ntitle}</td>
                <td>${nov.nauthor}</td>
                <td>${nov.npublisher}</td>
                <td>${nov.npublication}</td>
                <td>${nov.npages}</td>
                <td>${nov.nseries}</td>
                <td>${nov.nnumber}</td>
                <td>${nov.nisbn}</td>
                <td>${nov.nreview}</td>
                <td><button type="button" class="btn btn-default delete" data-toggle="modal" data-target=".bs-example-modal-lg">Delete</button></td>
               
            </tr>`);
    });
} //End displayNovels


//--------------Delete
$("#allNovTable").on('click', "button.delete", function (event) {

    let currentRow = $(this).parent().parent();
    currentRow.remove(); //from UI table

    let firstTD = currentRow.children()[0].innerText; //index of the element
    delete allNovels[firstTD - 1]; //delete ellement from recipe arr
});





// antology
let allAntologys = [];

class Antologys {
    constructor(atitle, aeditor, apublisher, apublication, apages, astories, aisbn, areview) {
        this.atitle = atitle;
        this.aeditor = aeditor;
        this.apublisher = apublisher;
        this.apublication = apublication;
        this.apages = apages;
        this.astories = astories;
        this.aisbn = aisbn;
        this.areview = areview;
    }
}

$("#enterAntology").on("click", (event) => {
    event.preventDefault();
    let atitle = $("#antTitle").val();
    let aeditor = $("#antologyEditor").val();
    let apublisher = $("#antologyPublisher").val();
    let apublication = $("#antYearPub").val();
    let apages = $("#antLenpg").val();
    let astories = $("#antStor").val();
    let aisbn = $("#antIsbn").val();
    let areview = $("#antRev").val();

    let currentAntologys = new Antologys(atitle, aeditor, apublisher, apublication, apages, astories, aisbn, areview);

    allAntologys.push(currentAntologys);
    displayAntology(allAntologys);

    $("#resetAnt").trigger('reset');
}); //end click on saveNovel

let displayAntology = function (allAntologys) {
    let container = $("#allAntTable");
    container = container.html("");

    let count = 0
    allAntologys.forEach((ant) => {
        count++
        container.append(`<tr>
                <td>${count}</td>
                <td>${ant.atitle}</td>
                <td>${ant.aeditor}</td>
                <td>${ant.apublisher}</td>
                <td>${ant.apublication}</td>
                <td>${ant.apages}</td>
                <td>${ant.astories}</td>
                <td>${ant.aisbn}</td>
                <td>${ant.areview}</td>
                <td><button type="button" class="btn btn-default delete" data-toggle="modal" data-target=".bs-example-modal-lg">Delete</button></td>
               
            </tr>`);
    });

        $("#allAntologyHD").on('click', function (event) {
        event.preventDefault();
        $("#allAntTable").toggle();
    });
} //End displayNovels


//--------------Delete
$("#allAntTable").on('click', "button.delete", function (event) {

    let currentRow = $(this).parent().parent();
    currentRow.remove(); //from UI table

    let firstTD = currentRow.children()[0].innerText; //index of the element
    delete allAntologys[firstTD - 1]; //delete ellement from recipe arr
});


// $('#serchBox').on('keydown', function (event) {
//     if (event.keyCode == 13) {
//         let text = $(this).val();
//         console.log(text);
//         let serchedAntology = allAntologys.filter((Antologys) => {
//             if (Antologys.indexOf(text) !== -1) {
//                 return true;
//             }
//             return false;
//         });
//         displayAntology(serchedAntology);
//     }
// });

$("#sort").on("click", function (event) {
    allAntologys.sort();
    displayAntology(allAntologys);
});


