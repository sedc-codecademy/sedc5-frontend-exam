$(document).ready(function(){
	let rowNumber = 0;


	$('#button').click(function(){
		
		let title = $('input[name=bookTitle]').val();
		let author = $('input[name=bookAuthor]').val();
		let publisher = $('input[name=bookPublisher]').val();
		let publicationYear = $('input[name=bookYearPubl]').val();
		let length = $('input[name=bookLength]').val();
		let series = $('input[name=bookSeries]').val();
		let seriesNumber = $('input[name=bookSerNumber]').val();
		let isbn = $('input[name=bookIsbn]').val();
		let review = $('textarea[name=bookReview]').val();
		let bookContainer = $("#bookContainer");

		if (title == '') {
			alert('The novel must have a title');
			return;
		}

		if (author == '') {
			alert('The novel must have an author');
			return;
		}

		if (review.length > 50) {
			review = review.slice(0, 47) + "...";
		} else {
			review = review;
		}

		rowNumber++;

		bookContainer.append(`<tr class='book'>
				<td>${rowNumber}</td>
				<td>${title}</td>
				<td>${author}</td>
				<td>${publisher}${publicationYear}</td>
				<td>${length}</td>
				<td>${series}${seriesNumber}</td>
				<td>${isbn}</td>
				<td>${review}</td>
				<td><button class='delete'>Delete</button></td>
		</tr>`);
		
		$("input[name^='book'").val('');
		$('textarea[name=bookReview]').val('');

		$('#booksTable').DataTable();
		
	});

	$('#booksTable').DataTable();

	/*
    $('#booksTable').pagination({
        //items: 100,
        itemsOnPage: 10,
        cssStyle: 'light-theme'
    });
    */

	$(document).on("click", ".delete", function(){
		$(this).parent().parent().remove();
	});



});