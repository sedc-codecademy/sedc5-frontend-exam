let $bookChoice = $('#bookTypeChoice');
let novels = [];
let stories = [];
let books = [];
let tableOrder = 0;

(() => {
    let start = 1900;
    let end = new Date().getFullYear();
    let options = "";
    for (let year = start; year <= end; year++) {
        options += "<option>" + year + "</option>";
    }
    document.getElementById("novelYear").innerHTML = options;
    document.getElementById("anthYear").innerHTML = options;
})();

let fixReviewText = () => {
    let displayText = '';
    let reviewText = books[books.length - 1].review;
    if (reviewText.length > 50) {
        for (let i = 0; i < 50; i++) {
            displayText += reviewText[i];
        }
        for (let i = displayText.length - 1; i >= 0; i--) {
            if (displayText[i] === " ") {
                displayText = displayText.slice(0, i);
                return displayText + "...";
            }
        }
    } else
        return reviewText;
};

class Novel {
    constructor(title, author, publisher, year, pageLength, series, seriesNumber, isbn, review) {
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.year = year;
        this.pageLength = pageLength;
        this.series = series;
        this.seriesNumber = seriesNumber;
        this.isbn = isbn;
        this.review = review;
    }
}
class Anthology {
    constructor(title, editor, publisher, year, pageLength, stories, isbn, review) {
        this.title = title;
        this.editor = editor;
        this.publisher = publisher;
        this.year = year;
        this.pageLength = pageLength;
        this.stories = stories;
        this.isbn = isbn;
        this.review = review;
    }
}
class Story {
    constructor(title, author, original) {
        this.title = title;
        this.author = author;
        this.original = original;
    }
}
let newNovel = () => {
    tableOrder++;
    $('#listOfBooks').append(`
		<tr>
            <th scope="row">${tableOrder}</th>
            <td>${books[books.length - 1].title}</td>
            <td>${books[books.length - 1].author}</td>
            <td>${books[books.length - 1].publisher}</td>
            <td>${books[books.length - 1].year}</td>
            <td>${books[books.length - 1].pageLength}</td>
            <td>${books[books.length - 1].series} (#${books[books.length - 1].seriesNumber})</td>
            <td></td>
            <td>${books[books.length - 1].isbn}</td>
            <td>${fixReviewText()}</td>
        </tr>
	`);
};
let storiesOutput = () => {
        if (stories.length > 1) {
        	let k = 0;
        	let oneAuthor = false;
        	for (var i = 0; i < stories.length; i++) {
        		if (stories[0].author !== stories[i].author)
        			break;
        		else if (i === stories.length - 1)
        			oneAuthor = true;
        	}
            if (oneAuthor) {
                return `${stories.length} stories by ${stories[0].author}`;
            } else
                return `${stories.length} stories by multiple authors`;
        } else
            return `${stories.length} stories by ${stories[0].author}`;

};
        let newAnthology = () => {
            tableOrder++;
            $('#listOfBooks').append(`
		<tr>
            <th scope="row">${tableOrder}</th>
            <td>${books[books.length - 1].title}</td>
            <td>${books[books.length - 1].editor}</td>
            <td>${books[books.length - 1].publisher}</td>
            <td>${books[books.length - 1].year}</td>
            <td>${books[books.length - 1].pageLength}</td>
            <td></td>
            <td>${storiesOutput()}</td>
            <td>${books[books.length - 1].isbn}</td>
            <td>${fixReviewText()}</td>
        </tr>
	`);
        };


        $(() => {
            $bookChoice.change(() => {
                $('#novelEntry, #anthologyEntry').toggle('.hidden');
            });
            $('#newBook').on('click', () => {
                $('#entryContainer').removeClass('hidden');
                $('#listContainer').addClass('hidden');
            });
            $('#list').on('click', () => {
                $('#entryContainer').addClass('hidden');
                $('#listContainer').removeClass('hidden');
            });
            $('#saveNovel').on('click', () => {
                books.push(new Novel($('#novelTitle').val(),
                    $('#novelAuthor').val(), $('#novelPublisher').val(),
                    $('#novelYear option:selected').val(),
                    $('#novelPageLength').val(), $('#novelSeries').val(),
                    $('#seriesNumber').val(), $('#novelISBN').val(),
                    $('#novelReview').val()));
                newNovel();
                console.log(books);
            });
            $('#saveAnthology').on('click', () => {
                books.push(new Anthology($('#anthTitle').val(),
                    $('#anthEditor').val(), $('#anthPublisher').val(),
                    $('#anthYear option:selected').val(),
                    $('#anthPageLength').val(), stories,
                    $('#anthISBN').val(), $('#anthReview').val()));

                newAnthology();
                stories = [];
                console.log(books);
            });
            $('#newStory').on('click', () => {
                $('#anthologyEntry tr').eq(5).after(`
			<tr>
                <td><label for='storyTitle'>Story Title: </label></td>
            	<td><input type='text' id='storyTitle'</td>
            </tr>
            <tr>
            	<td><label for='storyAuthor'>Story author: </label></td>
            	<td><input type='text' id='storyAuthor'</td>
            </tr>
            <tr>
            	<td>Has this story been published before? </td>
            	<td>
            		<input type='radio' name='original' value='true'>yes
            		<input type='radio' name='original' value='false'>no
            		<button id='saveStory'>Save story</button>
            	</td>
            </tr>
    	`);
            });
            $('#anthologyEntry').on('click', '#saveStory', () => {
                stories.push(new Story($('#storyTitle').val(),
                    $('#storyAuthor').val(), $("input[name='original']:checked").val()));
                $('#storySection').prepend(`
    		${stories[stories.length - 1].title}<br>			
    	`);
                $('#anthologyEntry tr').eq(6).hide();
                $('#anthologyEntry tr').eq(7).hide();
                $('#anthologyEntry tr').eq(8).hide();
                console.log(stories);
            });
        });
