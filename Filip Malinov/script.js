$(document).ready(function(){
    $(".novel").on("click",function(){

        $(".novel-container").show();
        $(".anthology-container").hide();

    });
$(document).ready(function(){
    $(".anthology").on("click",function(){

        $(".anthology-container").show();
        $(".novel-container").hide();

    })
/*$.ajax({
   url:href,
   type:'GET',
   success: function(data) {
       var Novel Title = $('<id>').append(data).find('#Novel Title');
       $('#Novel Title').html( "Novel Title" );
   }
});*/

    })

})
 
