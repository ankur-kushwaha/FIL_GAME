var imageData = {};
var game="";
$(document).ready(function() {
	game=Math.floor((Math.random() * 2) + 1);
	$.getJSON('image'+game+'.json', function(data) {
		console.log(data);
		imageData = data;
		var i = 0;
		var html = "";
		for ( var key in data) {

			if (i % 4 == 0) {
				html = html + "<tr>";
			}
			html = html + "<td id=" + key + "><div class='checkbox'><label><input type='checkbox'><img src='images/cards"+game+"/" + key + ".gif'></label></div>";
			i++;
		}
		$('table#gameTable').append(html);
		appendCheckbox();
	});

	function appendCheckbox() {

		//$('#gameTable td').append('<input type=checkbox>');
		var counter = 0;

		$('#gameTable').on('click', ':checkbox', function() {

			if ($(this).is(':checked')) {
				counter++;

			} else {
				counter--;
			}
			console.log(counter);
			if (counter == 3) {
				var sel = [];
				$('#gameTable :checked').each(function(i, data) {
					var id = $(this).parents('td').attr('id');
					sel.push(id);
				});

				checkSet(sel);
				counter = 0;
				$('#gameTable input:checkbox').removeAttr('checked');

			}
		});
	}
	var resultSet = [];
	function checkSet(sel) {
		var shape = [];
		var color = [];
		var number = [];
		var shading = [];
		$.each(sel, function(index, i) {
			shape.push(imageData[i].shape);
			color.push(imageData[i].color);
			number.push(imageData[i].number);
			shading.push(imageData[i].shading);
		});

		if (isSet(shape) && isSet(color) && isSet(number) && isSet(shading)) {
			alert("Its a Set");
			var resultIndex = sel.join();
			if (resultSet.indexOf(resultIndex)) {
				resultSet.push(resultIndex);
				addToResultSet(sel);
			}

		} else {
			alert("Not a Set");
		}
	}

	function isSet(arr) {
		console.log(arr);
		var f1 = arr[0];
		var f2 = arr[1];
		var f3 = arr[2];
		if (f1 == f2 && f2 == f3) {
			return true;
		} else if (f1 != f2 && f2 != f3 && f3 != f1) {
			return true;
		} else {
			return false;
		}
	}
	function addToResultSet(sel) {
		var $html = $("<tr></tr>");
		$.each(sel, function(i, data) {
			$html.append("<td><img src=images/cards"+game+"/" + data + ".gif>");
		})
		$("#resultSet table").append($html);
	}

});