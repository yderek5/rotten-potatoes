$("document").ready(function () {

	$("#search").on("click", function (event) {
		event.preventDefault();

		var searchQuery = $("#game").val();

		var url = '/search/';
		url += searchQuery;

		$.get(url, function (results) {
			//console.log(results);

			document.write(results);
		});

	});
	
	// ALL OF THIS BELOW IS FOR THE REVIEW SUBMIT FORM
// =========================================================================
	var gameplay;
	var replayability;
	var graphics;
	var soundtrack;
	var description;

	$("input:radio").on("click", function () {
		//console.log(this);
		if (this.id == 'game1' || this.id == 'game2' || this.id == 'game3' ||
			this.id == 'game4' || this.id == 'game5' || this.id == 'game6' ||
			this.id == 'game7' || this.id == 'game8' || this.id == 'game9' || this.id == 'game10') {
			gameplay = this.value;
			console.log('gameplay score is ' + gameplay);
		} else
		if (this.id == 'replay1' || this.id == 'replay2' || this.id == 'replay3' ||
			this.id == 'replay4' || this.id == 'replay5' || this.id == 'replay6' ||
			this.id == 'replay7' || this.id == 'replay8' || this.id == 'replay9' || this.id == 'replay10') {
			replayability = this.value;
			console.log('replay score is ' + replayability);
		} else
		if (this.id == 'graphics1' || this.id == 'graphics2' || this.id == 'graphics3' ||
			this.id == 'graphics4' || this.id == 'graphics5' || this.id == 'graphics6' ||
			this.id == 'graphics7' || this.id == 'graphics8' || this.id == 'graphics9' || this.id == 'graphics10') {
			graphics = this.value;
			console.log('graphics score is ' + graphics);
		} else
		if (this.id == 'sound1' || this.id == 'sound2' || this.id == 'sound3' ||
			this.id == 'sound4' || this.id == 'sound5' || this.id == 'sound6' ||
			this.id == 'sound7' || this.id == 'sound8' || this.id == 'sound9' || this.id == 'sound10') {
			soundtrack = this.value;
			console.log('soundtrack score is ' + soundtrack);
		}; 

		
	});


		$("#review-form").on("submit", function (event) {
			event.preventDefault();
			var url = location.href;
			var average = 0;
			var gameId = url.substring(url.lastIndexOf('/') + 1);

			average = (parseInt(gameplay) + parseInt(replayability) + parseInt(graphics) + parseInt(soundtrack))/4;
			console.log(average);
			description = $("#description").val();

			$.ajax({
				url: '/reviews/api',
				method: 'POST',
				data: {
					gameId: gameId,
					gameplay: gameplay,
					replayability: replayability,
					graphics: graphics,
					soundtrack: soundtrack,
					description: description,
					average: average
				},
				success: location.href = '/reviews' + '/' + gameId
			}).then(function() {
				setTimeout(location.reload(), 3000);
			});

		});


	// $(function(){	
		$("#searchBox").autocomplete({
			source: function(request,response){
				$.ajax({
					url: '/search/auto',
					data:{
						term:request.term
					},
					success: function(data){
						response (data);
					}
				});

			},
			minLength: 2
		});
	// })



// ===========================================================================
}); // end of document ready no code below here