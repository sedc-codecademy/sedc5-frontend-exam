
$(function() {
    let books = [];
  var title = $('#title');
  var author = $('#author');
  var publisher = $('#publisher');
  var year = $('#year');
  var pages = $('#pages');
  var series = $('#series');
  var seriesNumber = $('#seriesNumber');
  var isbn = $('#isbn');
  var review = $("#review");

 var table = $('.table');
  $("#saveNovel").on('click', addBook);
  table.on('click', 'remove', deleteBook);
  
  _render();


   function _render() {
     var table = $('.table');
     var length = books.length;
     for (var i = 0; i < length; i++) {
       table.append(('<tr><td>' + books[i].title + '<td>' + books[i].author + '<td>' + books[i].publisher + '<td>' + books[i].year +'<td>' + books[i].pages + '<td>' + books[i].series + '<td>' + books[i].isbn + '<td>' + books[i].review +'</button></td></tr>'));
     };
   }

 
  function addBook() {
    var book = {
        title: $("#title").val(),
        author: $("#author").val(),
        publisher: $("#publisher").val(),
        year: $("#year").val(),
        pages: $("#pages").val(),
        series: $("#series").val(),
        seriesNumber: $("#seriesNumber").val(),
        isbn: $("#isbn").val(),
        review: $("#review").val()
    };



    if($("#title").val()== "" || $("#author").val() == "" || $("#publisher").val()=="" || $("#year").val()== "" || $("#pages").val() == "" || $("#isbn").val()=="" || $("#review").val()=="") {
        alert("Please insert value in all inputs");
    }else {

    books.push(book);
    console.log(books);
    $("#title").text="";
    $("#author").text="";
    $("publisher").text="";
    $("#year").text="";
    $("#pages").text="";
    $("#series").text="";
    $("#seriesNumber").text="";
    $("#isbn").text="";
    $("review").text="";
    _render()
    }
  }

  function deleteBook(event) {
      var element = event.target.closest('tr');
      var i = table.find('td').index(element);
      book.splice(i, 1);
      _render();
    }

$(function() {
    let books2 = [];
  var title2 = $('#title2');
  var editor = $('#editor');
  var publisher2 = $('#publisher2');
  var year2 = $('#year2');
  var pages2 = $('#pages2');
  var stories = $('#stories');
  var seriesNumber2 = $('#seriesNumber2');
  var isbn2 = $('#isbn2');
  var review2 = $("#review2");

 var table2 = $('.table2');
  $("#saveAnthologies").on('click', addBook2);
  table2.on('click', '#remove', deleteBook2);
  
  _render();


   function _render() {
     var table2 = $('.table2');
     var length2 = books2.length;
     for (var n = 0; n < length2; n++) {
       table2.append(('<tr><td>' + books2[n].title2 + '<td>' + books2[n].editor + '<td>' + books2[n].publisher2 + '<td>' + books2[n].year2 +'<td>' + books2[n].pages2 + '<td>' + books2[n].stories + '<td>' + books2[n].seriesNumber2 + '<td>' + books2[n].isbn2 + '<td>' + books2[n].review2 +'</button></td></tr>'));
     };
   }

 
  function addBook2() {
    var book2 = {
        title2: $("#title2").val(),
        editor: $("#editor").val(),
        publisher2: $("#publisher2").val(),
        year2: $("#year2").val(),
        pages2: $("#pages2").val(),
        stories: $("#stories").val(),
        seriesNumber2: $("#seriesNumber2").val(),
        isbn2: $("#isbn2").val(),
        review2: $("#review2").val()
    };



    if($("#title2").val()== "" || $("#editor").val() == "" || $("#publisher2").val()=="" || $("#year2").val()== "" || $("#pages2").val() == "" || $("#isbn2").val()=="" || $("#review2").val()=="") {
        alert("Please insert value in all inputs");
    }else {

    books2.push(book2);
    console.log(books2);
    $("#title2").text="";
    $("#editor").text="";
    $("publisher2").text="";
    $("#year2").text="";
    $("#pages2").text="";
    $("#stories").text="";
    $("#seriesNumber2").text="";
    $("#isbn2").text="";
    $("review2").text="";
    _render()
    }
  }

  function deleteBook2(event) {
      var element2 = event.target.closest('tr');
      var n = table2.find('td').index(element);
      book2.splice(i, 1);
      _render();
    }
});
});