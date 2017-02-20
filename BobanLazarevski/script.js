let createBook = $("#createBook");
let save = $("#saveBook");
let library = $("#library");
let resultTable = $(".result_table");
let novelsTable = $(".novels_table");
let anthologyTable = $(".anthology_table");
let body = $("body");
let i = 0;
let pageNumber = 1;
let pageSize = 10;
let arrayOfBooks = [];
let sliceArray = [];
let filterArray = [];
let tbodyResult = $(".result_tbody");
let searchButton = $("#SearchButton");
let searchField = $("#searchField").val();
let clearSearch = $("#ClearSearch");
let searchArray = [];
let showSearchField = $("#buttonShowSearhElements");
let closeSearchField = $("#buttonCloseSearchElements");
let searchInput = $("#searchField");
searchArray = arrayOfBooks;

$("#predefinedPublishersNovel").on("change",()=>{
		let predefinedPublishersNovel = $("#predefinedPublishersNovel option:selected").val();
		$("#publisherOfNovel_Id").val(predefinedPublishersNovel);
})
$("#predefinedPublishersAnthologies").on("change",()=>{
		let predefinedPublishersAnthologies = $("#predefinedPublishersAnthologies option:selected").val();
		$("#publisherOfAnthologi_Id").val(predefinedPublishersAnthologies);
})

$("#series_Id").on("keyup",()=>{
	if($("#series_Id").val() != ""){
	$("#thSeriesNumberHidden").show();
	$("#tdSeriesNumberHidden").show();
	}
	else 
	{
	$("#thSeriesNumberHidden").hide();
	$("#tdSeriesNumberHidden").hide();
	}
})

$(".selected").on("change",()=>{
	let selected = $(".selected").val();

	if(selected == "Novels"){
		novelsTable.toggle();
		anthologyTable.hide();
		save.show();
	}
	else if(selected == "Anthologies"){
		anthologyTable.toggle();
		novelsTable.hide();
		save.show();
	}
})

function NovelBook(title,author,editor,publisher,yearOfPublication,lengthInPages,
	series,seriesNumber,isbn,review,arrayOfReview){

	this.title = title;
	this.author = author;
	this.editor = editor;
	this.publisher = publisher;
	this.yearOfPublication = yearOfPublication;
	this.lengthInPages = lengthInPages;
	this.series = series;
	this.seriesNumber = seriesNumber;
	this.isbn = isbn;
	this.review = review;
	this.arrayOfReview = arrayOfReview;

}

function AnthologyBook(title,author,editor,publisher,yearOfPublication,
	lengthInPages,series,seriesNumber,storiesIncluded,isbn,review,arrayOfReview){

	this.title = title;
	this.author = author;
	this.editor = editor;
	this.publisher = publisher;
	this.yearOfPublication = yearOfPublication;
	this.lengthInPages = lengthInPages;
	this.series = series;
	this.seriesNumber = seriesNumber;
	this.storiesIncluded = storiesIncluded;
	this.isbn = isbn;
	this.review = review;
	this.arrayOfReview = arrayOfReview;
}

let displayPage = (pageNumber,pageSize,arrayOfBooks)=>{
		$(".result_tbody").html("");
        let startIndex = (pageNumber-1) * pageSize;
      	let endIndex = pageNumber * pageSize;
      	sliceArray = arrayOfBooks.slice(startIndex,endIndex);
      	let lastOne = arrayOfBooks[arrayOfBooks.length -1];
        sliceArray.filter((lastOne)=>{appendBooks(pageNumber,pageSize,lastOne)});
   }

  searchButton.on("click", ()=>{
			
	search = $("#searchField").val().toLowerCase();
	if(!search)
		return 
	filterArray = searchArray.filter((b) => {
            if(b.title.toLowerCase().indexOf(search) !== -1)
                return true;
            else if(b.author.toLowerCase().indexOf(search) !== -1)
            	return true;
            else if(b.editor.toLowerCase().indexOf(search) !== -1)
            	return true;
            else if(b.yearOfPublication.indexOf(search) !== -1)
            	return true;
	})
	displayPage(pageNumber,pageSize,filterArray);
	clearSearch.show();
})
  clearSearch.on("click",()=>{
  	$("#searchField").val("");
  	displayPage(pageNumber,pageSize,arrayOfBooks);
  	clearSearch.hide();
  })

   $("#previous").on("click",()=>{
   	  pageNumber > 1 ? pageNumber-- : -1
   	  displayPage(pageNumber,pageSize,arrayOfBooks);
   })

   $("#next").on("click",()=>{
   	  let maxPageNumber = (arrayOfBooks.length / pageSize);
   	  pageNumber < maxPageNumber ? pageNumber++ : 1
   	  displayPage(pageNumber,pageSize,arrayOfBooks);
   })
 

   let appendBooks = (pageNumber,pageSize,a)=>{
   		for(var j = 0 ; j < arrayOfBooks.length; j++){}
   		// if(arrayOfBooks[arrayOfBooks.length -1].constructor === AnthologyBook){
			$(".result_tbody").append(`
				<tr>
					<td>${j}</td>
					<td>${a.title}</td>
					<td>${a.author}</td>
					<td>${a.editor}</td>
					<td>${a.publisher} ${a.yearOfPublication}</td>
					<td>${a.lengthInPages}</td>
					<td><i>${a.series}  ${a.seriesNumber}</i></td>
					<td></td>
					<td>${a.isbn}</td>
					<td>${a.arrayOfReview}</td>
					<td id="fullReview" class="hide">${a.review}</td>
					<td><button id="delete">Delete</button></td>
				</tr>
				`);
		// } 	
		// if(arrayOfBooks[arrayOfBooks.length -1].constructor === NovelBook){
		// 	$(".result_tbody").append(`
		// 		<tr>
		// 			<td>${j}</td>
		// 			<td>${a.title}</td>
		// 			<td>${a.author}</td>
		// 			<td></td>
		// 			<td>${a.publisher} ${a.yearOfPublication}</td>
		// 			<td>${a.lengthInPages}</td>
		// 			<td><i>${a.series}  ${a.seriesNumber}</i></td>
		// 			<td></td>
		// 			<td>${a.isbnNovel}</td>
		// 			<td>${a.arrayOfReview}</td>
		// 			<td id="fullReview" class="hide">${a.reviewNovel}</td>
		// 			<td><button id="delete">Delete</button></td>
		// 		</tr>
		// 		`);
		// }
   }
  
let addNovelBooks = ()=>{
	let title = $("#titleOfNovel_Id").val();
	let author = $("#authorOfNovel_Id").val();
	let editor = "";
	let publisher = $("#publisherOfNovel_Id").val();
	let yearOfPublication = $("#yearOfPublication_Novel_Id").val();
	let lengthInPages = $("#lengthInPages_Novel_Id").val();
	let series = $("#series_Id").val();
	let seriesNumber = $("#seriesNumber_Novel_Id").val();
	let isbn = $("#isbn_Novel_Id").val();
	let review = $("#review_Novel_Id").val();
	let arrayOfReview;
	let array = [];
	let date = new Date();
	let currentYear = date.getFullYear();

	if(!seriesNumber){}
	else{seriesNumber = "(#" + seriesNumber + ")";}

	if(review.length>50){
		let halfReviewNovel = review.slice(0,47,review.length);
		arrayOfReview = halfReviewNovel + `<button id="showFull">(...)</button>`;
	}
	else{arrayOfReview = review;}


	if(!title)
		return alert("Enter title");
	if(!author)
		return alert("Enter author");

	if(!yearOfPublication){ }
	else if(!publisher){return alert("First enter publisher");}

	else if(!(yearOfPublication > 1900 && yearOfPublication <= currentYear))
		return alert("Year is not valid");
	
	if(!yearOfPublication){ }
	else{yearOfPublication = "in " + yearOfPublication};

	if(!publisher){}
	else if(publisher.length > 30){alert("Long Publisher");}

	if(!publisher){}
	else{publisher = "Published by " + publisher;}

	if(!lengthInPages){}
	else if(!(lengthInPages > 1 && lengthInPages <= 1000))
		return alert("Length of pages is not valid");

	if(!isbn){}
	else if(isbn.length != 13)
		return alert("Not valid ISBN");

	
	document.addEventListener('click',function(e){
		if(e.target && e.target.id == "showFull"){
		$(this).find('button:focus').parent().parent().find("#fullReview").show();
		$(this).find('button:focus').parent().hide();
	}
})
	// let isbnString = "" + isbn;
	let book = new NovelBook(title,author,editor,publisher,yearOfPublication,lengthInPages,
		series,seriesNumber,isbn,review,arrayOfReview);
	arrayOfBooks.push(book);

	displayPage(pageNumber,pageSize,arrayOfBooks);
}


let addAnthologyBooks = ()=>{
	let title = $("#titleOfAnthology_Id").val();
	let editor = $("#editorOfAnthology_Id").val();
	let author = "";
	let publisher = $("#publisherOfAnthologi_Id").val();
	let yearOfPublication = $("#yearOfPublication_Anthology_Id").val();
	let lengthInPages = $("#lengthInPages_Anthology_Id").val();
	let series = "";
	let seriesNumber = "";
	let storiesIncluded = $("#storiesIncluded_Id").val();
	let isbn = $("#isbn_Anthology_Id").val();
	let review = $("#review_Anthology_Id").val();
	let arrayOfReview;
	let date = new Date();
	let currentYear = date.getFullYear();

	
	if(!review){}
	else if(review.length>50){
		let halfReviewAnthology = review.slice(0,47,review.length);
		arrayOfReview = halfReviewAnthology + `<button id="showFull">(...)</button>`;
	}
	else{arrayOfReview = review;}

	if(!title)
		return alert("Enter title");
	if(!editor)
		return alert("Enter editor");

	if(!yearOfPublication){ }
	else if(!publisher){return alert("First enter publisher");}

	else if(!(yearOfPublication > 1900 && yearOfPublication <= currentYear))
		return alert("Year is not valid");
	
	if(!yearOfPublication){ }
	else{yearOfPublication = "in " + yearOfPublication};

	if(!publisher){}
	else if(publisher.length > 30){alert("Long Publisher");}

	if(!publisher){}
	else{publisher = "Published by " + publisher;}
		
	if(!lengthInPages){}
	else if(!(lengthInPages > 1 && lengthInPages <= 1000))
		return alert("Length of pages is not valid");

	if(!isbn){}
	else if(isbn.length != 13)
		return alert("Not valid ISBN");

	document.addEventListener('click',function(e){
		if(e.target && e.target.id == "showFull"){
			$(this).find('button:focus').parent().parent().find("#fullReview").show();
			$(this).find('button:focus').parent().hide();
	}

})
	// var isbnString = "" + isbn;
	let book = new AnthologyBook(title,author,editor,publisher,yearOfPublication,
		lengthInPages,series,seriesNumber,storiesIncluded,isbn,review,arrayOfReview);

	arrayOfBooks.push(book);

	displayPage(pageNumber,pageSize,arrayOfBooks);
}

save.on("click",()=>{
	let selected = $(".selected").val();
	if(selected == "Novels")return addNovelBooks();
	else if(selected == "Anthologies")return addAnthologyBooks();
})

library.on("click",()=>{
	novelsTable.hide();
	anthologyTable.hide();
	save.hide();	
	resultTable.toggle();
	$(".selected").val($("#default").val());
})

document.addEventListener("click",function(e){
	if(e.target && e.target.id == "delete"){
	  $("#deleteConfirm").show();
	  let a = $(this).find('button:focus').parent().parent();
	  $("#confirmDelete").on("click",()=>{a.remove(); $("#deleteConfirm").hide();})
	  $("#declineDelete").on("click",()=>{$("#deleteConfirm").hide();})
	}
})
showSearchField.on("click",()=>{
	searchInput.show();
	searchButton.show();
	closeSearchField.show();
	showSearchField.hide();
})
closeSearchField.on("click",()=>{
	searchInput.hide();
	searchButton.hide();
	closeSearchField.hide();
	showSearchField.show();
})