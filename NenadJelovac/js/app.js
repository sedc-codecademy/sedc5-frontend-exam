let pubs = ["Pearson", "ThomsonReuters", "RELX Group", "Wolters Kluwer", "Penguin Random House", "Phoenix Publishing and Media Company", "China South Publishing & Media Group Co., Ltd", "Hachette Livre", "McGraw-Hill Education", "Holtzbrinck", "Grupo Planeta", "Scholastic", "Wiley", "Cengage Learning Holdings II LP", "China Publishing Group Corporation", "Harper Collins", "Houghton Mifflin Harcourt", "De Agostini Editore", "Oxford University Press", "Springer Science and Business Media", "China Education Publishing & Media Holdings Co. Ltd.", "Informa", "Shueisha", "Kodansha Ltd.", "Egmont Group", "Shogakukan", "Bonnier", "Grupo Santillana", "Kadokawa Publishing", "Simon & Schuster", "Woongjin ThinkBig", "Klett", "Groupe Madrigall", "Les Editions Lefebvre-Sarrut", "Messagerie / GeMS", "Media Participations", "Mondadori", "Cambridge University Press", "The Perseus Book Group", "France Loisirs", "Westermann Verlagsgruppe", "Sanoma", "Cornelsen", "Kyowon Co. Ltd.", "La Martinière", "Haufe Gruppe", "WEKA", "RCS Libri", "Gakken Co. Ltd.", "Bungeishunju Ltd.", "OLMA Media Group", "EKSMO", "Groupe Albin Michel", "Saraiva", "Editora FTD", "Abril Educação", "Shinchosha Publishing Co, Ltd."]

let prevBooks = JSON.parse(localStorage.getItem('books'));

let books = localStorage.getItem("books") !== null ? prevBooks : [];

$("tbody > tr > td > a").each((n, m) => {
    pubs.push($(m).text());
})


$(() => {

    let $bookEntryBody = $("#bookEntry");
    let $ddlSelectType = $("#typeOfBook");
    let $btnAddBook = $("<button id='addNewBook'>");
    $btnAddBook.text("Add New Book");

    let $inputBook = $(` 
    <!--Naslov-->
    <label for="title">Book Title</label>
    <input type="text" id="title">
    <br><br>
    <!--Punlisher-->
    <label for="publisher">Publisher</label>
    <select size="5" name="" id="publisher">

    </select>
    <br><br>
    <!--year-->
    <label for="year">Year</label>
    <input type="text" id="year">
    <br><br>
    <!--length-->
    <label for="bookLength">Book Length</label>
    <input type="text" id="bookLength">
    <br><br>
    <!--isbn-->
    <label for="isbn">ISBN</label>
    <input type="text" id="isbn">
    <br><br>
    <!--review-->
    <label for="review">Review</label>
    <textarea rows="4" cols="50" id="review">

    </textarea>`);


    let $inputNovel = $(` 
    <!--avtor-->
    <label for="author">Author</label>
    <input type="text" id="author">
    <br><br>
    <!--series-->
    <label for="series">Series name</label>
    <input type="text" id="series">
    <br><br>
    <!--series-->
    <label for="seriesNumber">Series Number</label>
    <input type="text" id="seriesNumber">`);


    let $inputAnthology = $(`
    <br><br>
    <!--editor-->
    <label for="editor">Editor</label>
    <input type="text" id="editor">
    <br><br>    
    <!--series-->
    <div id="inputSeries">
        <!--avtor na prikazna-->
        <label for="storyAuthor">Author of the story</label>
        <input type="text" id="storyAuthor">
        <br><br>
        <!--ime na prikazna-->
        <label for="storyTitle">Title of the story</label>
        <input type="text" id="storyTitle">
        <br><br>
        <!--dali e original-->
        <label for="isOriginal">Is Original</label>
        <input type="checkbox" id="isOriginal">
        <br><br>
        <button id="addStory">Add story</button>
        <br><br>
        <ul id="existingStories">
        
        </ul>
    </div>`);





    //Event listeners
    $ddlSelectType.on("change", () => {
        let tip = $ddlSelectType.find("option:selected").val();
        if (tip === "novel") {
            renderInputPage($inputNovel);
            addThisStupidEventListener(tip);
        } else {
            renderInputPage($inputAnthology);
            let stories = [];
            $("#addStory").on("click", () => {
                let $storyAuthor = $("#storyAuthor").val();
                let $storyTitle = $("#storyTitle").val();
                let isOriginal = $("#isOriginal").is(':checked') ? true : false;

                $("#existingStories").append(`<li>Author: ${$("#storyAuthor").val()}, Title: ${$("#storyTitle").val()}, ${$("#isOriginal").is(':checked') ? "Original" : "Copy"} </li>`)
                let newStory = new Story($storyTitle, $storyAuthor, isOriginal);
                stories.push(newStory);
            })

            addThisStupidEventListener(tip, stories);
        }
    })




    let renderInputPage = (typeOfTheBookYouneedToEnter) => {
        $bookEntryBody.append($inputBook);

        let $selPublisher = $("#publisher");
        pubs.forEach((p) => {
            $selPublisher.append(`<option value="${p}">${p}</option>`)
        })

        $bookEntryBody.append(typeOfTheBookYouneedToEnter);

        $bookEntryBody.append($btnAddBook);
    }

    let addThisStupidEventListener = (typeOfTheBook, stories) => {
        $("#addNewBook").on("click", () => {
           
            let title = $("#title").val();
            let publisher = $("#publisher option:selected").val();
            let year = $("#year").val();
            let lengthPages = $("#bookLength").val();
            let idIsbn = $("#isbn").val();
            let review = $("#review").val();
            let author = $("#author").val();
            let series = $("#series").val();
            let editor = $("#editor").val();

            let newBook;
            if (typeOfTheBook === "novel") {
                newBook = new Novel(title, publisher, year, lengthPages, idIsbn, review, author, series, seriesNumber);

            } else {
                newBook = new Anthology(title, publisher, year, lengthPages, idIsbn, review, editor, stories);
            }
            books.push(newBook);
            localStorage.setItem("books", JSON.stringify(books));
        })
    }
})