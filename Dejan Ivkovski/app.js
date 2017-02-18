$(document).ready(function () {

    class AllBooks {
        constructor(title, author, publisher, year, pages, series, idDigit) {
            this.title = title;
            this.author = author;
            this.publisher = publisher;
            this.year = year;
            this.pages = pages;
            this.series = series;
            this.idDigit = idDigit;
        }
    };


    $("#bkNovel").hide();
    $("#bkAnth").hide();
    $(".addNovelTable").hide();
    $(".addAnthTable").hide();


    $("#addBook").on('click', () => {
        $("#bkNovel").toggle(true);
        $("#bkAnth").toggle(true);
    })


    $("#bkNovel").on('click', () => {
        $(".addNovelTable").toggle('show');
        $("#bkAnth").toggle(false);
        $(".addNovelTable").empty();
        $(".addNovelTable").append(
            `
         <table class="table addedNovel">
         <div>
         <tr>
         <td><h3 style="color: red">Add new novel</h3></td>
          </tr>
         </div>
            <thead>
                <tbody>
             <tr>
                    <td> <label for='title'></label> 
                         <input id='title' type='text' placeholder="Title of the novel" value="" required>                    
                    </td>
                     <td>
	                	<label for='series'></label> 
	                	<input id='series' type='text' placeholder="Series">
                    </td> 
             </tr>
             <tr>
                     <td> <label for='author'></label> 
                          <input id='author' type='text' placeholder="Author of the novel" required>
                       </td>
                     <td>
	                	<label for='year'></label> 
	                	<input id='year' type='number' placeholder="Year of publication" required>
                    </td> 
              </tr>
              <tr>
                    <td> <label for='publisher'></label> 
                         <input id='publisher' type='text' placeholder="Publisher of the novel" required> 
                     </td>
                     <td>
	                	<label for='pages'></label> 
	                	<input id='pages' type='number' placeholder="Length in pages">
                    </td> 
             </tr>
            <tr>
                    <td> <label for='series'></label> 
                         <input id='series' type='number' placeholder="Series Number"> 
                     </td>
                     <td>
	                	<label for='idDigit'></label> 
	                	<input id='idDigit' type='text' placeholder="13-digit ISBN" required>
                    </td> 
             </tr>
            </tbody>
        </table>
            `
        )
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $("#bkAnth").on('click', () => {
        $(".addAnthTable").toggle('show');
        $("#bkNovel").toggle(false);
        $(".addAnthTable").empty();
        $(".addAnthTable").append(
            `
         <table class="table addedAnthology">
         <div>
         <tr>
         <td><h3 style="color: red">Add new Anthology</h3></td>
         <td><button id="saveAnthology" class="btn-primary btn-lg" type="button">Save</button></td>
          </tr>
         </div>   
                <tbody>
             <tr>
                    <td> <label for='title'></label> 
                         <input id='title' type='text' placeholder="Title of the anthology" required>                    
                    </td>
                     <td>
	                	<label for='series'></label> 
	                	<input id='series' type='text' placeholder="Series">
                    </td> 
             </tr>
             <tr>
                     <td> <label for='author'></label> 
                          <input id='author' type='text' placeholder="Editor of the anthology" required>
                       </td>
                     <td>
	                	<label for='publisher'></label> 
	                	<input id='publisher' type='text' placeholder="Publisher of the novel" required>
                    </td> 
              </tr>
              <tr>
                    <td> <label for='year'></label> 
                         <input id='year' type='number' placeholder="Year of publication" required> 
                     </td>
                     <td>
	                	<label for='pages'></label> 
	                	<input id='pages' type='number' placeholder="Length in pages">
                    </td> 
             </tr>
            <tr>
                    <td> <label for='stories'></label> 
                         <input id='stories' type='text' placeholder="Stories included"> 
                     </td>
                     <td>
	                	<label for='idDigit'></label> 
	                	<input id='idDigit' type='text' placeholder="13-digit ISBN" required>
                    </td> 
             </tr>
            </tbody>
        </table>
            `
        )
    });

    let newbookses = () => {
        $("#allBooksTable").append(
            `
        <tbody>
            <tr>
                <td>${arrBooks[arrBooks.length - 1].title}</td>
                <td>${arrBooks[arrBooks.length - 1].author}</td>
                <td>${arrBooks[arrBooks.length - 1].series}</td>
                <td>${arrBooks[arrBooks.length - 1].publisher}</td>
                <td>${arrBooks[arrBooks.length - 1]}.year}</td>
                <td>${arrBooks[arrBooks.length - 1]}.pages}</td>
                <td>${arrBooks[arrBooks.length - 1]}.stories}</td>
                <td>${arrBooks[arrBooks.length - 1]}.idDigit}</td>
            </tr>
        </tbody>
        `
        )
    };

    let arrBooks = [];
    

    $("#saveNovel").on('click', () => {
        arrBooks.push(new AllBooks(
            $("#title").val(),
            $("#author").val(),
            $("#series").val(),
            $("#publisher").val(),
            $("#year").val(),
            $("#pages").val(),
            $("#stories").val(),
            $("#idDigit").val()
        ))
        newbookses();
        console.log(arrBooks);
    });

    $("#saveAnthology").on('click', () => {
        arrBooks.push(new AllBooks(
            $("#title").val(),
            $("#author").val(),
            $("#series").val(),
            $("#publisher").val(),
            $("#year").val(),
            $("#pages").val(),
            $("#stories").val(),
            $("#idDigit").val()
        ))
        newbookses();
    });








});