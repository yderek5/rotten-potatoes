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

$("#register").on("submit", function(event) {
	event.preventDefault();
	var username = $("#username").val().trim();
	var email = $("#email").val().trim();
	var password = $("#password").val();

	$.ajax({
		url: '/api/register',
		type: 'POST',
		data: {
			username: username,
			email: email,
			password: password
		}
	})
});



})