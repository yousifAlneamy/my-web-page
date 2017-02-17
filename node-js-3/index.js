'use strict';
const express = require("express");
const fs = require('fs');
const app = express();
app.use(require('body-parser').json());
var todos = getTodosArray();

setTimeout(() => {console.log(todos)}, 1000);

app.get('/', (request, response, next) => {
	response.status(303);
	response.redirect('help');
});

app.get('/help', (request, response, next) => {
	var fileStream = fs.createReadStream('help.json');
	fileStream.on('open', function () {
		response.status(200);
		fileStream.pipe(response);
	});
});

app.get('/todos', (request, response, next) => {
	response.status(200).json(todos);
});

app.post('/todos', (request, response, next) => {// add todo item
	var item = request.body.item;
	if (!item || (item = item.toString().trim()).length === 0){
		return response.status(400).end();
	}
	todos.push(item);

	var status = submitTodos(todos);
	if (status) {
		console.log(status);
		response.status(405).end();// this will never be called unless the server is refusing to write files
	} else {
		console.log('Item added successfully!', item);
		response.status(201).json({"status": "Item added successfully!"});
	}
});

app.delete('/todos', (request, response, next) => {

	if (todos.length === 0){
		response.status(410).end();
		return console.log('Todos list is empty!');
	}

	var index = Number(request.body.index);
	if (!index || index <= 0 || index > todos.length ){
		response.status(400);
		response.send('Invalid index number: a valid index number is from 1 to ' + todos.length);
		return console.log('Invalid index number: a valid index number is from 1 to ' + todos.length);
	}

	var item_removed = todos.splice(index - 1, 1);
	var status = submitTodos(todos);
	if (status) {
		console.log(status);
		response.status(405);
	} else {
		console.log('Item removed successfully!', item_removed);
		response.status(200).json({"status": "Item removed successfully!"});
	}
	response.end();
});

app.put('/todos', (request, response, next) => {

	if (todos.length === 0){
		response.status(410).end();
		return console.log('Todos list is empty!');
	}

	var index = Number(request.body.index);
	var item = request.body.item;

	if (!index || index <= 0 || index > todos.length) {
		response.status(400).send('Invalid index number!');
		return console.log('Invalid index number: a valid index number is from 1 to ' + todos.length);
	}

	if (!item || (item = item.toString().trim()).length === 0){
		response.status(400).send("Invalid item-name input");
		return console.log("Invalid item-name input");
	}

	var item_removed = todos.splice(index - 1, 1, item);
	var status =submitTodos(todos);
	if (status) {
		console.log(status);
		response.status(405);
	} else {
		console.log('Item updated successfully!', `\n\nOld-item: "${item_removed}" replaced with New-item: "${item}"`);
		response.status(200).json({"status": "Item updated successfully!"});
	}
	response.end();
});

app.delete('/todos/reset', (request, response, next) => {

	todos = [];
	var status =submitTodos(todos);
	if (status) {
		console.log(status);
		response.status(405);
	} else {
		response.status(205);
		console.log('Todo\'s reseted successfully!');
	}
	response.end();
});

app.listen(8080, () => {
	console.log('application is listening on port 3000');
});

function getTodosArray (){
	fs.readFile('todo.json', "utf-8", function(error, data) {
		if (error) {
			todos = [];
		} else {
			todos = convertTodosToJSON(data);
		}
		return todos;
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

function submitTodos(todos){// modifying todo.json
	fs.writeFile('todo.json', JSON.stringify(todos), "utf-8", function(error) {
		return error;
	});
}
