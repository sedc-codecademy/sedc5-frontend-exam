$(function(){

    for(var i = new Date().getFullYear(); i >= 1900; --i) {
        $('#yearNovel').append("<option value='"+ i +"'>"+ i +"</option>");
        $('#yearAnthology').append("<option value='"+ i +"'>"+ i +"</option>");        
    }


    $(".Novel").hide();
    $(".Anthology").hide();
    $("#tableResoultNovel").hide();
    $("#tableResoultAnthology").hide();

    $( "#target" ).click(function() {
       
    });

    $("#novelAdd").click(function(){
        $(".Novel").show();
        $(".Anthology").hide();
        $("#tableResoultNovel").hide();
        $("#tableResoultAnthology").hide();

    });

    $('#anthologyAdd').click(function(){
        $(".Novel").hide();
        $(".Anthology").show();
        $("#tableResoultNovel").hide();
        $("#tableResoultAnthology").hide();

    });

    $('#novelShow').click(function(){
        $(".Novel").hide();
        $(".Anthology").hide();
        $("#tableResoultNovel").show();
        $("#tableResoultAnthology").hide();
    });

    $('#AnthologyShow').click(function(){
        $(".Novel").hide();
        $(".Anthology").hide();
        $("#tableResoultNovel").hide();
        $("#tableResoultAnthology").show();
    });


    $('#novel').click(function(){
        // var pageURL = $(location). attr("href");
        // alert(pageURL);
        let title = $('#titleNumber').val();
        let author = $('#authorNovel').val();
        let publisher = $('#publisherNovel').val();
        let year = $('#yearNovel').val();
        let length = $('#lengthNovel').val();
        let series = $('#seriesNovel').val();
        let seriesNumber = $('#seriesNumberNovel').val();
        let isbn = $('#isbnNovel').val();
        let review = $('#reviewNovel').val();
        
        $('#seriesNumber').val("");
        $('#authorNovel').val("");
        $('#publisherNovel').val("");
        $('#lengthNovel').val("");
        $('#seriesNovel').val("");
        $('#seriesNumberNovel').val("");
        $('#isbnNovel').val("");
        $('#reviewNovel').val("");


        $('#contacts-tableNovel')
        .append('<tr><td> ' + title + '</td><td>'+ author+'</td><td>'+ publisher+'</td><td>'+ year+'</td><td>'+ length+'</td><td>'+ series+'</td><td>'+ seriesNumber+'</td><td>'+ isbn+'</td><td>'+ review+'</td></tr>');

    });

    $('#anthology').click(function(){
        let title = $('#titleAnthology').val();
        let editor = $('#editorAnthology').val();
        let publicher = $('#publicherNovel').val();
        let year = $('#yearAnthology').val();
        let length1 = $('#lengthNovel').val();
        let stories1 = $('#storiesNovel').val;
        let isbn1 = $('#isbnNovel').val();
        let review1 = $('#reviewNovel').val();
        
        $('#titleAnthology').val("");
        $('#editorAnthology').val("");
        $('#publicherNovel').val("");
        $('#lengthNovel').val("");
        $('#storiesNovel').val("");
        $('#isbnNovel').val("");
        $('#reviewNovel').val("");


        $('#contacts-tableAnthology')
        .append('<tr><td> ' + title + '</td><td>'+ editor +'</td><td>'+ publicher +'</td><td>'+ year +'</td><td>'+ length1 +'</td><td>'+ stories1 +'</td><td>'+ isbn1 +'</td><td>'+ review1 +'</td></tr>');

    });
 


})