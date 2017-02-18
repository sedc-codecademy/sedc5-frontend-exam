


  let booksNovels = [];
  let bookAnthologys = [];

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
                                            // Novels //

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


                                            //Antology//
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
        let selectBook = $("#sel1").val();
        let title = $("#novel-title").val();
        let author = $("#novel-author").val();
        let publisher = $("#novel-publisher").val();
        let publication = $("#novel-publication").val();
        let length = $("#length").val();
        let isbn = $("#isbn").val();
        let review = $("#review").val();
        let name = $("#name-series-input").val();
        let seriesNumber = $("#series-number-input").val();
        let story = $("#anthology-stories-input").val();
        let newBook = new Novel(title, author, publisher, publication, length, isbn, review, name, seriesNumber);
        let newAnthology = new Anthology(title, author, publisher, publication, length, isbn, review, story);
        if(selectBook == "Novel") {
        booksNovels.push(newBook);
        }else if(selectBook == "Anthology") {
            bookAnthologys.push(newAnthology);
            console.log(bookAnthologys);
        }
    }


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


$("#submit").click(function(){
    addNewBook();
    print();
})


  

