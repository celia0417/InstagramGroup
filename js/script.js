/**
 * Create, delete, edit group and add members into group
 */

// global variables
var removeDuplicate = [];
var flag = false;
var flag_delete = false;
var delete_from_this_group;

function createGroup() {
	var group = {};
	var input = document.getElementById("group_name");
	var groupName = input.value;
	if (groups.hasOwnProperty(groupName)) {
		window.alert("Group Name exists!");
	} else {
		if (groupName == "") {
			groupName = "Default" + index;
			index++;
		}
		input.value = "";

		groups[groupName] = group;
		window.alert("New Group'" + groupName + "' Has Been Created!");

		showList(groupName);
		addDropdow(groupName);
	}
}

function showList(groupName) {
	var side_bar = document.getElementById("side_bar");
	var li = document.createElement("li");
	li.setAttribute("id", "list_user");
	a = document.createElement('a');
	a.setAttribute('id', groupName + "unique_number");
	a.href = "javascript:showone(" + groupName + "unique_number" + ")"; // Insted of calling setAttribute 
	a.innerHTML = groupName // <a>INNER_TEXT</a>
	li.appendChild(a);
	side_bar.appendChild(li);
	updateDistance();
}

function addDropdow(groupName) {
	if (groups.hasOwnProperty('No_Assigned_Group')) {
		for ( var username in groups['No_Assigned_Group']) {
			var e = document.getElementById("choosen_group" + username);
			if (e != null) {
				var op = new Option();
				op.text = groupName;
				e.options.add(op);
			}
		}
	}
}

// show one group information in the side bar 
function showone(parameter) {
	console.log(parameter)
	editGroup(parameter.id.replace("unique_number", ""));
	makeTable();
	removeDuplicate = [];
	showOneGroup(parameter.id.replace("unique_number", ""));
}

// makeTable to show group 
function makeTable() {
	var container = document.getElementById("new_group");
	if (!flag)
		container.innerHTML = "";

	var table = document.createElement('table');
	table.setAttribute('id', 'myTable');
	table.className = 'table table-striped';

	var thead = document.createElement('thead');
	var tr_name = document.createElement('tr');
	var th_name1 = document.createElement('th');
	th_name1.innerHTML = 'Profile Picture';
	tr_name.appendChild(th_name1);

	// var th_user_name = document.createElement('thead');
	var th_user_name = document.createElement('th');
	th_user_name.innerHTML = 'User Name';
	tr_name.appendChild(th_user_name);

	var th_recent = document.createElement('th');
	th_recent.innerHTML = 'View Recent';
	tr_name.appendChild(th_recent);

	var th_group = document.createElement('th');
	th_group.innerHTML = 'Group';
	tr_name.appendChild(th_group);

	thead.appendChild(tr_name);
	table.appendChild(thead);
	var tbody = document.createElement('tbody');
	table.appendChild(tbody);
	// var table = document.getElementById('myTable');
	container.appendChild(table);
	flag = false;
}

// show all groups
function showAllGroup() {
	removeDuplicate = [];
	makeTable();
	var tbody = document.getElementById('myTable')
			.getElementsByTagName('tbody')[0];
	for ( var key in groups) {
		if (key != 'No_Assigned_Group') {
			showOneGroup(key);
		}
	}
	$(document).ready(function() {
		$('#myTable').dataTable();
	});
}

// show one group
function showOneGroup(groupName) {
	var tbody = document.getElementById('myTable')
			.getElementsByTagName('tbody')[0];
	var group = groups[groupName];
	for ( var key in group) {
		if (removeDuplicate.indexOf(key) == -1) {
			removeDuplicate.push(key);
			// profile pictures
			var tr = tbody.insertRow(tbody.rows.length);
			var td_prifile = document.createElement('td');
			td_prifile.innerHTML = '<img width="100" height="100" alt="song cover" src="'
					+ group[key].profile_picture + '">';
			tr.appendChild(td_prifile);

			// user name
			var td_user_name = document.createElement('td');
			td_user_name.innerHTML = "<a href='https://www.instagram.com/"
					+ group[key].username + "'>" + group[key].username + "</a>";
			tr.appendChild(td_user_name);

			// view recent
			var td_recent = document.createElement('td');
			var alink = document.createElement('a');
			alink.href = "javascript:searchForSelfRecent(" + group[key].id
					+ ")";
			alink.id = group[key].id;
			alink.innerHTML = 'Users Recent Media';
			td_recent.appendChild(alink);
			tr.appendChild(td_recent);

			// Group
			var td_group_name = document.createElement('td');

			var checkDuplicate = [];
			for (i = 0; i < group[key].group.length; i++) {
				if (group[key].group[i] == 'No_Assigned_Group'
						&& group[key].group.length == 1) {
					td_group_name.innerHTML = 'No Assigned Group <br>';
					continue;
				} else if (i == 0) {
					continue;
				}
				if (checkDuplicate.indexOf(group[key].group[i]) == -1)
					td_group_name.innerHTML += group[key].group[i] + " <br>";
				checkDuplicate.push(group[key].group[i]);
			}

			var form = document.createElement("form");

			var textnode2 = document.createElement("select");
			textnode2.id = "choosen_group" + key;
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
			a.href = "javascript:setUserName(" + key + ")";
			a.id = key;
			a.innerHTML = "add to group<br>";

			// create new group button
			var btn = document.createElement('button');
			btn.className = "btn btn-secondary";
			btn.setAttribute('data-toggle', 'modal');
			btn.setAttribute('data-target', '#myModal');
			btn.setAttribute('type', 'button');
			btn.innerHTML = "create new group";

			// delete from this group
			if (flag_delete) {
				var a2 = document.createElement('a');
				a2.href = "javascript:deleteFromGroup(" + key + "unique_delete"
						+ ")";
				a2.id = key + "unique_delete";
				a2.innerHTML = "delete from this group<br>";
			}

			form.appendChild(textnode2);
			form.appendChild(a);
			if (flag_delete)
				form.appendChild(a2);
			form.appendChild(btn);
			td_group_name.appendChild(form);

			tr.appendChild(td_group_name);
		}
	}
	// }
	flag_delete = false;
	$(document).ready(function() {
		$('#myTable').dataTable();
	});
}

function setUserName(key) {
	addToGroup(key.id);
}

function addToGroup(username) {
	var e = document.getElementById("choosen_group" + username);
	var groupName = e.options[e.selectedIndex].text;
	groups[groupName][username] = groups["No_Assigned_Group"][username];
	console.log(groups)
	if (groups["No_Assigned_Group"][username].group.indexOf(groupName) == -1) {
		var len = groups["No_Assigned_Group"][username].group.length;
		groups["No_Assigned_Group"][username].group[len] = groupName;
	}
}

function deleteFromGroup(unique_str) {
	var groupName = delete_from_this_group;
	var username = unique_str.id.replace('unique_delete', '');
	console.log(groupName)
	console.log(username)
	delete groups[groupName][username];
	for (var key in groups){
		if (groups[key].hasOwnProperty(username)){
			for (i = 0; i < groups[key][username].group.length; i++){
				if (groups[key][username].group[i] == groupName){
					delete groups[key][username].group.splice(i, 1);
				}
			}
		}
	}
	console.log(groups)
	window.alert("User " + username + " has been removed from group "
			+ groupName);
}

function deleteGroup() {
	// var group = document.getElementById(id);
	var delete_group_name = document.getElementById('delete_group_name').value;
	var delete_target = document.getElementById(delete_group_name
			+ "unique_number");
	if (delete_target == null) {
		window.alert("No such group exists");
	}
	while (delete_target.firstChild) {
		delete_target.removeChild(delete_target.firstChild);
	}
	delete groups[delete_group_name];
}

function addUsers() {
	var container = document.getElementById("song_list");
	group.push();
}

var changeGroupName;
function editGroup(groupName) {
	var container = document.getElementById("new_group");
	container.innerHTML = "";
	flag = true;
	flag_delete = true;
	delete_from_this_group = groupName;
	var btn = document.createElement('button');
	btn.className = "btn btn-secondary";
	btn.id = "edit_group_btn";
	btn.setAttribute('data-toggle', 'modal');
	btn.setAttribute('data-target', '#myModal3');
	btn.setAttribute('type', 'button');
	btn.innerHTML = "edit group name";

	container.appendChild(btn);
	changeGroupName = groupName;
}

function updateGroupName() {
	var changeTo = document.getElementById('change_group_name').value;
	// if (changeGroupName != null || changeGroupName != ""){
	groups[changeTo] = {};
	for ( var key in groups[changeGroupName]) {
		groups[changeTo][key] = groups[changeGroupName][key];
		for (i = 0; i < groups[changeGroupName][key].group.length; i++) {
			console.log(groups[changeGroupName][key].group[i])
			console.log(changeGroupName)
			if (groups[changeGroupName][key].group[i] === changeGroupName) {
				groups[changeTo][key].group[i] = changeTo;
			}
		}
	}
	delete groups[changeGroupName];
	// }
	console.log(groups)
	deleteGroup2(changeGroupName);
	showList(changeTo);
	addDropdow(changeTo);
}

function deleteGroup2(groupName) {
	var delete_target = document.getElementById(groupName + "unique_number");
	// var group = document.getElementById(id);
	if (delete_target == null) {
		window.alert("No such group exists");
	}
	while (delete_target.firstChild) {
		delete_target.removeChild(delete_target.firstChild);
	}
}

function updateDistance() {
	var groupHeight = $("#side_bar").height();
	console.log(document.getElementById('side_bar2'))
	$("#side_bar2").css("margin-top", 20 + groupHeight);
}
