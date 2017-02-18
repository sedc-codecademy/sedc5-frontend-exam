let $btnCreateNovel = $("#createNovel");
let $btnCreateAnthology = $("#createAnthology");

let i = 0;

//KREIRA NOVELA

function Novel(title, author, publisher, year, pages, series, serNumber, isbn, review) {
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.year = year;
    this.pages = pages;
    this.series = series;
    this.serNumber = serNumber;
    this.isbn = isbn;
    this.review = review;
}

function Anthology(title, editor, publisher, year, pages, stories, isbn, review) {
    this.title = title;
    this.editor = editor;
    this.publisher = publisher;
    this.year = year;
    this.pages = pages;
    this.stories = stories;
    this.isbn = isbn;
}
// NOVELA 




$btnCreateNovel.on('click', function (event) {
    let thead = $("#headContainer");
    thead.show();

    




    let tbody = $("#booksContainer");

    if (!$("#nameOfTheNovel").val()) {
        tbody.append(`
         <tr> 
                <th><input type="text" id="nameOfTheNovel" placeholder="Enter the title" required> </th>
                <th><input type="text" id="authorOfTheNovel" placeholder="enter the novel's author" required> </th> 
                <th><input type="text" id="novelPublisher" placeholder="enter the novel's publisher" required> </th> 
                <th><input type="number" id="yearOfNovel" placeholder="enter the year of publication" required> </th> 
                <th><input type="number" id="pagesOfNovel" placeholder="enter the length in pages" required> </th> 
                <th><input type="text" id="nameNovelSeries" placeholder="name of the novel series" required> </th> 
                <th><input type="text" id="seriesNumber" placeholder="enter the series number" required> </th> 
                <th><input type="text" id="ISBN_Novel" placeholder="enter the ISBN of the Novel" required> </th> 
                <th><input type="text" id="reviewOfTheNovel" placeholder="Write a review" required> </th> 
                <th><button type="submit" class="addNovel">Add Novel</button></th>
            </tr>
     `)
        $btnCreateNovel.prop('disabled', false);
        event.preventDefault();
        let $btnSave = $(".addNovel");
        $btnSave.on('click', function (event) {
            let arrayOfBooks = [];
            let title = $("#nameOfTheNovel").val();
            let author = $("#authorOfTheNovel").val();
            let publisher = $("#novelPublisher").val();
            let year = $("#yearOfNovel").val();
            let pages = $("#pagesOfNovel").val();
            let series = $("#nameNovelSeries").val();
            let serNumber = $("#seriesNumber").val();
            let isbn = $("#ISBN_Novel").val();
            let review = $("#reviewOfTheNovel").val();



            let book = new Novel(title, author, publisher, year, pages, series, serNumber, isbn, review);
            arrayOfBooks.push(book);
        
            let tbody = $("#booksResult");
        tbody.append(`
        <tr>
            <td>${i = i + 1} </td>
            <td>${arrayOfBooks[arrayOfBooks.length - 1].title}</td>
            <td>${arrayOfBooks[arrayOfBooks.length - 1].author}</td>
            <td>${arrayOfBooks[arrayOfBooks.length - 1].publisher}</td>
            <td>${arrayOfBooks[arrayOfBooks.length - 1].year}</td>
            <td>${arrayOfBooks[arrayOfBooks.length - 1].pages}</td>
            <td>${arrayOfBooks[arrayOfBooks.length - 1].series} ${arrayOfBooks[arrayOfBooks.length - 1].serNumber}</td>
            <td>${arrayOfBooks[arrayOfBooks.length - 1].isbn}</td>
            <td>${arrayOfBooks[arrayOfBooks.length - 1].review}</td>
        </tr>`);
    })
    } else {
    $("#nameOfTheNovel").val("");
    $("#authorOfTheNovel").val("");
    $("#novelPublisher").val("");
    $("#yearOfNovel").val("");
    $("#pagesOfNovel").val("");
    $("#nameNovelSeries").val("");
    $("#seriesNumber").val("");
    $("#ISBN_Novel").val("");
    $("#reviewOfTheNovel").val("");
}


});







//  KOPCE DONE




// CREATE ANTHOLOGY






$btnCreateAnthology.on('click', function (event) {
    let thead = $("#headContainer");
    thead.replaceWith(`
            <tr>
                <th> Title </th>
                <th> Author/Editor </th>
                <th> Anthology's publisher </th>
                <th> Year of publication </th>
                <th> Lenght in pages </th>
                <th> Name of the Anthology series</th>
                <th> Enter the ISBN </th>
                <th> Review </th>
            </tr>
            
    `)

    event.preventDefault();
    $(this).prop('disabled', true);
    let tbody = $("#booksContainer");
    if (!$("#nameOfTheAnthology").val()) {
        tbody.append(`
         <tr> 
                <th><input type="text" id="nameOfTheAnthology" placeholder="Enter the title"></th>
                <th><input type="text" id="authorOfTheAnthology" placeholder="enter the Anthology's author"> </th> 
                <th><input type="text" id="anthologyPublisher" placeholder="enter the Anthology's publisher"> </th> 
                <th><input type="number" id="yearOfAnthology" placeholder="enter the year of publication"> </th> 
                <th><input type="number" id="pagesOfAnthology" placeholder="enter the length in pages"> </th> 
                <th><input type="text" id="nameAnthologySeries" placeholder="name of the stories"> </th> 
                <th> </th>
                <th><input type="text" id="ISBN_Anthology" placeholder="ISBN of the Anthology"> </th> 
                <th><input type="text" id="reviewOfTheAnthology" placeholder="Write a review"> </th> 
                <th><button type="submit" class="addAnthology">Add Book</button></th>
            </tr>
     `)
        let $btnAddAnthology = $(".addAnthology");
        $btnAddAnthology.on('click', function (event) {
            let arrayOfBooks = [];
            if ($("#nameOfTheAnthology").val("") || $("#authorOfTheAnthology").val("") || $("#yearOfAnthology").val("")) {
                alert("You need to fill the fields!");
                arrayOfBooks = false;;
            } else {

                let title = $("#nameOfTheAnthology").val();
                console.log(title);
                let editor = $("#authorOfTheAnthology").val();
                let publisher = $("#anthologyPublisher").val();
                let year = $("#yearOfAnthology").val();
                let pages = $("#pagesOfAnthology").val();
                let stories = $("#nameAnthologySeries").val();
                let isbn = $("#ISBN_Anthology").val();
                let review = $("#reviewOfTheAnthology").val();

                let anthology = new Anthology(title, editor, publisher, year, pages, stories, isbn, review);
                arrayOfBooks.push(anthology);
            }
            let tbody = $("#booksResult");
            tbody.append(`
            <tr>
                <td>${i = i + 1} </td>
                <td>${arrayOfBooks[arrayOfBooks.length - 1].title}</td>
                <td>${arrayOfBooks[arrayOfBooks.length - 1].editor}</td>
                <td>${arrayOfBooks[arrayOfBooks.length - 1].publisher}</td>
                <td>${arrayOfBooks[arrayOfBooks.length - 1].year}</td>
                <td>${arrayOfBooks[arrayOfBooks.length - 1].pages}</td>
                <td>${arrayOfBooks[arrayOfBooks.length - 1].stories}</td>
                <td> </td>
                <td>${arrayOfBooks[arrayOfBooks.length - 1].isbn}</td>
                <td>${arrayOfBooks[arrayOfBooks.length - 1].review}</td>
            </tr>`)

        });
    } else {
        $("#nameOfTheAnthology").val("");
        console.log(title);
        $("#authorOfTheAnthology").val("");
        $("#anthologyPublisher").val("");
        $("#yearOfAnthology").val("");
        $("#pagesOfNovel").val("");
        $("#nameAnthologySeries").val("");
        $("#ISBN_Anthology").val("");
        $("#reviewOfTheAnthology").val("");
    }
});

let $btnShowResult = $("#showResult");
$btnShowResult.on('click', function (event) {
    $(this).prop('disabled', true);
    let thead = $("#headResult");
    let tbody = $("#booksResult");
    tbody.show();
    thead.show();
    thead.append(`
    <tr>
            <th></th>
            <th> Title </th>
            <th> Author </th>
            <th> Publisher </th>
            <th> Year of publication </th>
            <th> Lenght in pages </th>
            <th> Name of the series</th>
            <th> Enter the series number</th>
            <th> Enter the ISBN </th>
            <th> Review </th>
    </tr>
    `);

});

