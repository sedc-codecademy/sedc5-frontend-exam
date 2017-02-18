// $("#name-series-input").hide();
// $("#name-series").click(function(){
// $("#name-series-input").show();

// });
var booksNovels = [];
var bookAnthologys = [];
// var bookOne = new Novel("The forever man", "Joe haldeman", "gollancz", "202", "2001", "9555744", "interesting book", "name", "20678");
// var bookTwo = new Novel ("I am Legend", "Richard Mateson", "gollancs", "203", "650", "9987559", "super", "ime", "58");
// books.push(bookOne, bookTwo);

$("#name-series-input").hide();
$("#name-series").click(function (event) {
    if ($(this).is(":checked"))
        $("#name-series-input").show();
    else
        $("#name-series-input").hide();
});

$("#series-number-input").hide();
$("#series-number").click(function (event) {
    if ($(this).is(":checked"))
        $("#series-number-input").show();
    else
        $("#series-number-input").hide();
});

$("#anthology-stories-input").hide();
$("#anthology-stories").click(function (event) {
    if ($(this).is(":checked"))
        $("#anthology-stories-input").show();
    else
        $("#anthology-stories-input").hide();
});

$("#table1").hide();
$("#submit").click(function (addNewBook) {
    $("#table1").show();
});

$("#table2").hide();
$("#submit").click(function (addNewAnthology) {
    $("#table2").show();
});

//constructor
function Novel(title, author, publisher, publication, length, isbn, review, name, seriesNumber) 
{
        this.novelTitle = title;
        this.novelAuthor = author;
        this.novelPublisher = publisher;
        this.novelPublication = publication;
        this.novelLength = length;
        this.novelIsbn = isbn;
        this.novelReview = review;
        this.novelName = name;
        this.novelNumber = seriesNumber;
    }
function Anthology(title, author, publisher, publication, length, isbn, review, story)
{
        this.anthologyTitle = title;
        this.anthologyAuthor = author;
        this.anthologyPublisher = publisher;
        this.anthologyPublication = publication;
        this.anthologyLength = length;
        this.anthologyIsbn = isbn;
        this.anthologyReview = review;
        this.anthologyStory = story;
      
}

function addNewBook() {
    var selectBook = $("#sel1").val();
    var title = $("#novel-title").val();
    var author = $("#novel-author").val();
     var publisher = $("#novel-publisher").val();
    var publication = $("#novel-publication").val();
    var length = $("#length").val();
    var isbn = $("#isbn").val();
    var review = $("#review").val();
    var name = $("#name-series-input").val();
    var seriesNumber = $("#series-number-input").val();
    var story = $("#anthology-stories-input").val();
    var newBook = new Novel(title, author, publisher, publication, length, isbn, review, name, seriesNumber);
    var newAnthology = new Anthology(title, author, publisher, publication, length, isbn, review, story);
    if(selectBook == "Novel") {
     booksNovels.push(newBook);
    }else if(selectBook == "Anthology") {
        bookAnthologys.push(newAnthology);
        console.log(bookAnthologys);
    }
}

// function addNewAnthology() {
//     var title1 = $("#novel-title").val();
//     var author1 = $("#novel-author").val();
//      var publisher1 = $("#novel-publisher").val();
//     var publication1 = $("#novel-publication").val();
//     var length1 = $("#length").val();
//     var isbn1 = $("#isbn").val();
//      var review1 = $("#review").val();
//     var story1 = $("#anthology-stories-input").val();
  
//     var newAnthology = new Anthology(title1, author, publisher, publication, length, isbn, review, stories);
//     console.log(newAnthology)
//     anthology.push(newAnthology);
    
// }






function print() {
    $("#book-list").html("");
    let bookList = $("#book-list");
    let anthologyList = $("#anthology-list");

    for (var i = 0; i < booksNovels.length; i++) {
        let tempBook = booksNovels[i];
        bookList.append(`<tr>
        <td>${tempBook.novelTitle}</td>
        <td>${tempBook.novelAuthor}</td>
        <td>${tempBook.novelPublisher}</td>
          <td>${tempBook.novelPublication}</td>
        <td>${tempBook.novelLength}</td>
          <td>${tempBook.novelIsbn}</td>
        <td>${tempBook.novelReview}</td>
          <td>${tempBook.novelName}</td>
          <td>${tempBook.novelNumber}</td>
        
    </tr>`)
}
    for (var i = 0; i < bookAnthologys.length; i++) {
        let tempBook = bookAnthologys[i];
        anthologyList.append(`<tr>
        <td>${tempBook.anthologyTitle}</td>
        <td>${tempBook.anthologyAuthor}</td>
        <td>${tempBook.anthologyPublisher}</td>
          <td>${tempBook.anthologyPublication}</td>
        <td>${tempBook.anthologyLength}</td>
          <td>${tempBook.anthologyIsbn}</td>
        <td>${tempBook.anthologyReview}</td>
          <td>${tempBook.anthologyName}</td>
          <td>${tempBook.anthologyNumber}</td>
       
    </tr>`)
}



}

// function print() {
//     $("#anthology-list").html("");
//     let anthologyList = $("#anthology-list");
//     for (var i = 0; i < anthology.length; i++) {
//         var tempAnthology = anthology[i];
//         anthologyList.append(`<tr>
//         <td>${tempAnthology.anthologyTitle}</td>
//         <td>${tempAnthology.anthologyAuthor}</td>
//         <td>${tempAnthology.anthologyPublisher}</td>
//           <td>${tempAnthology.anthologyPublication}</td>
//         <td>${tempAnthology.anthologyLength}</td>
//           <td>${tempAnthology.anthologyIsbn}</td>
//         <td>${tempAnthology.anthologyReview}</td>
//           <td>${tempAnthology.anthologyName}</td>
//           <td>${tempAnthology.anthologyNumber}</td>
//         <td>0</td>
//     </tr>`)
//     }
// }

$("#submit").click(function(){
    addNewBook();
    print();
})


    //     var tableBody = $("#book-list");
    //    var tableRow = $("tr");
    //     for(var i = 0; i < books.length; i++){
    //         var tempBook = books[i];

    //         tableBody.append(tableRow)
    //         tableRow.append("<td>"+ tempBook.title+"</td>")
    //          tableRow.append("<td>"+ tempBook.author+"</td>")
    //          tableRow.append("<td>"+ tempBook.publisher+"</td>")
    //               tableRow.append("<td>"+ tempBook.publication+"</td>")
    //                tableRow.append("<td>"+ tempBook.length+"</td>")
    //                 tableRow.append("<td>"+ tempBook.isbn+"</td>")
    //                 tableRow.append("<td>"+ tempBook.review+"</td>")
    //                tableRow.append("<td>"+ tempBook.name+"</td>")
    //                 tableRow.append("<td>"+ tempBook.seriesNumber+"</td>")


            //  var books = $("#novel").val();
            // $("#submit").click(function(){

            //    var books = $("#novel").val(); 
            // });

