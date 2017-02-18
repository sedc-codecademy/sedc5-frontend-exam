
$(document).ready(function(){
    class Novel{
        constructor(title,author,publisher, year, lenght, series,isbn, review){
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.year = year;
        this.lenght = lenght;
        this.series = series;
        this.ismb = isbn;
        this.review = review;
        }
    }
    class Story {
        constructor(titleOfStory,authorOfStory,itsOriginal){
            this.titleOfStory = titleOfStory;
            this.authorOfStory = authorOfStory;
            this.itsOriginal = itsOriginal;
            storys.push(titleOfStory,authorOfStory,itsOriginal)
        }
      
    }
      let storys=[];
    class Anthology{
        constructor(title, editor,publisher, year, length,storis,isbn ,reviews, story){
            this.title = title;
            this.editor = editor;
            this.publisher = publisher;
            this.year = year;
            this.lenght = length;
            this.storis = storis;
            this.isbn = isbn; 
            this.reviews = reviews;
            this.story = storys;

        }

    }
    books = []
   $("#addBook").on("click", function(){
       $("#buts").show()
    })
  $("#addNovel").on("click", function(){
      $("#novel").show()
      $("#anthology").hide()
  })
  $("#addAnthology").on("click", function(){
      $("#anthology").show()
      $("#novel").hide()
  })
     $("#saveNovel").on("click",function(){
         let titleN = $("#titleNov").val();
         let authorN = $("#authorNov").val();
         let publisherN = $("#pubNob").val();
         let yearN = $("#yearNob").val();
         let lengthN = $("#lengthNob").val();
         let seriesN = $("#seriesNob").val();
         let isbnN = $("#isbnN").val();
         let reviewN =$("#revNob").val();
        titleN = new Novel(titleN, authorN, publisherN, yearN, lengthN, seriesN, isbnN, reviewN);
         console.log(titleN)
        
         books.push(titleN)
         $("#taBody").append(`
       <tr> <td></td>
       <td>${titleN.title}</td>
       <td>${titleN.author}</td>
       <td>${titleN.publisher}</td>
       <td>${titleN.lenght}</td>
       <td></td>
       <td>${titleN.isbn}</td>
       <td>${titleN.review}</td>
       </tr>`)
     })


     $("#addStory").on("click", function(){
         let titleSory = $("#titleStory").val();
         let autorStory = $("#autorStory").val();
         
        titleSory =  new Story(titleSory, autorStory)
         console.log(titleSory)
         
     })
     $("#saveAnthology").on("click", function(){
         let  titleAnt = $("#titleAnt").val();
         let authorAnt =$("#authorAnt").val();
         let publishAnt = $("#publishAnt").val();
         let yearAnt = $("#yearAnt").val();
         let lenghtAnt =$("#lenghtAnt").val();
         let incAnt = $("#incAnt").val();
         let isbnAnt = $("#isbnAnt").val();;
         let revAnt = $("#revAnt").val();
         titleAnt = new Anthology(titleAnt,authorAnt,publishAnt,yearAnt,lenghtAnt,incAnt,isbnAnt,revAnt, storys)
         console.log(titleAnt)
         books.push(titleAnt)
        $("#taBody").append(`
       <tr> <td></td>
       <td>${titleAnt.title}</td>
       <td>${titleAnt.editor}</td>
       <td>${titleAnt.publisher}</td>
       <td>${titleAnt.lenght}</td>
       <td></td>
       <td>${titleAnt.isbn}</td>
       <td>${titleAnt.reviews}</td>
       </tr>`)
       console.table(books)
     })
     $("#libery").on("click", function(){
         $("#novelLibery").show();
          $("#anthologylibery").show();
          $("#butt").hide()
          $("#novel").hide()
          $("#anthology").hide()
     })
     $("#addBook").on("click",function(){
        $("#novelLibery").hide();
          $("#anthologylibery").hide();
          $("#butt").show()
     })

   

})
