function Novel(id, title, author, publisher, year, length, series, seriesNumber, isbn, review) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.year = year;
    this.length = length;
    this.series = series;
    this.seriesNumber = seriesNumber;
    this.isbn = isbn;
    this.review = review;
}

function Anthology(id, title, editor, publisher, year, length, stories, isbn, review) {
    this.id = id;
    this.title = title;
    this.editor = editor;
    this.publisher = publisher;
    this.year = year;
    this.length = length;
    this.stories =
        this.isbn = isbn;
    this.review = review;
}

function Story(title, author, original) {
    this.title = title;
    this.author = author;
    this.original = original;
}

$(() => {
    let showLibrary = $("#showLibrary");
    let library = $("#library");
    let table = $("#table");
    let choice = $("#choice");
    let novelsForm = $("#novelsForm");
    let anthologyForm = $("#anthologyForm");
    let storiesContainer = $("#storiesContainer");
    let hiddenAnthology = false;
    let hiddenNovels = false;

    let novels = [];
    let anthologies = [];
    let stories = [];
    let id = 0;

    removeRows(table);

    showLibrary.on("click", function () {
        library.toggle();
        choice.toggle();
    });

    $("#typeOfBook").on("change", function () {
        if ($("#typeOfBook option:selected").text() == "Novel") {
            novelsForm.toggle();
            anthologyForm.toggle(hiddenAnthology);
            hiddenAnthology = true;
        } else if ($("#typeOfBook option:selected").text() == "Anthology") {
            anthologyForm.toggle();
            novelsForm.toggle(hiddenNovels);
            hiddenNovels = true;
        }
    });

    //--------------------------------- Novels -----------------------------------------

    $("#addNovel").on("click", function (e) {
        e.preventDefault();
        library.show();
        novelsForm.hide();
        anthologyForm.hide();
        choice.toggle();

        id++;
        let title = $("#novelTitle").val();
        let author = $("#novelAuthor").val();
        let publisher = $("#novelPublisher").val();
        let year = $("#novelYear").val();
        let length = $("#novelLength").val();
        let series = $("#novelSeries").val();
        let seriesNumber = $("#novelNumber").val();
        let isbn = $("#novelISBN").val();
        let review = $("#novelReview").val();
        let valid = /\s/.test(review[47]);

        if (valid) {
            review = `${review.slice(0, 47)} ...`
        } else {
            for (let i = 47; i < review.length; i++) {
                let valid = /\s/.test(review[i]);
                if(valid) {
                    review = `${review.slice(0, i)} ...` 
                }
            }
        }  

        let newNovel = new Novel(id, title, author, publisher, year, length, series, seriesNumber, isbn, review);
        novels.push(newNovel);
        novels.forEach(m => addNovels(m, table));
    });

    

    let addNovels = function (a, container) {
        container.append(`<tr>
            <td>${a.id}</td>
            <td>${a.title}</td>
            <td>${a.author}</td>
            <td>${a.year} (${a.publisher})</td>
            <td>${a.length}</td>
            <td>${a.length}</td>
            <td>${a.isbn}</td>
            <td>${a.review}</td>
            <td>
                <button type="button" class="btn btn-danger" id="deleteNovel">Delete</button>
            </td>            
        </tr>`)
    }

    // ----------------------------- Stories ----------------------------------------

    $("#addStories").on("click", function (e) {
        e.preventDefault();
        removeRows(storiesContainer);
        let storyTitle = $("#storyTitle").val();
        let storyAuthor = $("#storyAuthor").val();
        let checked = $("input[name=stories]:checked", "#radioButtons").val();
        let newStory = new Story(storyTitle, storyAuthor, checked);
        stories.push(newStory);
        stories.forEach(m => addStories(m, storiesContainer));
    });

    let addStories = function (a, container) {
        container.append(`<ul>
            <li>${a.title}, ${a.author}, ${a.original}</li>      
        </ul>`)
    }

    // ------------------------------- Anthology --------------------------------------
    $("#addAnthology").on("click", function (e) {
        e.preventDefault();
        library.show();
        novelsForm.hide();
        anthologyForm.hide();
        choice.toggle();

        id++;
        let title = $("#anthologyTitle").val();
        let editor = $("#anthologyEditor").val();
        let publisher = $("#anthologyPublisher").val();
        let year = $("#anthologyYear").val();
        let length = $("#anthologyLength").val();
        let isbn = $("#anthologyISBN").val();
        let anthologyReview = $("#anthologyReview").val();

        let newAnthology = new Anthology(id, title, editor, publisher, year, length, "", isbn, anthologyReview);
        anthologies.push(newAnthology);
        anthologies.forEach(m => addAnthology(m, table));
    });


    let addAnthology = function (a, container) {
        container.append(`<tr>
            <td>${a.id}</td>
            <td>${a.title}</td>
            <td>${a.editor}</td>
            <td>${a.year} (${a.editor})</td>
            <td>${a.length}</td>
            <td></td>
            <td>${a.isbn}</td>
            <td>${a.review}</td>
            <td>
                <button type="button" class="btn btn-danger" id="deleteAnthology">Delete</button>
            </td>            
        </tr>`)
    }

    function removeRows(container) {
        container.html("");
    }

    $(document).on("click", "#deleteAnthology", function () {
        $("#deleteAnthology").closest("tr").hide();
    })

    $(document).on("click", "#deleteNovel", function () {
        $("#deleteNovel").closest("tr").hide();
    })

})