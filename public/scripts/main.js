$("document").ready(function(){

	$("#search").on("click",function(event){
		event.preventDefault();

		var searchQuery = $("#game").val();

		var url = '/search/';
			url += searchQuery;

		$.get(url,function(results){
			//console.log(results);

			document.write(results);
		})

	})





})