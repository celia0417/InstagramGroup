/**
 * make table to show media 
 */
 
// makeTable to show group 
function makeMediaTable() {
	var container = document.getElementById("new_group");
	container.innerHTML = "";
	var table = document.createElement('table');
	table.setAttribute('id', 'myTable2');
	table.className = 'table table-striped';

	var thead = document.createElement('thead');
	var tr_name = document.createElement('tr');
	var th_name1 = document.createElement('th');
	th_name1.innerHTML = 'Media';
	tr_name.appendChild(th_name1);

	// var th_user_name = document.createElement('thead');
	var th_caption = document.createElement('th');
	th_caption.innerHTML = 'Caption';
	tr_name.appendChild(th_caption);

	var th_likes = document.createElement('th');
	th_likes.innerHTML = 'Likes';
	tr_name.appendChild(th_likes);

	var th_creation = document.createElement('th');
	th_creation.innerHTML = 'Creation Time';
	tr_name.appendChild(th_creation);

	var th_link = document.createElement('th');
	th_link.innerHTML = 'Link';
	tr_name.appendChild(th_link);

	var th_user = document.createElement('th');
	th_user.innerHTML = 'Post User';
	tr_name.appendChild(th_user);

	var th_tag = document.createElement('th');
	th_tag.innerHTML = 'Tags';
	tr_name.appendChild(th_tag);

	thead.appendChild(tr_name);
	table.appendChild(thead);
	var tbody = document.createElement('tbody');
	table.appendChild(tbody);
	// var table = document.getElementById('myTable');
	container.appendChild(table);
}

function plotMedia(mediaArray) {
	var tbody = document.getElementById('myTable2').getElementsByTagName(
			'tbody')[0];

	for (i = 0; i < mediaArray.length; i++) {
		// media
		var tr = tbody.insertRow(tbody.rows.length);
		var td_meida = document.createElement('td');
		td_meida.innerHTML = '<img width="100" height="100" alt="media content" src="'
				+ mediaArray[i].media + '">';
		tr.appendChild(td_meida);

		// caption
		var td_caption = document.createElement('td');
		td_caption.innerHTML = mediaArray[i].caption;
		tr.appendChild(td_caption);

		// likes
		var td_likes = document.createElement('td');
		td_likes.innerHTML = mediaArray[i].likes;
		tr.appendChild(td_likes);

		// Creation Time
		var td_creation = document.createElement('td');
		td_creation.innerHTML = mediaArray[i].created_time;
		tr.appendChild(td_creation);

		// Link
		var td_link = document.createElement('td');
		td_link.innerHTML = "<a href='" + mediaArray[i].link
				+ "'>See More Details</a>";
		tr.appendChild(td_link);

		//user
		var td_user = document.createElement('td');
		td_user.innerHTML = "<a href='https://www.instagram.com/"
				+ mediaArray[i].user.username + "'>"
				+ mediaArray[i].user.username + "</a>";

		var form = document.createElement("form");

		var textnode2 = document.createElement("select");
		textnode2.id = "choosen_group" + mediaArray[i].user.username;
		textnode2.className = 'form-control';
		var disOp = new Option();
		disOp.text = 'select group to add';
		disOp.disabled = true;
		textnode2.options.add(disOp);
		for ( var gname in groups) {
			if (gname != 'No_Assigned_Group') {
				var op = new Option();
				op.text = gname;
				textnode2.options.add(op);
			}
		}

		var a = document.createElement('a');
		console.log(mediaArray[i].user.username)
		a.href = "javascript:setUserName(" + mediaArray[i].user.username + ")";
		a.id = mediaArray[i].user.username;
		a.innerHTML = "add to group<br>";

		// create new group button
		var btn = document.createElement('button');
		btn.className = "btn btn-secondary";
		btn.setAttribute('data-toggle', 'modal');
		btn.setAttribute('data-target', '#myModal');
		btn.setAttribute('type', 'button');
		btn.innerHTML = "create new group";

		form.appendChild(textnode2);
		form.appendChild(a);
		form.appendChild(btn);
		td_user.appendChild(form);

		tr.appendChild(td_user);

		// tag
		var td_tag = document.createElement('td');
		td_tag.innerHTML = "";
		for (j = 0; j < mediaArray[i].tags.length; j++) {
			td_tag.innerHTML += mediaArray[i].tags[j] + "<br>";
		}
		tr.appendChild(td_tag);

		// if (group[key].group == 'No_Assigned_Group'){
		// 	td_group_name.innerHTML = 'No Assigned Group <br>';
		// }else{
		// 	td_group_name.innerHTML = group[key].group +" <br>";
		// }

	}
	// }
	$(document).ready(function() {
		$('#myTable2').dataTable();
	});
}