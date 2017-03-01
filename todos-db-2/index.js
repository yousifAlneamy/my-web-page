'use strict';
const express = require("express");
const fs = require('fs');
const app = express();

var mysql = require('mysql');
const escape = require('pg-escape');

var config = JSON.parse(fs.readFileSync("config-secret.json"));

function openConnection(){
  return mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    port: config.port,
    database: config.database
  });
}

app.use(require('body-parser').json());

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

  let connection = openConnection();
  connection.query('SELECT * FROM todos WHERE 1;', function (error, results, fields) {
    response.status(200).json(results);
  });
  connection.end();
});

app.post('/todos', (request, response, next) => {// add todo item
  var item = request.body.item;
  var done;

  if ( String(request.body.done).toUpperCase() == "NULL" ){ // to allow null value
    done = null;
  } else {
    done = Number(request.body.done);
    if ((!done && done != 0) || done < 0 || done > 1 || done != request.body.done) {
      done = 0; // default value
    }
  }

  if (!item || (item = item.toString().trim()).length === 0){
    return response.status(400).end();
  }

  console.log(String(request.body.done).toUpperCase, `INSERT INTO todos (Done, Name) VALUES (${done},'${escape.string(item)}')`);
  let connection = openConnection();
  connection.query(`INSERT INTO todos (Done, Name) VALUES (${done},'${escape.string(item)}')`, function (error, results, fields) {

    if (error) {
      console.log(error);
      response.status(405).end();
    } else {
      console.log('Item added successfully!', item);
      response.status(201).json({"status": "Item added successfully!"});
    }
  });
  connection.end();
});

app.delete('/todos/:index', (request, response, next) => {

  var index = Number(request.params.index);
  if (!index || index <= 0 || index != request.params.index) {
    response.status(400);
    response.json({"status": 'Invalid index number!'});
    return console.log('Invalid index number!');
  }

  let connection = openConnection();
  connection.query(`DELETE FROM todos WHERE Id = ${index}`, function (error, results, fields) {

    console.log(results);
    console.log(error);
    if (error) {
      console.log(error);
      response.status(405).end();
    } else if (results) {
      if ( results.affectedRows > 0 ) {
        console.log('Item removed successfully!');
        response.status(200).json({"status": "Item removed successfully!"});
      } else {
        console.log('No such row with an index: ' + index);
        response.status(204);
        response.json({"status": 'No such row with an index: ' + index});
      }
    }
    response.end();
  });
  connection.end();
});

app.put('/todos/:index', (request, response, next) => {

  var index = Number(request.params.index);
  var item = request.body.item;
  var done;
  var itemFlag, doneFlag;
  var query = 'UPDATE todos SET';

  if (!index || index <= 0 || index != request.params.index) {
    response.status(400).json({"status": "Invalid index number!"});
    return console.log('Invalid index number!');
  }

  if ((!item || (item = item.toString().trim()).length === 0)){
    itemFlag = false;
  } else {
    itemFlag = true;
    query += " Name = '"+ escape.string(item) + "'";
  }

  if ((!done && done != 0) || done < 0 || done > 1 || done != request.body.done) {
    doneFlag = false;
  } else {
    doneFlag = true;
    if (itemFlag){
      query += ',';  
    }
    query += ' Done = ' + done;
  }


  if ( String(request.body.done).toUpperCase() == "NULL" ){ // to allow null value
    done = null;
    doneFlag = true;
  } else {
    done = Number(request.body.done);
    if ((!done && done != 0) || done < 0 || done > 1 || done != request.body.done) {
      doneFlag = false;
    } else {
      doneFlag = true;
    }
  }
  
  if (doneFlag){
    if (itemFlag){
        query += ',';  
      }
      query += ' Done = ' + done;
  }

  if (itemFlag || doneFlag){
    query += ' WHERE Id = ' + index;
  } else {
    response.status(400).json({"status": "Invalid request!"});
    return console.log("Invalid request!");
  }

  console.log(query);
  let connection = openConnection();
  connection.query(query, function (error, results, fields) {
    console.log(results);
    console.log(error);
    if (error) {
      console.log(error);
      response.status(405).end();
    } else if (results) {
      if ( results.affectedRows > 0 ) {
        console.log('Item updated successfully!');
        response.status(200).json({"status": "Item updated successfully!"});
      } else {
        console.log('No such row with an index: ' + index);
        response.status(204);
        response.json({"status": 'No such row with an index: ' + index});
      }
    }
    response.end();
  });
  connection.end();
});

app.delete('/reset/todos', (request, response, next) => {

  let connection = openConnection();
  connection.query(`DELETE FROM todos WHERE 1;`, function (error, results, fields) {

    console.log(results);
    console.log(error);
    response.status(205);
    console.log('Todo\'s reseted successfully!');

    response.end();
  });
  connection.end();
});

app.listen(8080, () => {
  console.log('application is listening on port 8080');
});
