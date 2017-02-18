let novelPublishers = [
    "B & W Publishing",
    "A. C. McClurg",
    "Arkham House",
    "Atlantic Books",
    "Dobson Books",
    "Godwit Press"
]
var books = [];
let stories = [];
var idCounter = 1;
let pageSize = 10;
let pageNumber = 1;
let pageOffset = 0;
$(document).ready(function (param) { 
/*
    Event handlers
*/
$(".editor").hide(); // hide editors
//some bonus points, autocomplete
$("#novel_publisher").autocomplete({
    source: novelPublishers
})
// SORTINGS   
$("#sort_id").on("click", function (param) { 
    books.sort((a,b) => {
        return a.id - b.id;
    });
    renderLibrary();
 });
$("#sort_title").on("click", function (param) { 
    books.sort((a,b) => {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    });
    renderLibrary();
 });
$("#sort_author").on("click", function (param) { 
    books.sort((a,b) => {
        return a.author.toLowerCase().localeCompare(b.author.toLowerCase());
    });
    renderLibrary();
 });
$("#sort_publisher").on("click", function (param) { 
    books.sort((a,b) => {
        if(a.year - b.year == 0){
            return a.publisher.toLowerCase().localeCompare(b.publisher.toLowerCase());
        } else return a.year - b.year;
    });
    renderLibrary();
 });
$("#sort_aditional").on("click", function (param) { 
    books.sort((a,b) => {
        if(a instanceof Novel){
            if(b instanceof Novel){
                //both novels
                if(a.series != ""){
                    if(b.series != ""){
                        if(a.series === b.series){
                            return a.seriesNumber - b.seriesNumber;
                        } else {
                            return a.series.toLowerCase().localeCompare(b.series.toLowerCase());
                        }
                    } else {
                        return 1;
                    }
                }
            } else {
                //a is Novel b is not
                return -1;            }
        } else if(b instanceof Novel){
            //b is only Novel a is not
            return 1;
        } else {
            //none are Novels
            return a.stories.length - b.stories.length;
        }
    });
    renderLibrary();
 });
$("#sort_isbn").on("click", function (param) { 
    books.sort((a,b) => {
        return Integer.parseInt(a.isbn) - Integer.parseInt(b.isbn);
    });
    renderLibrary();
 });
 

// END SORTINGS

//Input handler
    $("#select_type").on("change",function (param) { 
        $(".editor").hide();
        $("#editor_menu").find("#" + $(this).val() ).show();
        $("#error_message").show();
        $("#library").hide();
     });

//Story adder
    $("#anthologie_stories").on("click",function (param) { 
        $("#story_add").dialog({
            modal: true,
            buttons: {
                "Save story": function() {
                    let title = $("#story_title").val();
                    let author = $("#story_author").val();
                    let original = $("#story_original").is(":checked");
                    let tmpTitle = title.toLowerCase();
                    let saveStory = $.trim(title).length > 1 && $.trim(author).length > 1;
                    let alreadyInserted = function (param) { 
                        return stories.filter((s) => { return s.title.toLowerCase() === tmpTitle}).length > 0;
                     }()
                    if(alreadyInserted){
                        $("#story_message").text("Story already inserted");
                    } else if(saveStory){
                        $("#story_display").append(`<li id="${title}">${title}<button class="delete_button" onclick='removeElement("story_display","${title}");'>Delete</button></li>`);
                        stories.push(new Story(title,author,original));
                        
                        $( this ).dialog( "close" );
                    } else {
                        $("#story_message").text("Title and author are mandatory");
                    }
                },
                Cancel: function() {
                $( this ).dialog( "close" );
                }
            }
        });
    });
    
    
// BUTTONS
//Save handler
    $("#save_book").on("click",function (param) { 
        let editor = $("#select_type").val();
        let book = makeBook(editor);
        if( book != null && book != undefined){
            books.push(book);
            renderLibrary();
            refresh();
            console.log("Added : " + book );
        }
        $("#select_type").val("library");
     });
 });
 //Cancel handler
    $("#cancel").on("click",function (param) { 
        $("#select_type").val("library");
        renderLibrary();
        refresh();
     });
// END BUTTONS
//ID GENERATOR FOR Books
function generateId(){
    return idCounter++ ;
}
//RENDER library
function renderLibrary(){
    for(var i=0; i < books.length; i++){
        var html = `<tr id="${books[i].id}">
            <td>${books[i].id}</td>
            <td>${books[i].title}</td>
            <td>${books[i].author}</td>`;

            if(books[i].year != undefined || books[i].publisher != undefined){
                html += `<td>${books[i].year},(${books[i].publisher})</td>`;
            } else {
                html += `<td></td>`;
            }
            html += `<td>${books[i].length}</td>`;
            if(books[i].series != undefined && books[i].seriesNumber != undefined){
                html += `<td>${books[i].series} + (#${books[i].seriesNumber})</td>`;
            } else if(books[i].stories != undefined){
                if(books[i].stories.length > 1){
                    html += `<td>${books[i].stories.length} stories by ${books[i].stories[0].toString()})</td>`;
                } 
            }else {
                html += `<td></td>`;
            }
            if(books[i].isbn != undefined){
                html += `<td>${books[i].isbn}</td>`;
            } else {
                html += `<td></td>`;
            }
            if(books[i].review != undefined){
                html += `<td>${books[i].review}</td>`;
            } else {
                html += `<td></td>`;
            }
            html += `<td><button class="delete_button" onclick='removeBook("library_display","${books[i].id}");'>Delete</button></td>`;
        html += "</tr>";



        $("#library_display").html($("#library_display").html() + html );
    }
       
   
        
        

}
//REFRESH FORMS
function refresh() { 
    $(".editor").hide();
    $("#novel_title").val("");
    $("#novel_author").val("");
    $("#novel_year").val("");
    $("#novel_length").val("");
    $("#novel_series").val("");
    $("#novel_seriesNumber").val("");
    $("#novel_isbn").val("");
    $("#novel_review").val("");
    $("#anthologie_title").val("");
    $("#anthologie_author").val("");
    $("#anthologie_year").val("");
    $("#anthologie_length").val("");
    $("#anthologie_isbn").val("");
    $("#anthologie_review").val("");
    stories = [];
        $("#library").show();

//Delete book buttons
    $(".delete_entry").on("click",function (param) { 
        let row = $(this).closest("tr");
        // row.hide();
     });

 }

// START OF VALIDATORS
//maker of books returns Book object, calls validators. branching valdation
 function makeBook(editor){
     $("#message").html("");
     if(editor === "novel_editor") {
         return novelValidate();
     } else if(editor === "anthologie_editor") {
         return anthologieValidate();
     }  else {
         return null;
     }
 }

//Novel validator
function novelValidate() { 
    let tittle = $("#novel_title").val();
    let author = $("#novel_author").val();
    let year = $("#novel_year").val();
    let publisher = $("#novel_publisher").val();
    let len = $("#novel_length").val();
    let series = $("#novel_series").val();
    let seriesNumber = $("#novel_seriesNumber").val();
    let isbn = $("#novel_isbn").val();
    let review = $("#novel_review").val();
    let flagVal = true;
    let thisYear = new Date().getFullYear();
    let alreadyInserted = function (param) { 
                        return books.filter((s) => { return s.title.toLowerCase() === tittle.toLowerCase()}).length > 0;
                     }()
        if(!alreadyInserted){
            if(tittle == undefined || tittle == ""){
                $("#message").append("<span>Please enter a title</span><br>");
                flagVal = false;
            }
            if(author == undefined || author == ""){
                $("#message").append("<span>Please enter an author</span><br>");
                flagVal = false;
            }
            if(year != "" && year != undefined){
                if(year < 1900 || year > thisYear){
                    $("#message").append("<span>Please enter a valid year</span><br>");
                    flagVal = false;    
                }
            }
            if(len != "" || undefined){
                if(len < 1 || len > 1001 ){
                    $("#message").append("<span>Please enter a valid page length</span><br>");
                    flagVal = false;            
                }
            }
            if(series == "" || series == undefined){
                if(seriesNumber != "" && seriesNumber != undefined){
                    $("#message").append("<span>Enter a series first</span><br>");
                    flagVal = false;  
                }
            } else if(seriesNumber == "" || seriesNumber == undefined){
                $("#message").append("<span>Please enter a series number</span><br>");
                flagVal = false;  
            }
            if(isbn != "" && isbn != undefined){
                let isnum = /^\d+$/.test(isbn);
                if(!isnum){
                    $("#message").append("<span>Please enter a valid ISBN number</span><br>");
                    flagVal = false;  
                }
            }
        } else {
            $("#message").append("<span>Book already inserted in database</span><br>");
            flagVal = false;
        }
        if(flagVal){
            return new Novel(tittle, author, publisher, year, len, series, seriesNumber, isbn, review, generateId());
        } else {
            return null;
        }
 }
//Anthologie validator
function anthologieValidate() { 
    let tittle = $("#anthologie_title").val();
    let author = $("#anthologie_author").val();
    let publisher = $("#novel_publisher").val();
    let year = $("#anthologie_year").val();
    let len = $("#anthologie_length").val();
    let isbn = $("#anthologie_isbn").val();
    let review = $("#anthologie_review").val();
    let flagVal = true;
    let thisYear = new Date().getFullYear();
    let alreadyInserted = function (param) { 
                        return books.filter((s) => { return s.title.toLowerCase() === tittle.toLowerCase()}).length > 0;
                     }()
        if(!alreadyInserted){
            if(tittle == undefined || tittle == ""){
                $("#message").append("<span>Please enter a title</span><br>");
                flagVal = false;
            }
            if(author == undefined || author == ""){
                $("#message").append("<span>Please enter an author</span><br>");
                flagVal = false;
            }
            if(year != "" && year != undefined){
                if(year < 1900 || year > thisYear){
                    $("#message").append("<span>Please enter a valid year</span><br>");
                    flagVal = false;
                }
            }
            if(len != "" || undefined){
                if(len < 1 || len > 1001 ){
                    $("#message").append("<span>Please enter a valid page length</span><br>");
                    flagVal = false;            
                }
            }
            if(stories.length < 2){
                $("#message").append("<span>Please enter at least two stories</span><br>");
                flagVal = false; 
            }
            if(isbn != "" && isbn != undefined){
                let isnum = /^\d+$/.test(isbn);
                if(!isnum){
                    $("#message").append("<span>Please enter a valid ISBN number</span><br>");
                    flagVal = false;  
                }
            }
        } else {
            $("#message").append("<span>Book already inserted in database</span><br>");
            flagVal = false;
        }
        if(flagVal){
            return new Anthologie(tittle, author, publisher, year, len, stories, isbn, review, generateId());
        } else {
            return null;
        }
 }


// END OF VALIDATORS

//STORIES remover (added remover from stories array)
function removeElement(parentDiv, childDiv){
     if (childDiv == parentDiv) {
          alert("The parent div cannot be removed.");
     }
     else if (document.getElementById(childDiv)) {     
          var child = document.getElementById(childDiv);
          var parent = document.getElementById(parentDiv);
          parent.removeChild(child);
          var result = stories.filter(function( obj  ) {
              return obj.title == childDiv;
          });
          stories.splice(stories.indexOf(result[0]), 1);
     }
     else {
          alert("Child div has already been removed or does not exist.");
          return false;
     }
}
// BOOKS remover
function removeBook(parentDiv, childDiv){
     if (childDiv == parentDiv) {
          alert("The parent div cannot be removed.");
     }
     else if (document.getElementById(childDiv)) {     
          var child = document.getElementById(childDiv);
          var parent = document.getElementById(parentDiv);
          parent.removeChild(child);
          var result = books.filter(function( obj  ) {
              return obj.id == childDiv;
          });
          books.splice(stories.indexOf(result[0]), 1);
          console.log(books);
     }
     else {
          alert("Child div has already been removed or does not exist.");
          return false;
     }
}