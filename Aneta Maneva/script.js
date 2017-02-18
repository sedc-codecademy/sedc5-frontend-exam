var selected = "";
$(document).ready(function(){
  $("#searchnovels").on("click",function(){
   $("#searchnovels").hide();
   $("#searchnovels").show();
  });
   $(".allant").hide();
   $(".allnov").hide();

   $("#searchnovels").on("click",function(){
    $(".allnov").show();
    $(".allant").hide();
    selected = "novels";

   });

   $("#searchanthology").on("click",function(){
    $(".allnov").hide();
    $(".allant").show();
    selected = "anthologies";

  
   
     
    });

$("#addbooks").click(function(){
        
        if(selected == "novels")
        {
            var title = $("#titlenov").val();
            var author = $("#authornov").val();
            var publisher = $("#publishernov").val();
            var year = $("#yearnov").val();
            var lengthinpages = $("#lengthnov").val();
            var series = $("#seriesnov").val();
            var seriesnumber = $("#senumnov").val();
            var isbn = $("#isbnnov").val();
            var review = $("#reviewnov").val();
            var book = new Novel(title,author,publisher,year,lengthinpages,series,seriesnumber,isbn,review);
           
            books.push(book);
            console.log(book);
        }

         else 
        {
            var title = $("#titleant").val();
            var author = $("#authorant").val();
            var publisher = $("#publisherant").val();
            var year = $("#yearant").val();
            var lengthinpages = $("#lengthant").val();
            var stories = $("#storiesant").val();
            var isbn = $("#isbnant").val();
            var review = $("#reviewant").val();
            var book = new Anthology(title,author,publisher,year,lengthinpages,stories,isbn,review);
           
            books.push(book);
            console.log(book);
        }
       printTable();
       

     });

   });







var books = [];

function Novel(title,author,publisher,year,lengthinpages,series,seriesnumber,isbn,review)
{
   this.title=title;
   this.author=author;
   this.publisher=publisher;
   this.year=year;
   this.lengthinpages=lengthinpages;
   this.series=series;
   this.seriesnumber=seriesnumber;
   this.isbn=isbn;
   this.review=review;
};


function Anthology(title,author,publisher,year,lengthinpages,stories,isbn,review)
{
   this.title=title;
   this.author=author;
   this.publisher=publisher;
   this.year=year;
   this.lengthinpages=lengthinpages;
   this.stories=stories;
   this.isbn=isbn;
   this.review=review;
};

function printTable(){
    $(".tabnov").show();

    for(var i = 0; i < books.length; i++ ){
        var tableRow = $("<tr></tr>");
        var tempBook = books[i];
        tableRow.append("<td>"+ tempBook.title + "</td>");
        tableRow.append("<td>"+ tempBook.author + "</td>");
        tableRow.append("<td>"+ tempBook.publisher + "</td>");
        tableRow.append("<td>"+ tempBook.year + "</td>");
        tableRow.append("<td>"+ tempBook.lengthinpages + "</td>");
        tableRow.append("<td>"+ tempBook.series + "</td>");
        tableRow.append("<td>"+ tempBook.seriesnumber + "</td>");
        tableRow.append("<td>"+ tempBook.isbn + "</td>");
        tableRow.append("<td>"+ tempBook.review + "</td>");





        $("#library-body").append(tableRow);
    }
}

