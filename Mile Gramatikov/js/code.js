$(document).ready(function () {
    $("#newbook").click(function () {
        $('body').append(`
     <select class="form-control" id='izbor'>
     <option>   Novel Book  </option>
     <option>   Anthology   </option>
     </select> 
     <button id='submit' onclick='choise()' value='Submit'>Submit</button>
     `);
        $(this).hide();
    });
});

var novelBooks = [];
var anthologyBooks = [];

function novelBook(novelTitle, novelAuthor, novelPublisher, publicationYear, series, numSeries, isbn, novelReview) {
    this.novelTitle = novelTitle;
    this.novelAuthor = novelAuthor;
    this.novelPublisher = novelPublisher;
    this.publicationYear = publicationYear;
    this.series = series;
    this.numSeries = numSeries;
    this.isbn = isbn;
    this.novelReview = novelReview;
}

function anthologyBook(anthologyTitle, anthologyEditor, anthologyPublisher, apublicationYear, pagelength, story, aisbn, anthologyReview) {
    this.anthologyTitle = anthologyTitle;
    this.anthologyEditor = anthologyEditor;
    this.anthologyPublisher = anthologyPublisher;
    this.apublicationYear = apublicationYear;
    this.pagelength = pagelength;
    this.story = story;
    this.aisbn = aisbn;
    this.anthologyReview = anthologyReview;
}
$('#aviewlibraty').hide();
$('#viewlibraty').hide();
$('#addanother').hide();
$('.table-responsive').hide();


function choise() {
    var selected = $("#izbor").val();
    if (selected == "Novel Book") {
        $('body').append(`
            <form id='forma'> 
            <p class='title'>Novel Title :</p> <input type='text' id='title' required> 
            <p class='author'>Novel Author : </p><input type='text' id='author' required>
            <p class='publisher'>Novel Publisher :</p> <input type='text' id='publisher'>
            <p class='yearpublication'>Year of publication :</p> <input type='number' id='yearpublication' min='1900' max='2016'>
            <p class='series'>Series and series number (optional) : </p><input type='text' id='series'>
            <input type="number" id='seriesnumber'>
            <p class='isbn'>ISBN :</p> <input type='text' id='isbn'>
            <p class='review'>Review :</p> <textarea id='review'> </textarea> 
            <p></p>
            <input type="button" id='submited' value='Add Novel Book' onclick='getInfo()'>
            </form>`);
    }

    else {
        $('body').append(`
        <form id='forma1'> 
            <p class='title'>Anthology Title :</p> <input type='text' id='atitle' required> 
            <p class='title'>Anthology Editor :</p> <input type='text' id='editor' required>
            <p class='title'>Anthology Publisher :</p> <input type='text' id='apublisher'>
            <p class='title'>Year of publication :</p> <input type='number' id='ayearpublication' min='1900' max='2016'>
            <p class='title'>Length in pages :</p> <input type='number' id='pagelength'>
            <p class='title'>Stories :</p> <input type='checkbox' value='New Story' id='newstory' >
            <p class='title'>ISBN :</p> <input type='text' id='aisbn'>
            <p class='title'>Review :</p> <textarea id='areview'> </textarea>
            <p></p>
            <input id='asubmited' type='button' value="Add Anthology Book" onclick='agetInfo()'>
            </form>`);
    };



    $("#newstory").click(function () {
        $('#story').append(`
    <textarea id='stori'> </textarea>
    `);

    });



    $('#submited').click(function () {
        $('#forma').hide();

    });

    $('#asubmited').click(function () {
        $('#forma1').hide();
        $('#stori').hide();
    });

    $('#seriesnumber').hide();

    $('#series').change(function () {
        var inp = $("#series").val();
        if (inp.length > 0) {
            $('#seriesnumber').show();
        }

    });

    $('#izbor').hide();
    $('#submit').hide();
}


function getInfo() {
    var novelTitle = $("#title").val();
    var novelAuthor = $("#author").val();
    var novelPublisher = $("#publisher").val();
    var publicationYear = $("#yearpublication").val();
    var series = $("#series").val();
    var numSeries = $("#seriesnumber").val();
    var isbn = $("#isbn").val();
    var novelReview = $("#review").val();
    var book1 = new novelBook(novelTitle, novelAuthor, novelPublisher, publicationYear, series, numSeries, isbn, novelReview);
    novelBooks.push(book1);
    $('body').append("<p class='added'> Book Added ! </p>");
    $('#viewlibraty').show();
    $('#forma').hide();
}

function agetInfo() {
    var anthologyTitle = $("#atitle").val();
    var anthologyEditor = $("#editor").val();
    var anthologyPublisher = $("#apublisher").val();
    var apublicationYear = $("#ayearpublication").val();
    var pagelength = $("#pagelength").val();
    var story = $("#stori").val();
    var aisbn = $("#aisbn").val();
    var anthologyReview = $("#areview").val();
    var book2 = new anthologyBook(anthologyTitle, anthologyEditor, anthologyPublisher, apublicationYear, pagelength, story, aisbn, anthologyReview);
    anthologyBooks.push(book2);
    $('body').append("<p class='added'> Book Added ! </p>");
    $('#aviewlibraty').show();
}


function viewNovelLibraty() {
    $('.table22').html(""); 
    for (n=0; n<novelBooks.length; n++) {
        var tableRow1 = $("<tr></tr>");
        tableRow1.append(
     + "<tr>" 
     + "<td>"+ (n+1) +"</td>"
     + "<td>"+ novelBooks[n].novelTitle +"</td>"
     + "<td>"+ novelBooks[n].novelAuthor +"</td>"
     + "<td>"+ novelBooks[n].novelPublisher +"</td>"
     + "<td>"+ novelBooks[n].publicationYear +"</td>"
     + "<td>"+ novelBooks[n].isbn +"</td>"
     + "<td>"+ novelBooks[n].series +"</td>"
     + "<td>"+ novelBooks[n].novelReview +"</td>"
     + "<td>"+ "<input type='button' onclick='deleteThis()' value='Delete'>" +"</td>"
     + "</tr>"
    );
    $('.table').append(tableRow1);
    }
    $('.table-responsive').show();
    $('.added').remove();
    $('#viewlibraty').hide();
    $('#addanother').show();
    $('#forma').hide();
    $('#forma1').hide();
}

function viewAnthologyLibraty() {
    $(".table22").html("");
    for (var i=0; i<anthologyBooks.length; i++) {
        var tableRow = $("<tr></tr>");
        tableRow.append( 
     + "<tr>" 
     + "<td>"+ (i+1) +"</td>"
     + "<td>"+ anthologyBooks[i].anthologyTitle +"</td>"
     + "<td>"+ anthologyBooks[i].anthologyEditor+"</td>"
     + "<td>"+ anthologyBooks[i].anthologyPublisher+"</td>"
     + "<td>"+ anthologyBooks[i].apublicationYear +"</td>"
     + "<td>"+ anthologyBooks[i].aisbn +"</td>"
     + "<td>"+ anthologyBooks[i].story+"</td>"
     + "<td>"+ anthologyBooks[i].anthologyReview +"</td>"
     + "<td>"+ "<input type='button' onclick='deleteThis()' value='Delete'>" +"</td>"
     + "</tr>"
    ); 
    $('.table').append(tableRow);
}
    $('#forma1').hide();
    $('.table-responsive').show();
    $('.added').remove();
    $('#aviewlibraty').hide();
    $('#addanother').show();
    
}



function addAnother() {
    $('.table-responsive').hide();
    choise();
    $('#addanother').hide();
    $('#forma1').hide();
    $('#forma').hide();
}

