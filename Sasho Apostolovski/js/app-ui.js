import Story from "../js/Story.js"
import Novel from "../js/Novel.js"
import Anthology from "../js/Anthology.js"



document.addEventListener('DOMContentLoaded', () => {
    let bookSelect = document.getElementById('selectBookType');
    let novelForm = document.getElementById('novel');
    let anthologyForm = document.getElementById('anthology');
    let library = document.getElementById('library');
    let id = 1;


    // Select book type
    bookSelect.addEventListener('change', () => {
        let value = bookSelect.value;
        if (value == "novel") {
            library.classList.add('hidden');
            anthologyForm.classList.add('hidden');
            novelForm.classList.remove('hidden');
        }
        if (value == "anthology") {
            library.classList.add('hidden');
            novelForm.classList.add('hidden');
            anthologyForm.classList.remove('hidden');
        }
    });

    // Add Novel
    let submitNovelBtn = document.getElementById('submitNovel');
    submitNovelBtn.addEventListener('click', () => {
        event.preventDefault();
        let title = document.getElementById('novelTitle');
        let author = document.getElementById('novelAuthor');
        let publisher = document.getElementById('novelPublisher');
        let year = document.getElementById('novelYear');
        let lengthInPages = document.getElementById('novelLength');
        let series = document.getElementById('novelSeries');
        let seriesNumber = document.getElementById('novelSeriesNumber');
        let isbn = document.getElementById('novelIsbn');
        let review = document.getElementById('novelReview');

        let novelMembers = {
            title: title.value,
            publisher: publisher.value,
            yearOfPublication: year.value,
            lengthInPages: lengthInPages.value,
            isbn: isbn.value,
            review: review.value,
            author: author.value,
            series: series.value,
            seriesNumber: seriesNumber.value
        }
        let novel = new Novel(novelMembers);

        let table = document.getElementById('library-table');
        let tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${id++}</td>
          <td>${novel.title}</td>
          <td>${novel.author || book.editor}</td>
          <td>${novel.yearOfPublication} ${novel.publisher}</td>
          <td>${novel.lengthInPages}</td>
          <td>${novel.series} ${novel.seriesNumber}</td>
          <td>${novel.isbn}</td>
          <td>${novel.review}</td>
          <td><button type="button" id="delBtn" class="btn btn-danger">Delete</button></td>
        `
        table.appendChild(tr);
        document.getElementById('novelForm').reset();

    })

    // Add Anthology
    let submitAnthologyBtn = document.getElementById('submitAnthology');
    submitAnthologyBtn.addEventListener('click', () => {
        event.preventDefault();
        let title = document.getElementById('anthologyTitle');
        let editor = document.getElementById('anthologyEditor');
        let publisher = document.getElementById('anthologyPublisher');
        let year = document.getElementById('anthologyYear');
        let lengthInPages = document.getElementById('anthologyLength');
        let story = document.getElementById('anthologyStory');
        let original = document.getElementById('checkOriginal');
        let isbn = document.getElementById('anthologyIsbn');
        let review = document.getElementById('anthologyReview');

        let novelMembers = {
            title: title.value,
            publisher: publisher.value,
            yearOfPublication: year.value,
            lengthInPages: lengthInPages.value,
            isbn: isbn.value,
            review: review.value,
            editor: editor.value,
            original: original.checked
        }
        let anthology = new Anthology(novelMembers);

        let table = document.getElementById('library-table');
        let tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${id++}</td>
          <td>${anthology.title}</td>
          <td>${anthology.editor}</td>
          <td>${anthology.yearOfPublication} ${anthology.publisher}</td>
          <td>${anthology.lengthInPages}</td>
          <td>${""}<td>
          <td>${anthology.isbn}</td>
          <td>${anthology.review}</td>
          <td><button type="button" id="delBtn" class="btn btn-danger">Delete</button></td>
        `
        table.appendChild(tr);
        document.getElementById('anthologyForm').reset();
    });

    // Library
    let viewLibraryBtn = document.getElementById('viewLibrary');
    viewLibraryBtn.addEventListener('click', function() {
        event.preventDefault();
        novelForm.classList.add('hidden');
        anthologyForm.classList.add('hidden');
        library.classList.remove('hidden');
    })

    library.addEventListener('click', () => {
        event.preventDefault();
        let clickedElement = event.target;
        if (clickedElement.id == "delBtn") {
            event.stopPropagation();
            let tr = clickedElement.parentNode.parentNode;
            tr.parentNode.removeChild(tr);
        }

    })

})
