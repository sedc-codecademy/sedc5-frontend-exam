$(document).ready(function(){
    $("#showNovel").on("click",function(){

        $(".novel-container").show();
         $(".anthology-containter").hide();

    })

    $("#showAntology").on("click",function(){

        $(".anthology-containter").show();
        $(".novel-container").hide();
    })

});