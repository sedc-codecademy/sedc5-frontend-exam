 
$(() => {

	$("#novel").on('click', () => {
		$("#entryFields").html("")
		$("#entryFields").append(`
			<div class="input-group form-group">
                <span class="input-group-addon">Title*</span>
                <input type="text" required class="form-control" id="nTitle">
            </div>

            <div class="input-group form-group">
                <span class="input-group-addon">Author*</span>
                <input type="text" class="form-control" id="nAuthor">
            </div>

            <div class="input-group form-group">
                <span class="input-group-addon">Publisher</span>
                <input type="text" class="form-control" id="nPublisher">
            </div>

            <div class="input-group form-group">
                <span class="input-group-addon">Year of publication</span>
                <input type="number" class="form-control" min="1900" max="2017" id ="nYear">
            </div>

            <div class="input-group form-group">
                <span class="input-group-addon">Pages</span>
                <input type="number" class="form-control" min="1" max="1000" id="nPages">
            </div>

            <div class="input-group form-group">
            	<span class="input-group-addon">Book Series</span>
                <input type="text" class="form-control" id ="series">
            </div>

            <div class="input-group form-group">
                <span class="input-group-addon">ISBN</span>
                <input type="text" class="form-control" id="nIsbn">
            </div>

            <div class="input-group form-group">
                <span class="input-group-addon">Short review</span>
                <input type="text" class="form-control" id ="nReview">
            </div>
            <div class="offset-sm-10">
                <button type="button" class="btn btn-secondary" id="submit">Submit</button>
              </div>`);

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
			$("#tHead").html("")
			$("#tHead").append(`<tr>
				<th><button>No</th>
				<th><button>Title</th>
				<th><button>Author/Editor</th>
				<th><button>Publishing information</th>
				<th><button>Pages</th>
				<th><button>Additional information</th>
				<th><button>ISBN</th>
				<th>Review</th>
				<th>Delete book</th>
				</tr>`)


			$("#booksContainer").append (`<tr>
				<th>No</th>
				<th>${book.title}</th>
				<th>${book.author}</th>
				<th>${book.year}(${book.publisher})</th>
				<th>${book.pages}</th>
				<th></th>
				<th>${book.ISBN}</th>
				<th>${book.review}</th>
				<th><button>Delete</button></th>
				</tr>`)
			

			Alert();
			YearValidation (book.year);
		
			
		});

	});


	$("#anthology").on('click', () => {
		$("#entryFields").html("")
		$("#entryFields").append(`
			<div class="input-group form-group">
                <span class="input-group-addon">Title*</span>
                <input type="text" class="form-control" id="aTitle">
            </div>

            <div class="input-group form-group">
                <span class="input-group-addon">Editor*</span>
                <input type="text" class="form-control" id="editor">
            </div>

            <div class="input-group form-group">
                <span class="input-group-addon">Publisher</span>
                <input type="text" class="form-control" id="aPublisher">
            </div>

            <div class="input-group form-group">
                <span class="input-group-addon">Year of publication</span>
                <input type="number" class="form-control" min="1900" max="2017" id ="aYear">
            </div>

            <div class="input-group form-group">
                <span class="input-group-addon">Pages</span>
                <input type="number" class="form-control" min="1" max="1000" id="aPages">
            </div>

            <div class="input-group form-group">
            	<span class="input-group-addon">Stories*</span>
                <input type="text" class="form-control" onclick = NewStory(); id ="story">
            </div>

            <div class="input-group form-group">
                <span class="input-group-addon">ISBN</span>
                <input type="text" class="form-control" id="aIsbn">
            </div>

            <div class="input-group form-group">
                <span class="input-group-addon">Short review</span>
                <input type="text" class="form-control" id ="aReview">
            </div>
            <div class="offset-sm-10">
                <button type="button" class="btn btn-secondary" id="submit">Submit</button>
              </div>`);

		let aTitle = $("#aTitle");
		let editor = $("#editor");
		let aPublisher = $("#aPublisher");
		let aYear = $("#aYear");
		let aPages = $("#aPages");
		
		let aIsbn = $("#aIsbn");
		let aReview = $("#aReview");
		let submit = $("#submit");

		
		let storyAdd = $("#storyAdd");
		let sTitle = $("#sTitle");
		let sAuthor = $("#sAuthor");


		submit.on('click', () => {

			let book2 = new Anthology (aTitle.val(), editor.val(), aPublisher.val(),
				aYear.val(), aPages.val(), nStory.val(),							 
				aIsbn.val(),aReview.val());


			$("#tHead").html("")
			$("#tHead").append(`<tr>
				<th><button>No</th>
				<th><button>Title</th>
				<th><button>Author/Editor</th>
				<th><button>Publishing information</th>
				<th><button>Pages</th>
				<th><button>Additional information</th>
				<th><button>ISBN</th>
				<th>Review</th>
				<th>Delete book</th>
				</tr>`)

			$("#booksContainer").append (`<tr>
				<th>${book2.author}</th>
				<th>${book2.title}</th>
								`)
		});

	});


});


function NewStory (){
	$("#container").append(`<div class= "offset-sm-2 col-sm-4"><div class="input-group form-group">
			                 <span class="input-group-addon">Author</span>
			                 <input type="text" class="form-control" id="sAuthor"></div>
			                 <div class="input-group form-group">
			                 <span class="input-group-addon">Title</span>
			                 <input type="text" class="form-control" id="sTitle"></div>
			                 <label>Story original to anthology</label>
							 <select><option value = "yes">Yes</option>
								<option value = "no">No</option></select>
							<div class="offset-sm-10">
			                	<button type="button" class="btn btn-secondary" 
			                	id="storyAdd" onclick = addStory();>Submit</button>
			              	</div>`);
};

let addStory = function (){
	let nStory = [];
	nStory.push (new Stories ($(sTitle).val(), $(sAuthor).val()));
	
	console.log(nStory);
};


function Alert(nTitle, author){
	if (!nTitle && !author){
		alert("Please fill in the required fields!");
		return false;
	} else {
		return true;
	}
};

function YearValidation (year){
	let today = new Date();
	let currentYear = today.getFullYear();

	if ((year< 1900)||(year > currentYear)){
		alert("Please enter a year between 1900 and current year!");
	}
};

