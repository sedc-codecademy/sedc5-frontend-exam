$(document).ready(function () {
    $("#formNovel, #anthologyForm").hide()

    // var radioValue = $("input[name='b    ooks']:checked").val();

    $("input[name='books']").on("click", function () {

        var checked = $(this).val();
        if (checked == "anthology") {
            $("#anthologyForm").show();
            $("#formNovel").hide();
        }
        else {
            $("#anthologyForm").hide();
            $("#formNovel").show();
        }
    })
    // console.log(radioValue)
    // if (radioValue == "Novel") {
    //     $("#anthologyForm").hide();
    //     $("#formNovel").show();
    // }
    // else if (radioValue == "Anthology") {
    //     $("#formNovel").hide();
    //     $("#anthologyForm").show()
    // }

    $("#addNovel").click(function () {
        var novelTitle = $("#title").val();
        var novelAuthor = $("#author").val();
        var novelPublishing = $("#publisher").val();
        var novelLength = $("#length").val();
        var novelAdditionalInfo = $("#year").val();
        var novelISBN = $("#isbn").val();
        var novelReview = $("#review").val();


        if (novelAuthor == '' || novelTitle == '') {
            alert("Title and Author are mandatory")
        }
        else {
            $("#table").append("<tr><td>" + novelTitle + "</td>" +
                "<td>" + novelAuthor + "</td>" +
                "<td>" + novelPublishing + "</td>" +
                "<td>" + novelLength + "</td>" +
                "<td>" + novelAdditionalInfo + "</td>" +
                "<td>" + novelISBN + "</td>" +
                "<td>" + novelReview + "</td></tr>"

            )


        }
    });

    $("#addAnthology").click(function () {
        var anthologyTitle = $("#titleAnthology").val();
        var anthologyAuthor = $("#editorAnthology").val();
        var stories = $("#stories").val();
        var storiesArr = stories.split(',');
        var authPublishing = $("#publisherAnthology").val();
        var authLength = $("#lengthAnthology").val();
        var authAdditionalInfo = $("#yearAnthology").val();
        var authISBN = $("#isbnAnthology").val();
        var authReview = $("#reviewAnthology").val();

        if (anthologyAuthor == '' || anthologyTitle == '') {
            alert("Title and Author are mandatory")
        }
        else if (storiesArr.length < 3) {
            alert("You have to have more than 3 stories")
        }
        else {
            $("#table").append("<tr><td>" + anthologyTitle + "</td>" +
                "<td>" + anthologyAuthor + "</td>" +
                "<td>" + stories+ "</td>" +
                "<td>" + authPublishing + "</td>" +
                "<td>" + authLength + "</td>" +
                "<td>" + authAdditionalInfo + "</td>" +
                "<td>" + authISBN + "</td></tr>"+
                "<td>" + novelReview + "</td></tr>"
                )


        }
    })

      


});
