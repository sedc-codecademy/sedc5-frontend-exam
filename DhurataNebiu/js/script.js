
	// menu-toogle
	$("#menu-toggle").click(function(e) {
    	e.preventDefault();
    $("#wrapper").toggleClass("toggled");
	});



	// new book novel
	var novels = [];
  $('#submitButton').click(function(e){
  	var title = $("#title").val();
  	if (title == ''){
  		alert(" Put the title of book");
  		return; 
  	}
  	e.preventDefault();
  	var novel = {};

  	$("#novelForm").find("input").each(function(){
  		console.log(this);
  		// if($(this).val()){
  			novel[this.id] = $(this).val();
  		//}
  	});

  	if(novels.push(novel)){
  		document.getElementById('novelForm').reset();
    }
    $('#novelBody').empty();
    $(novels).each(function(index,item){
    	var year = '';
    	var length ='';
    	if (item.year){

    	}
    	if (item.length){
    		
    	}

    	var btnRemove = $('<button class="btn btn-danger>Delete</button>');
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
    	td2.html(item.author).appendTo(tr);
    	td3.html(item.publisher).appendTo(tr);
    	td4.html(item.datepicker).appendTo(tr);
    	td5.html(item.length).appendTo(tr);
    	td6.html(item.series).appendTo(tr);
    	td7.html(item.seriesNumber).appendTo(tr);
  		td8.html(item.isbn).appendTo(tr);
  		td9.html(item.review).appendTo(tr);
      	
      
      var td = $("<td>");
      td.html("<button class='btn btn-warning'>Edit</button> | <button class='btn btn-danger'>Delete</button>");
      tr.append(td);

        $("#novelBody").on("click", ".btn btn-danger", function(e){

          //to stay in same page not go anywhere
          e.preventDefault();
        
          $(this).parents("tr").remove();
        });
           
         

    	// $("#novelBody").append(tr);
    	tr.appendTo($('#novelBody'));
    	btnRemove.appendTo(td10);
    	

    	btnRemove.click(function(){
    		$(tr).remove();
    	});

    	$('#novels').click(function(){

    	});
    });
});


	$('#books').click(function() {
		$('.one').show();
		$('.two').hide();
	});
	$('#newBook').click(function() {
		$('.one').hide();
		$('.two').show();
	});
