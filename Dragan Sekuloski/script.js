let allBooks = [];

$(() => {

    $("#allBooks").hide();
    $("#addNovelDIV").hide();
    $("#AnthologieDIV").hide();


    $("#viewBooks").on("click", function (event) {
        showBooks(allBooks);
        $("#allBooks").toggle();
        $("#addNovelDIV").hide();
        $("#AnthologieDIV").hide();
    });

    $("#addNovel").on("click", function (event) {
        $("#addNovelDIV").toggle();
        $("#allBooks").hide();
        $("#AnthologieDIV").hide();
        $("#addBook").click();
    });

    $("#addAnthologie").on("click", function (event) {
        $("#AnthologieDIV").toggle();
        $("#allBooks").hide();
        $("#addNovelDIV").hide();
        $("#addBook").click();
    });


    class Book {
        constructor(title, principal, publishingInfo, pageLength, additionalInfo, isbnNumber, review, color) {
            this.title = title;
            this.principal = principal;
            this.publishingInfo = publishingInfo;
            this.pageLength = pageLength;
            this.additionalInfo = additionalInfo;
            this.isbnNumber = isbnNumber;
            this.review = review;
            this.color = color;
        }
    }




    $("#saveNovel").on("click", function (event) {
        event.preventDefault();

        let  additionalInfo = $("#novelSeries").val() + " " + $("#novelSeriesNumber").val();
        

        let publishingInfo = $("#novelPublisher").val() + " " + $("#novelYear").val();



        let title = $("#novelTitle").val();
        let principal = $("#novelAutor").val();
        let pageLength = $("#novelPageLength").val();
        let isbnNumber = $("#novelISBN").val();
        let review = $("#novelReview").val();

        let oneNovel = new Book(title, principal, publishingInfo, pageLength, additionalInfo, isbnNumber, review, "#00004d");
        addBook(oneNovel);
        // console.log(oneNovel);
        // console.log(allBooks);

        $("#addNovelDIV").hide();
        $("#cleaNovelDIV").click();
    });

    $("#cleaNovelDIV").on("click", function (event) {
        $("#novelTitle").val("");
        $("#novelAutor").val("");
        $("#novelPublisher").val("");
        $("#novelYear").val("");
        $("#novelPageLength").val("");
        $("#novelSeries").val("");
        $("#novelSeriesNumber").val("");
        $("#novelISBN").val("");
        $("#novelReview").val();

        $("#addNovelDIV").hide();
    });

    $("#saveAnthology").on("click", function (event) {
        event.preventDefault();
        let original = $("#storieOriginal").is(':checked');
        console.log(original)
        if (original) {
            original = "Yes";
        } else {
            original = "No";
        }



        let additionalInfo = $("#storiesTitle").val() + " " + $("#storiesAutor").val() + "is original " + original;



        let publishingInfo = $("#anthologyPublisher").val() + " " + $(anthologyYear).val();


        // console.log(original)
        let title = $("#anthologyTitle").val();
        let principal = $("#anthologylEditor").val();
        let pageLength = $("#anthologyPageLength").val();
        let isbnNumber = $("#anthologyISBN").val();
        let review = $("#anthologyReview").val();

        let oneAnthology = new Book(title, principal, publishingInfo, pageLength, additionalInfo, isbnNumber, review, "#4d0000");
        addBook(oneAnthology);
        // console.log(oneAnthology);
        // console.log(allBooks);

        $("#AnthologieDIV").hide();
        $("#cleaAnthologyDIV").click();
    });

    $("#cleaAnthologyDIV").on("click", function (event) {
        $("#anthologyTitle").val("");
        $("#anthologylEditor").val("");
        $("#anthologyPublisher").val("");
        $("#anthologyYear").val("");
        $("#anthologyPageLength").val("");
        $("#storiesTitle").val("");
        $("#storiesAutor").val("");
        $("#anthologyISBN").val("");
        $("#anthologyReview").val("");
        $('#storieOriginal').prop('checked', false);

        $("#AnthologieDIV").hide();
    });

    $("#renderBooks").on("click", ".btn-danger", function (event) {
        let indexInArr = $(this).closest("tr").children()[0].innerText - 1;
        // console.log(indexInArr);

        allBooks.splice(indexInArr, 1);
        showBooks(allBooks);
    });

    function addBook(objBook) {
        allBooks.push(objBook);
    } //End function addBook

    function showBooks(arrOfBooks) {
        let container = $("#renderBooks").html("");
        $.each(arrOfBooks, function (index) {

            let oneBook = arrOfBooks[index];
            console.log(oneBook);
            container.append(
                `<tr style="color:${oneBook.color}">
                            <th class="text-center">${index + 1}</th>
                            <th class="text-center">${oneBook.title}</th>
                            <th class="text-center">${oneBook.principal}</th>
                            <th class="text-center">${oneBook.publishingInfo}</th>
                            <th class="text-center">${oneBook.pageLength}</th>
                            <th class="text-center">${oneBook.additionalInfo}</th>
                            <th class="text-center">${oneBook.isbnNumber}</th>
                            <th class="text-center">${oneBook.review}</th>
                            <th class="text-center"><button type="button" class="btn btn-danger">Delete</button></th>
                        </tr>`);
        });

        let result = $("#booksLength").text(arrOfBooks.length);
    }//End function showBooks

});//end on load