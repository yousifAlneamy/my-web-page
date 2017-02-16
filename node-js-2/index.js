var fs = require('fs');

var options = process.argv.slice(2);

var command = options[0];

switch (command) {
	case 'help':
	default:
		showHelp();
		break;
	case 'read':
	case 'list':
		listTodos();
		break;
	case 'add':
		addItemTodos(options.slice(1));
		break;
	case 'remove':
		removeItemFromTodos(Number(options[1]));
		break;
	case 'update':
		updateItemTodos(Number(options[1]), options.slice(2));
		break;
	case 'reset':
		resetTodos();
		break;
}
function splitStringByNewline(string) {
	return string.split('\n').filter(function(element) {
		element = element.trim();
		return element.length > 0;
	});
}

function showHelp() {
	fs.readFile('help.txt', "utf-8", function(error, data) {
		if (error) {
			return console.log('Error: the help file could not be displayed', error);
		}
		console.log(data);
	});
}

function NothingToDoMessage(){
	console.log('Nothing to do! (or your cat ate your todo list)');
}
function listTodos() {

	fs.readFile('todo.json', "utf-8", function(error, data) {
		if (error) {
			if (error.code === 'ENOENT') {
				return NothingToDoMessage();
			} else {
				return console.log('Error: Something went wrong', error);
			}
		} else if (data.length === 0) {
			return NothingToDoMessage();
		}

		var todos = convertTodosToJSON(data);

		if (todos.length === 0) {
			return NothingToDoMessage();
		}

		console.log('Your todo list looks like this');
		todos.forEach(function(element, index) {
			index = (index + 1).toString();
			console.log(index, element);
		});

		if (todos.length > 5) {
			console.log('You have too much to do!');
		}
	});
}
function addItemTodos(item){

	if (!item || item.length === 0 || (item = item.join(' ').trim()).length === 0){
		return console.log("Invalid item-name input");
	}

	fs.readFile('todo.json', "utf-8", function(error, data) {
		var todos;
		if (error) {
			todos = [];
		} else {
			todos = convertTodosToJSON(data);
		}
		todos.push(item);
		var status = submitTodos(todos);
		if (status){
			console.log(status);
		} else {
			console.log('Item added successfully!')
		}
	});
}

function submitTodos(todos){
	fs.writeFile('todo.json', JSON.stringify(todos), "utf-8", function(error) {
		return error;
	});
}

function convertTodosToJSON(data){
	var todos;
	try{
		todos = JSON.parse(data);	
	} catch(error){
		todos = [];
	}
	return todos;
}
function removeItemFromTodos(index){
	if (!index || index <= 0){
		return console.log('Invalid index number!');
	}

	fs.readFile('todo.json', "utf-8", function(error, data) {
		var todos;
		if (error) {
			todos = [];
		} else {
			todos = convertTodosToJSON(data);
		}
		if (todos.length === 0){
			return console.log('Todos list is empty!');
		}

		if (index > todos.length){
			return console.log('Invalid index number: a valid index number is from 1 to ' + todos.length);
		}

		var item_removed = todos.splice(index - 1, 1);
		var status =submitTodos(todos);

		if (status) {
			console.log(status);
		} else {
			console.log('Item removed successfully!', item_removed);
		}
	});
}

function updateItemTodos(index, item){
	if (!index || index <= 0){
		return console.log('Invalid index number!');
	}
	if (!item || item.length === 0 || (item = item.join(' ').trim()).length === 0){
		return console.log("Invalid item-name input");
	}
	fs.readFile('todo.json', "utf-8", function(error, data) {
		var todos;
		if (error) {
			todos = [];
		} else {
			todos = convertTodosToJSON(data);
		}
		if (todos.length === 0){
			return console.log('Todos list is empty!');
		}
		if (index > todos.length){
			return console.log('Invalid index number: a valid index number is from 1 to ' + todos.length);
		}
		var item_removed = todos.splice(index - 1, 1, item);
		
		var status =submitTodos(todos);

		if (status) {
			console.log(status);
		} else {
			console.log('Item updated successfully!', `\n\nOld-item: "${item_removed}" replaced with New-item: "${item}"`);
		}
	});
}
function resetTodos(){
	var status =submitTodos([]);

		if (status) {
			console.log(status);
		} else {
			console.log('Todo\'s reseted successfully!');
		}
}