$(document).ready(function () {

    let books = [];

    class Books {
        constructor(novel, antology) {
            this.novel = novel;
            this.antology = antology;
        }
    }


    class novel extends Books {
        constructor(title, author, publisher, year, series, isbn, rewiev) {
            this.title = title;
            this.author = author;
            this.publisher - publisher;
            this.year = year;
            this.series = series;
            this.isbn = isbn;
            this.rewiev = rewiev;
        };


    }
    class antology extends novel {
        constructor(title, editor, publisher, year, lenght, stories, isbn, rewiev) {
            this.atitle = title;
            this.aeditor = editor;
            this.apublisher = publisher;
            this.ayear = year;
            this.alenght = lenght;
            this.astories = stories;
            this.aisbn = isbn
            this.arewiev = rewiev;

        }
    }
});

var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");

btn.onclick = function () {
    event.preventDefault();
    modal.style.display = "block";

}




$('#btn').on('click', function () {
    let number = $('#num').val();
    let title = $('#title').val();
    let editor = $('#editor').val();
    let publisher = $('#year').val();
    let lenght = $('#lenght').val();
    $('#num').append(number);
    $('#one').append(title);
    $('#two').append(editor);
    $('#three').append(publisher);
    $('#four').append(lenght);

});






            











