let books = [];
let stories = [];

(function(){
    getJson().then(
    function(value){
        let obj = JSON.parse(value);
        for(let i = 0; i< obj.length; i++){
        books.push(new Novel(obj[i].author, obj[i].seriesNumber, obj[i].title, obj[i].publisher, obj[i].year, obj[i].length, obj[i].ISBN, obj[i].review))
        }
        setLibrary(books);
        showBooks();

    $("#previous").on( "click", function() {
        bookLibrary.previousPage();
        showBooks();
    });

    $("#next").on( "click", function() {
        bookLibrary.nextPage();
        showBooks();
    });

    $(".ascending").on( "click", function() {
    let parentAttr = $( this ).parent().parent().parent().attr('id');

        if(parentAttr === "titles" || parentAttr === "publishers")
        bookLibrary.sortTitle(function(a, b){
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        })
        showBooks();
        if(parentAttr === "years")
        bookLibrary.sortYear(function(a, b){
            return a - b;
        })
        showBooks();

    });

    $(".descending").on( "click", function() {
     let parentAttr = $( this ).parent().parent().parent().attr('id');
     console.log(parentAttr)

        if(parentAttr === "titles" || parentAttr === "publisher")
        bookLibrary.sortTitle(function(a, b){
            if (a > b) {
                return -1;
            }
            if (a < b) {
                return 1;
            }
            return 0;
        })
        showBooks();
        if(parentAttr === "years" || parentAttr === "ids")
        bookLibrary.sortYear(function(a, b){
            return b - a;
        })
        showBooks();

    });
    paginationIndexing();

    })
    .catch(
        function(reason){
            console.log(reason);
    });
})();

$('#selectType').on('click', function(){
    let bookType = document.getElementById('type').value;
    formBuilder(bookType); 
});

let story = () => {
    stories = [];

    $('#newStory').on('click', function(){
        let storyForm = getFormData("formstory");
        stories.push(new Story(storyForm.storyTitle, storyForm.authorStory, $('#original').is(':checked')));
        $("#storyContainer").html('');
        storyContainerBuilder();
    });
}

let submit = (input) => {
    $("#submit").on('click', function(){
    let formValues = getFormData("formin");
    
    if(input === "Novel"){
        books.push(new Novel(formValues.author, formValues.seriesNumber, formValues.title, formValues.publisher, formValues.year, formValues.length, formValues.ISBN, formValues.review))
    }
    
    if(input === "Anthology"){
        let storyForm = getFormData("formstory");
        stories.push(new Story(storyForm.storyTitle, storyForm.authorStory, $('#original').is(':checked')));
        books.push(new Anthology(stories, formValues.editor, formValues.title, formValues.publisher, formValues.year, formValues.length, formValues.ISBN, formValues.review))
    }
    stories = [];
    $('#formbuilder').html("")
    showBooks();
})
}


let getFormData = function(formName){
    let form = document.getElementsByClassName(formName);

    let formValues = {};

    for(let i = 0; i < form.length; i++){
        formValues[form[i].getAttribute('id')] = form[i].value;
    }

    return formValues
}


class Book {
    constructor(title, publisher, year, length, ISBN, review){
        this.title = title;
        this.publisher = publisher;
        this.year = year;
        this.length = length;
        this.ISBN = ISBN;
        this.review = review;
    }
}

class Story {
    constructor(storyTitle, authorStory, original) {
        this.storyTitle = storyTitle;
        this.authorStory = authorStory;
        this.original = original;
    }
}

class Anthology extends Book {
    constructor(stories, editor, title, publisher, year, length, ISBN, review){
        super(title, publisher, year, length, ISBN, review);
        this.editor = editor;
        this.stories = stories;
    }

}

class Novel extends Book {
    constructor(author, seriesNumber, title, publisher, year, length, ISBN, review) {
        super(title, publisher, year, length, ISBN, review);
        this.author = author;
        this.seriesNumber = seriesNumber;
    }
}

let bookLibrary = {};
let setLibrary = function(books) {

    bookLibrary = {
        books: books,
        shownBooks: books,
        pageIndex: 0,
        pageSize: 10,
        nextPage: function(){
            if(this.pageIndex < (Math.floor(this.shownBooks.length/this.pageSize)))
            this.pageIndex++;
            console.log(this.pageIndex)
        },
        previousPage: function(){
            if(this.pageIndex > 0)
            this.pageIndex--;
            console.log(this.pageIndex)
        },
        sortTitle: function(callback){
            this.shownBooks = this.books.sort(function(a, b) {
                let nameA = a.title.toUpperCase();
                let nameB = b.title.toUpperCase();
                return callback(nameA, nameB);
            })
        },
        sortYear: function(callback){
            this.shownBooks = this.books.sort(function (a, b) {
                return callback(a.year, b.year);
            });
        }
    }
}

let formBuilder = function(input) {
    if(input === "Novel"){
    $('#formbuilder').html(` <div class="form-group">
                            <input type="text" class="form-control formin" id="title" placeholder="Title of the novel...">
                            <input type="text" class="form-control formin" id="author" placeholder="Author of the novel...">
                            <input type="text" class="form-control formin" id="publisher" placeholder="Publisher of the novel...">
                            <input type="number" class="form-control formin" id="year" placeholder="Year of publication...">
                            <input type="number" class="form-control formin" id="length" placeholder="Length in pages...">
                            <input type="text" class="form-control formin" id="series" placeholder="Series...">
                            <input type="number" class="form-control formin" id="seriesNumber" placeholder="Series Number...">
                            <input type="number" class="form-control formin" id="ISBN" placeholder="13-digit ISBN...">
                            <textarea class="form-control formin" id="review" rows="3">Review</textarea>
                            </div>
                            <button type="button" class="btn btn-primary btn-lg btn-block" id="submit">Submit</button>
                           `);
    }
    if(input === "Anthology"){
        $('#formbuilder').html(` <div class="form-group">
                            <input type="text" class="form-control formin" id="title" placeholder="Title of the anthology...">
                            <input type="text" class="form-control formin" id="editor" placeholder="Editor of the anthology...">
                            <input type="text" class="form-control formin" id="publisher" placeholder="Publisher of the anthology...">
                            <input type="number" class="form-control formin" id="year" placeholder="Year of publication...">
                            <input type="number" class="form-control formin" id="length" placeholder="Length in pages...">
                            </div>
                            <div class="form-group">
                            <div id="storyContainer"> 
                            </div>
                            <button type="button" class="btn btn-secondary btn-sm btn-block" id="newStory">New Story</button>
                            </div>
                            <div class="form-group">
                            <input type="number" class="form-control formin" id="ISBN" placeholder="13-digit ISBN...">
                            <textarea class="form-control formin" id="review" rows="3">Review</textarea>
                            </div>
                            
                            <button type="button" class="btn btn-primary btn-lg btn-block" id="submit">Submit</button>
                           `);
        storyContainerBuilder();
        story();
    }
    submit(input)
}

let storyContainerBuilder = function() {
    $("#storyContainer").html(`<input type="text" class="form-control formstory" id="storyTitle" placeholder="Storie Title...">
                            <input type="text" class="form-control formstory" id="authorStory" placeholder="Author...">
                            <span>Plese select if the story is original
                            <input type="checkbox" checked="checked" id="original">
                            </span>
                            `)
}

let showBooks = function() {

    let books = bookLibrary.shownBooks;
    let start = bookLibrary.pageIndex * bookLibrary.pageSize;
    let end = (bookLibrary.pageIndex + 1) * bookLibrary.pageSize;
    books = books.slice(start, end);

    $("tbody").html("");
    for(let i = 0; i < books.length; i++){

        $("tbody").append(`<tr>
                        <td class="id" >${i}</td>
                        <td class="title" >${books[i].title}</td>
                        <td class="title" >${books[i].publisher}</td>
                        <td class="year" >${books[i].year}</td>
                        <td class="review" >${books[i].review}</td>
                        <td class="review" >${books[i].length}</td>
                        <td class="ISBN" >${books[i].ISBN}</td>
                    </tr>
                    `);
    }

    $(".numbering").html("")
    pagination();

}

function getJson () {

    return new Promise(function(resolve, reject) {

        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'data.json', true);
        xhr.send(null);

        xhr.onload = function() {
            resolve(this.responseText);
        };

        xhr.onerror = reject;

    });
}


let pagination = function(){
    let start = bookLibrary.pageIndex;
    let end = bookLibrary.pageIndex + 2;
    for(let i = start; i <= end; i++){
        let pag = i;
        if(pag < bookLibrary.shownBooks.length/bookLibrary.pageSize + 1 && pag > 0){
            if(pag === bookLibrary.pageIndex + 1){
            $(".numbering").append(`
                <li class="page-item active"><a class="page-link" href="javascript:void(0)">${pag}</a></li>
            `);
            } else {
                $(".numbering").append(`
                <li class="page-item"><a class="page-link" href="javascript:void(0)">${pag}</a></li>
                `);
            }
        }
    }

    paginationIndexing();
}

let paginationIndexing = function(){

    $(".numbering .page-link").on('click', function(){
        let index = Number($(this).text());
        bookLibrary.pageIndex = index - 1;
        showBooks();
    });

}