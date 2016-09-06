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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbigpIHtcblxuXHQvLyBIYW5kbGViYXJzIGhlbHBlcnNcblx0SGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcihcImxhc3RVcmxcIiwgZnVuY3Rpb24oYXJyYXkpIHtcblx0XHRpZiAoYXJyYXkubGVuZ3RoICE9PSAwKSB7XG5cdFx0XHRyZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoLTJdLnVybDtcblx0XHR9XG5cdH0pO1xuXG5cblx0Ly8gTW9kYWxcblx0ZnVuY3Rpb24gb3Blbk1vZGFsKGluZm8pIHtcblx0XHR2YXIgdGVtcGxhdGUgPSAkKCcjbW9kYWwtdGVtcGxhdGUnKS5odG1sKCk7XG5cdFx0dmFyIHRlbXBsYXRlU2NyaXB0ID0gSGFuZGxlYmFycy5jb21waWxlKHRlbXBsYXRlKTtcblx0XHR2YXIgaHRtbCA9IHRlbXBsYXRlU2NyaXB0KGluZm8pO1xuXHRcdCQoJyNhcnRpc3QtbW9kYWwnKS5odG1sKGh0bWwpO1xuXG5cdFx0Ly8gQ2xvc2UgbW9kYWxcblx0XHQkKCcuY2xvc2UnKS5jbGljayhmdW5jdGlvbigpe1xuXHRcdFx0JCgnI2FydGlzdC1tb2RhbCcpLnJlbW92ZUNsYXNzKCdvcGVuJykuaHRtbCgpO1xuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2FsbEFydGlzdChkYXRhKSB7XG5cdFx0JC5hamF4KHtcblx0ICAgICAgICB1cmw6IFwiaHR0cHM6Ly9hcGkuc3BvdGlmeS5jb20vdjEvYXJ0aXN0cy9cIisgZGF0YVxuXHQgICAgfSlcblx0ICAgIC5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdG9wZW5Nb2RhbChkYXRhKTtcblx0ICAgIH0pO1xuXHR9XG5cblxuXHQvLyBQb3B1bGFyIGFydGlzdHNcblx0ZnVuY3Rpb24gbGlzdFBvcEFydGlzdHMoaW5mbykge1xuXHRcdHZhciB0ZW1wbGF0ZSA9ICQoJyNwb3AtYXJ0aXN0cy10ZW1wbGF0ZScpLmh0bWwoKTtcblx0XHR2YXIgdGVtcGxhdGVTY3JpcHQgPSBIYW5kbGViYXJzLmNvbXBpbGUodGVtcGxhdGUpO1xuXHRcdHZhciBodG1sID0gdGVtcGxhdGVTY3JpcHQoaW5mbyk7XG5cdFx0JCgnI3BvcC1hcnRpc3RzJykucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKTtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0JCgnI3BvcC1hcnRpc3RzJykuaHRtbChodG1sKS5hZGRDbGFzcygndmlzaWJsZScpO1xuXHRcdFx0Ly8gTGlzdGVuIGZvciBjbGljayB0byBvcGVuIG1vZGFsXG5cdFx0XHQkKCcubW9kYWwtdHJpZ2dlcicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRjYWxsQXJ0aXN0KCQodGhpcykuYXR0cignYXJ0aXN0RGF0YScpKTtcblx0XHRcdFx0JCgnI2FydGlzdC1tb2RhbCcpLmFkZENsYXNzKCdvcGVuJyk7XG5cdFx0XHR9KTtcblx0XHR9LCAzMDApO1xuXHR9XG5cblx0ZnVuY3Rpb24gZmFpbEFsZXJ0KCkge1xuXHRcdCQoJyNwb3AtYXJ0aXN0cycpLmh0bWwoJzxoMz5Tb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIGNoZWNrIGFnYWluIHNvb24uPC9oMz4nKTtcblx0fVxuXG4gICAgLy8gZmluZCBwb3B1bGFyIGFydGlzdHNcblx0ZnVuY3Rpb24gcG9wQXJ0aXN0cyAoKSB7XG5cdFx0dmFyIHJhbmRMZXQgPSBfLnNhbXBsZShbJ2EnLCAnYicsICdjJywgJ2QnLCAnZScsICdmJywgJ2onLCAnbCcsICduJywgJ3AnLCAncicsICdzJywgJ3QnLCAndiddKTtcblx0ICAgICQuYWpheCh7XG5cdCAgICAgICAgdXJsOiBcImh0dHBzOi8vYXBpLnNwb3RpZnkuY29tL3YxL3NlYXJjaD9xPVwiK3JhbmRMZXQrXCIqJnR5cGU9YXJ0aXN0JmxpbWl0PThcIlxuXHQgICAgfSlcblx0ICAgIC5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdGxpc3RQb3BBcnRpc3RzKGRhdGEuYXJ0aXN0cyk7XG5cdCAgICB9KVxuXHRcdC5mYWlsKGZ1bmN0aW9uKCkge1xuXHRcdFx0ZmFpbEFsZXJ0KCk7XG5cdFx0fSk7XG5cdH1cblx0c2V0SW50ZXJ2YWwocG9wQXJ0aXN0cywgOTAwMCk7XG5cdHBvcEFydGlzdHMoKTtcblxuXG5cblx0Ly8gc2VhcmNoIHJlc3VsdHNcblx0ZnVuY3Rpb24gbGlzdFNlYXJjaFJlc3VsdHMoaW5mbykge1xuXHRcdHZhciB0ZW1wbGF0ZSA9ICQoJyNzZWFyY2gtcmVzdWx0cy10ZW1wbGF0ZScpLmh0bWwoKTtcblx0XHR2YXIgdGVtcGxhdGVTY3JpcHQgPSBIYW5kbGViYXJzLmNvbXBpbGUodGVtcGxhdGUpO1xuXHRcdHZhciBodG1sID0gdGVtcGxhdGVTY3JpcHQoaW5mbyk7XG5cdFx0JCgnI3NlYXJjaC1yZXN1bHRzJykuaHRtbChodG1sKTtcblx0XHQvLyBMaXN0ZW4gZm9yIGNsaWNrIHRvIG9wZW4gbW9kYWxcblx0XHQkKCcubW9kYWwtdHJpZ2dlcicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuXHRcdFx0Y2FsbEFydGlzdCgkKHRoaXMpLmF0dHIoJ2FydGlzdERhdGEnKSk7XG5cdFx0XHQkKCcjYXJ0aXN0LW1vZGFsJykuYWRkQ2xhc3MoJ29wZW4nKTtcblx0XHR9KTtcblx0fVxuXG5cblx0Ly8gTGlzdGVuZXJzXG5cdC8vIElucHV0IGxhYmVsXG5cdCQoJyNhcnRpc3Qtc2VhcmNoJykuYmx1cihmdW5jdGlvbigpIHtcblx0XHRpZiAoJCh0aGlzKS52YWwoKS5sZW5ndGgpIHtcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ29wZW4nKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG5cdFx0XHQkKCcjc2VhcmNoLXJlc3VsdHMnKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuXHRcdH1cblx0XHQkKCcjcG9wLWFydGlzdHMnKS5yZW1vdmVDbGFzcygnZGltJyk7XG5cdH0pO1xuXG5cdC8vIERpbSBwb3B1bGFyIGFydGlzdHNcblx0JCgnI2FydGlzdC1zZWFyY2gnKS5mb2N1cyhmdW5jdGlvbigpIHtcblx0XHQkKCcjcG9wLWFydGlzdHMnKS5hZGRDbGFzcygnZGltJyk7XG5cdH0pO1xuXG5cdC8vIFNlYXJjaFxuXHQkKCcjYXJ0aXN0LXNlYXJjaCcpLmtleXVwKGZ1bmN0aW9uKGUpIHtcblx0XHR2YXIga2V5ID0gZS53aGljaCB8fCBlLmtleUNvZGU7XG5cdFx0aWYgKCQodGhpcykudmFsKCkubGVuZ3RoKSB7XG5cdFx0XHQkKCcjc2VhcmNoLXJlc3VsdHMnKS5hZGRDbGFzcygnb3BlbicpO1xuXHRcdFx0JC5hamF4KHtcblx0XHQgICAgICAgIHVybDogXCJodHRwczovL2FwaS5zcG90aWZ5LmNvbS92MS9zZWFyY2g/cT1cIiskKHRoaXMpLnZhbCgpK1wiKiZ0eXBlPWFydGlzdCZsaW1pdD04XCJcblx0XHQgICAgfSlcblx0XHQgICAgLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRsaXN0U2VhcmNoUmVzdWx0cyhkYXRhLmFydGlzdHMpO1xuXHRcdCAgICB9KTtcblx0XHR9XG5cdFx0ZWxzZSAkKCcjc2VhcmNoLXJlc3VsdHMnKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuXHRcdGlmIChrZXkgPT09IDEzKSB7XG5cdFx0XHQkKCcuc2VhcmNoLWFydGlzdHMgbGknKS5maXJzdCgpLmZpbmQoJ2EnKS50cmlnZ2VyKFwiY2xpY2tcIik7XG5cdFx0fVxuXHR9KTtcblxuXHQvLyBSZW1vdmUgc2VhcmNoIHJlc3VsdHMgb24gY2xvc2luZyBzZWFyY2hcblx0JCgnaW5wdXRbdHlwZT1zZWFyY2hdJykub24oJ3NlYXJjaCcsIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy52YWx1ZSA9PT0gXCJcIikge1xuXHRcdFx0JCgnI3NlYXJjaC1yZXN1bHRzJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcblx0XHR9XG5cdH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
