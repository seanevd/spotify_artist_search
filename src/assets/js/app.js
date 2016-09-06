$(function() {

	// Handlebars helpers
	Handlebars.registerHelper("lastUrl", function(array) {
		if (array.length !== 0) {
			return array[array.length-2].url;
		}
	});


	// Modal
	function openModal(info) {
		var template = $('#modal-template').html();
		var templateScript = Handlebars.compile(template);
		var html = templateScript(info);
		$('#artist-modal').html(html);

		// Close modal
		$('.close').click(function(){
			$('#artist-modal').removeClass('open').html();
		});
	}

	function callArtist(data) {
		$.ajax({
	        url: "https://api.spotify.com/v1/artists/"+ data
	    })
	    .done(function(data) {
			openModal(data);
	    });
	}


	// Popular artists
	function listPopArtists(info) {
		var template = $('#pop-artists-template').html();
		var templateScript = Handlebars.compile(template);
		var html = templateScript(info);
		$('#pop-artists').removeClass('visible');
		setTimeout(function() {
			$('#pop-artists').html(html).addClass('visible');
			// Listen for click to open modal
			$('.modal-trigger').click(function() {
				callArtist($(this).attr('artistData'));
				$('#artist-modal').addClass('open');
			});
		}, 300);
	}

	function failAlert() {
		$('#pop-artists').html('<h3>Something went wrong, please check again soon.</h3>');
	}

    // find popular artists
	function popArtists () {
		var randLet = _.sample(['a', 'b', 'c', 'd', 'e', 'f', 'j', 'l', 'n', 'p', 'r', 's', 't', 'v']);
	    $.ajax({
	        url: "https://api.spotify.com/v1/search?q="+randLet+"*&type=artist&limit=8"
	    })
	    .done(function(data) {
			listPopArtists(data.artists);
	    })
		.fail(function() {
			failAlert();
		});
	}
	setInterval(popArtists, 9000);
	popArtists();



	// search results
	function listSearchResults(info) {
		var template = $('#search-results-template').html();
		var templateScript = Handlebars.compile(template);
		var html = templateScript(info);
		$('#search-results').html(html);
		// Listen for click to open modal
		$('.modal-trigger').click(function() {
			callArtist($(this).attr('artistData'));
			$('#artist-modal').addClass('open');
		});
	}


	// Listeners
	// Input label
	$('#artist-search').blur(function() {
		if ($(this).val().length) {
			$(this).addClass('open');
		}
		else {
			$(this).removeClass('open');
			$('#search-results').removeClass('open');
		}
		$('#pop-artists').removeClass('dim');
	});

	// Dim popular artists
	$('#artist-search').focus(function() {
		$('#pop-artists').addClass('dim');
	});

	// Search
	$('#artist-search').keyup(function(e) {
		var key = e.which || e.keyCode;
		if ($(this).val().length) {
			$('#search-results').addClass('open');
			$.ajax({
		        url: "https://api.spotify.com/v1/search?q="+$(this).val()+"*&type=artist&limit=8"
		    })
		    .done(function(data) {
				listSearchResults(data.artists);
		    });
		}
		else $('#search-results').removeClass('open');
		if (key === 13) {
			$('.search-artists li').first().find('a').trigger("click");
		}
	});

	// Remove search results on closing search
	$('input[type=search]').on('search', function () {
		if (this.value === "") {
			$('#search-results').removeClass('open');
		}
	});

});
