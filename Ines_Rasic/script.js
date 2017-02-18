// toggle, hide
$(document).ready(function(){

$("#novelID").hide();
$("#anthologyID").hide();
$("#resultTable").hide();


$("#add").on('click', function () {
        $("#novelID").toggle();
        $("#anthologyID").hide();
        $("#resultTable").hide();
        
    });

    $("#anthologyButton").on('click', function () {
        $("#anthologyID").toggle();
        $("#novelID").hide();
        $("#resultTable").hide();
        
    });

    $("#addedBooks").on('click', function () {
        $("#resultTable").toggle();
        $("#anthologyID").hide();
        $("#novelID").hide();
        
    });

 



// class Book {
//     constructor(properties) {
//         this.title = properties.title;
//         this.publisher = properties.publisher;
//         this.publicationYear = properties.publicationYear;
//         this.pagesLength = properties.pagesLength;
//         this.isbn = properties.isbn;
//         this.review = properties.review;

//     }

// }

// class Novel extends Book {
//     constructor(properties){
//         this.author = properties.author;
//         this.series = properties.series;
//         this.seriesNumber = properties.seriesNumber;

//     }
// }

// class Antology extends Book {
//     constructor(properties){
//         super(properties)
//             this.editor = properties.editor;
//             this.stories = properties.stories;

//     }

// }


	let Id = 0;
	$('#submit').click(function(){
		Id++;
		let titleNovel = $('#example-text-input').val();
		let authorNovel = $('#example-author-input').val();
		let publisherNovel = $('#example-publisher-input').val();
		let publicationYearNovel = $('#example-num-input').val();
		let lengthNovel = $('#example-length-input').val();
		let seriesNovel = $('#example-series-input').val();
		let seriesNumberNovel = $('#example-sernum-input').val();
		let isbnNovel = $('#example-isbn-input').val();
		let reviewNovel = $('#review').val();
		let bookContainer = $("#bookContainer");

		bookContainer.append(`<tr class='book'>
				<td>${Id}</td>
				<td>${titleNovel}</td>
				<td>${authorNovel}</td>
				<td>${publisherNovel}${publicationYearNovel}</td>
				<td>${lengthNovel}</td>
				<td>${seriesNovel}${seriesNumberNovel}</td>
				<td>${isbnNovel}</td>
				<td>${reviewNovel}</td>
				<td><button class='delete'>Delete</button></td>
		</tr>`);

        alert('Success! Your entry is saved');

        
	});

	$(document).on("click", ".delete", function(){
		$(this).parent().parent().remove();
        Id = 0;
	});


    
	$('#reset').click(function(){
		Id++;
		let titleNovel = $('#example-text-input').val("");
		let authorNovel = $('#example-author-input').val("");
		let publisherNovel = $('#example-publisher-input').val("");
		let publicationYearNovel = $('#example-num-input').val("");
		let lengthNovel = $('#example-length-input').val("");
		let seriesNovel = $('#example-series-input').val("");
		let seriesNumberNovel = $('#example-sernum-input').val("");
		let isbnNovel = $('#example-isbn-input').val("");
		let reviewNovel = $('#review').val("");


        
	});


	$('#submitA').click(function(){
		Id++;
		let titleAnthology = $('#titleAnthology').val();
		let Editor = $('#Editor').val();
		let publisherAnthology = $('#publisherAnthology').val();
		let yearAnthology = $('#yearAnthology').val();
		let lengthAnthology = $('#lengthAnthology').val();
		let Additional = $('#inlineFormInput').val();
		let Additioal2 = $('#inlineFormInputA').val();
		let isbnAnthology = $('#example-isbn-inputA').val();
		let reviewA = $('#reviewA').val();
		let bookContainer = $("#bookContainer");

		bookContainer.append(`<tr class='book'>
				<td>${Id}</td>
				<td>${titleAnthology}</td>
				<td>${Editor}</td>
				<td>${publisherAnthology}${yearAnthology}</td>
				<td>${lengthAnthology}</td>
				<td>${Additional}${Additioal2}</td>
				<td>${isbnAnthology}</td>
				<td>${reviewA}</td>
				<td><button class='delete'>Delete</button></td>
		</tr>`);

        alert('Success! Your entry is saved');
        
        
	});

	$(document).on("click", ".delete", function(){
		$(this).parent().parent().remove();
        Id = 0;
	});


    
	$('#resetB').click(function(){
		Id++;
		let titleAnthology = $('#titleAnthology').val();
		let Editor = $('#Editor').val();
		let publisherAnthology = $('#publisherAnthology').val();
		let yearAnthology = $('#yearAnthology').val();
		let lengthAnthology = $('#lengthAnthology').val();
		let Additional = $('#inlineFormInput').val();
		let Additioal2 = $('#inlineFormInputA').val();
		let isbnAnthology = $('#example-isbn-inputA').val();
		let reviewA = $('#reviewA').val();

        
	});



});