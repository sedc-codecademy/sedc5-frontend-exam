 
$(() => {

	$("#novel").on('click', () => {
		$("#entryFields").html("")
	 	$("#entryFields").append(`
	 			Title: <input type ="text" id="nTitle"/>
	 			Author: <input type ="text" id="nAuthor"/>
	 			Publisher: <input type ="text" id="nPublisher"/>
	 			Year of publication: <input type ="number" min = "1900" id ="nYear"/>
	 			Pages: <input type ="number" min= "1"  max= "1000" id="nPages"/>
	 			Book series: <input type ="text" id ="series"/>
	 			ISBN: <input type ="text" id="nIsbn"/>
	 			Short review: <input type = "text" id ="nReview"/>
	 			<input type = "submit" value = "Submit" id="submit"/>`);

		let nTitle = $("#nTitle");
		let author = $("#nAuthor");
		let nPublisher = $("#nPublisher");
		let nyear = $("#nYear");
		let nPages = $("#nPages");
		let series = $("#series");
		let nIsbn = $("#nIsbn");
		let nReview = $("#nReview");
		let submit = $("#submit");


		submit.on('click', () => {
			let book = new Novel(nTitle.val(), author.val(), nPublisher.val(),
							 nyear.val(), nPages.val(), series.val(), 
							 nIsbn.val(),nReview.val());
			$("#thead").html("")
			$("#thead").append(`<tr>
								<th>No</th>
								<th>Title</th>
								<th>Author</th>
								<th>Publishing information
								<th>Pages</th>
								<th>Additional information</th>
								<th>ISBN</th>
								<th>Review</th>
								<th>Delete book</th>
								</tr>`)

		});

	});


	$("#anthology").on('click', () => {
		$("#entryFields").html("")
		$("#entryFields").append(`
			Title: <input type ="text" id= "aTitle"/>
	 		Editor: <input type ="text" id="editor"/>
	 		Publisher: <input type ="text" id="aPublisher/>
	 		Year of publication: <input type ="number" min= "1900" id="aYear"/>
	 		Pages: <input type ="number" min="1" max"1000" id="aPages"/>
	 		Stories: <input type ="text" onclick= "Story()" id="story"/>
	 		ISBN: <input type ="text" id="aIsbn"/>
	 		Short review: <input type = "text" id="aReview"/>
	 		<input type = "submit" value = "Submit" id= "submit"/>`);

		let aTitle = $("#aTitle");
		let editor = $("#editor");
		let aPublisher = $("#aPublisher");
		let aYear = $("#aYear");
		let aPages = $("#aPages");
		
		let aIsbn = $("#aIsbn");
		let aReview = $("#aReview");
		let submit = $("#submit");

		let stories = [];
		let storyAdd = $("#storyAdd");

		storyAdd.on('click', () => {

			let title = $("#sTitle");
			let author = $("#sAuthor");
			
			stories.push(new Stories(title, author));
			console.log (stories);
			
		});

		submit.on('click', () => {

			let book2 = new Anthology (aTitle.val(), editor.val(), aPublisher.val(),
							 aYear.val(), aPages.val(), stories,							 
							 aIsbn.val(),aReview.val());


				$("#thead").html("")
				$("#thead").append(`<tr>
									<th><button>No</th>
									<th><button>Title</th>
									<th><button>Author</th>
									<th><button>Publishing information</th>
									<th><button>Pages</th>
									<th><button>Additional information</th>
									<th><button>ISBN</th>
									<th>Review</th>
									<th>Delete book</th>
									</tr>`)
		});

	});


});


function Story (){
	$("#entryFields").append(`<div class="story"> <input type= "text" placeholder = "Author" id ="sAuthor"/>
									<input type = "text" placeholder = "Story title" id = "sTitle"/>
									<label>Story original to anthology</label>
									<select><option value = "yes">Yes</option>
											<option value = "no">No</option></select>
									<input type ="submit" value ="Add story" id="storyAdd"/> </div>`);
};




