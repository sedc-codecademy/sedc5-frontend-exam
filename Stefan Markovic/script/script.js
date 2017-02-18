$(() => {
    let novelTitle = $('#novelTitle');
    let novelAuthor = $('#novelAuthor');
    let novelPublisher = $('#novelPublisher');
    let novelYear = $('#novelYear');
    let novelLength = $('#novelLength');
    let novelSeries = $('#novelSeries');
    let novelNumber = $('#novelNumber');
    let novelReview = $('#novelReview');
    let novelSubmit = $('#novelSubmit');
    let novelISBN = $('#novelIsbn');

    let anthologyTitle = $('#anthologyTitle');
    let anthologyEditor = $('#anthologyEditor');
    let anthologyPublisher = $('#anthologyPublisher');
    let anthologyYear = $('#anthologyYear');
    let anthologyLength = $('#anthologyLength');
    let anthologyStories = $('#anthologyStories');
    let anthologyStoriesTitle = $('#anthologyStoriesTitle');
    let anthologyStoriesAuthor = $('#anthologyStoriesAuthor');
    let dropDown = $('#dropDown');
    let addStories = $('#addStories');
    let anthologyNumber = $('#anthologyNumber');
    let anthologyIsbn = $('#anthologyIsbn');
    let anthologyReview = $('#anthologyReview');
    let anthologySubmit = $('#anthologySubmit');

    let mainBody = $('#mainBody');
    let btnBlock = $('.btn-block');

    let stories = [];
    let bookArr = [];

    let count = 0;


    // HERE WE CHECK HOW MANY NOVELS WE HAVE
    let checkIfSeries = function () {
        if (novelSeries.val() != '') {
            return `${novelSeries.val() + " " + "#" + convertToRoman(novelNumber.val())}`;
        } else {
            return `${'n/a'}`;
        }
    };


    // HERE WE CHECK HOW MANY STORIES WE HAVE
    let checkStories = function () {
        if (stories.length <= 1) {
            return `${anthologyStories.val()}`;
        } else {
            return `${stories.length} stories by ${stories[0].author} and others`
        }
    }



    // HIDE SHOW WHOLE WEB PAGE
    novelSubmit.on('click', (() => {
        mainBody.hide();
    }))

    anthologySubmit.on('click', (() => {
        mainBody.hide();
    }))

    btnBlock.on('click', (() => {
        mainBody.show();
    }))



    // EVENT LISTENER FOR SUBMIT NOVEL BUTTON
    novelSubmit.on('click', (() => {
        count++;
        let nTtile = novelTitle.val();
        let nAuthor = novelAuthor.val();
        let nPublisher = novelPublisher.val();
        let nLength = novelLength.val();
        let nSeries = novelSeries.val();
        let nNumber = novelNumber.val();
        let nISBN = novelISBN.val();
        let nReview = novelReview.val();
        let result = `<tr>
            <td>${count}</td>
            <td>${nTtile}</td>
            <td>${nAuthor}</td>
            <td>${nPublisher}</td>
            <td>${nLength}</td>
            <td>${checkIfSeries()}</td>
            <td>${nISBN}</td>
            <td>${nReview.substring(0, 50)}</td>
            <td>
                <button type="button" class="btn btn-danger">Delete</button>
            </td>
  
        </tr>`;
        $('table tbody').append(result);
        bookArr.push(novelTitle.val());
        novelTitle.val('');
        novelAuthor.val('');
        novelPublisher.val('');
        novelLength.val('');
        novelSeries.val('');
        novelNumber.val('');
        novelReview.val('');
        novelISBN.val('');
        novelYear.val('');
    }));

    // EVENT LISTENER ON ADD STORIES BUTTON
    addStories.on('click', (() => {
        let story = anthologyStoriesTitle.val();
        let sAuthor = anthologyStoriesAuthor.val();
        let drop = $("#dropDown option:selected").text();
        let items = {};
        items.story = story;
        items.author = sAuthor;
        items.drop = drop;
        stories.push(items);
        anthologyStoriesTitle.val('');
        anthologyStoriesAuthor.val('');
        alert(`You have enetered ${story}`);
    }))


    // EVENT LISTNERE FOR THE SUBMIT ANTHOLOGY BUTTON
    anthologySubmit.on('click', (() => {
        count++;
        let aTtile = anthologyTitle.val();
        let aEditor = anthologyEditor.val();
        let aPublisher = anthologyPublisher.val();
        let aLength = anthologyLength.val();
        let aStories = anthologyStories.val();
        let aNumber = anthologyNumber.val();
        let aReview = anthologyReview.val();


        let result = `<tr>
            <td>${count}</td>
            <td>${aTtile}</td>
            <td>${aEditor}</td>
            <td>${aPublisher}</td>
            <td>${aLength}</td>
            <td>${checkStories()}</td>
            <td>${aNumber}</td>
            <td>${aReview.substring(0, 50)}</td>
            <td>
                <button type="button" class="btn btn-danger">Delete</button>
            </td>
  
        </tr>`;
        $('table tbody').append(result);
        stories = [];
        anthologyTitle.val('');
        anthologyEditor.val('');
        anthologyPublisher.val('');
        anthologyLength.val('');
        anthologyStories.val('');
        anthologyNumber.val('');
        anthologyReview.val('');
        anthologyYear.val('');

    }));


    // SEARCH BOOKS
    $(document).ready(function () {
        let $rows = $('#myTable tr');
        $('#search').keyup(function () {
            let val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
            $rows.show().filter(function () {
                let text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
                return !~text.indexOf(val);
            }).hide();
        });
    });



    // CONVERT NUMBERS TO ROMAN NUMERALS
    let convertToRoman = function (num) {
        let decimalValue = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        let romanNumeral = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
        let romanized = '';
        for (let index = 0; index < decimalValue.length; index++) {
            while (decimalValue[index] <= num) {
                romanized += romanNumeral[index];
                num -= decimalValue[index];
            }
        }
        return romanized;
    }


});

// DELETE ROW FROM TABLE
$(document).on('click', '.btn-danger', function () {
    let items = $(this).closest('tr');
    let choice = confirm('Do you really wanna delete this one?');
    if (choice === true) {
        return items.hide();
    }
    return false;
});



