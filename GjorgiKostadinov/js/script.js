//buttons
$( document ).ready(function() {
    console.log( "ready!" );

	let btn1 = $("#btn1");
	let btn2 = $("#btn2");
	
	// document.getElementsByClassName('quickaddForm')[0];

	//Form fields


	

	//Adressbook display

	// let table = $("#table");
	// $("#btn").on('click',showBooks);

	//Create storage array

	let books1 = [];
	let books2 = [];

    btn1.on('click',function(){
    	addBook();
    	showBooks();
    });

	function BookStructure(title,author,publisher,year,pages,series,seriesnumber,isbn,review){
		this.title = title;
		this.author = author;
		this.publisher = publisher;
		this.year = year;
		this.pages = pages;
		this.series = series;
		this.seriesnumber = seriesnumber;
		this.isbh = isbn;
		this.review = review;
	};

	function addBook(){
			let title = $("#booktitle").val();
			let author = $("#author").val();
			let publisher = $("#publisher").val();
			let year = $("#year").val();
			let pages = $("#pages").val();
			let series = $("#series").val();
			let seriesnumber = $("#seriesnumber").val();
			let isbn = $("#isbn").val();
			let review = $("#review").val();
		// let isNull = title != '' && author != '' && publisher != '' && year != '' && pages != '' && series != '' && seriesnumber != '' && isbn != '';
			if(true) {
				let obj = new BookStructure(title,author,publisher,year,pages,series,seriesnumber,isbn,review);
				books1.push(obj);
				console.log(books1);
		}
	}

	function showBooks(){
		let table = $("#table1");
		let length = books1.length;
		for(let i = 0; i < length; i++){
			table.append('<tr><td>' + books1[i].title + '</td>' + '<td>' + books1[i].author + '</td>' + '<td>' + books1[i].publisher + '</td>' + '<td>' + books1[i].year + '</td>' + '<td>' + books1[i].pages + '</td>' + '<td>' + books1[i].series + '</td>' + '<td>' + books1[i].seriesnumber + '</td>' + '<td>' + books1[i].isbn + '</td>' + '<td>' + books1[i].review + '</td></tr>')
		}
	}


	
});
	


