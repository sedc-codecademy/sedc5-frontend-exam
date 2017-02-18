// Menu Toggle Script

    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

//function datepicker
 $( function() {
        $( "#datepicker" ).datepicker();
      } );

 //Validation
 jQuery.validator.setDefaults({
  debug: true,
  success: "valid"
});
$( "#novelForm2" ).validate({
  rules: {
    lengthPages: {
      required: true,
      range: [0, 1000]
    }
  }
});

 //new nover 
  var novels = [];
  $('#submitButton2').click(function(e){
  	var title = $("#title").val();
  	if (title == ''){
  		alert(" add a title");
  		return; 
  	}
  	e.preventDefault();
  	var novel = {};

  	$("#novelForm2").find("input").each(function(){
  		console.log(this);
  		// if($(this).val()){
  			novel[this.id] = $(this).val();
  		//}
  	});

  	if(novels.push(novel)){
  		document.getElementById('novelForm2').reset();
    }
    $('#novelBody').empty();
    $(novels).each(function(index,item){

    	var btnRemove = $('<button class="btn btn-danger">Delete</button>');
    	var tr = $('<tr>');
    	var td = $('<td>');
    	var td1 = $('<td>');
    	var td2 = $('<td>');
    	var td3 = $('<td>');
    	var td4 = $('<td>');
    	var td5 = $('<td>');
    	var td6 = $('<td>');
    	var td7 = $('<td>');
    	var td8 = $('<td>');
    	var td9 = $('<td>');
    	var td10 = $('<td>');


    	tr.attr('id', 'name-' + index);
    	td.text(item.title).appendTo(tr);
    	td2.html(item.editor).appendTo(tr);
    	td3.html(item.publisher).appendTo(tr);
    	td4.html(item.datepicker).appendTo(tr);
    	td5.html(item.lengthPages).appendTo(tr);
    	td6.html(item.stories).appendTo(tr);
		  td8.html(item.isbn).appendTo(tr);
	   	td9.html(item.review).appendTo(tr);

    	$("#novelBody").append(tr);
    	btnRemove.appendTo(td10);
    	td10.appendTo(tr);
    	$('#delete').css('display', 'block');
    	// tr.appendTo($('#novelBody'));
    	
    	

    	btnRemove.click(function(){
    		$(tr).remove();
    	});

    	$('#novels').click(function(){

    	});
    });
});