function getPoints(matrix, row, column) {
  let points = [];
  
  let rowUp = row - 1;
  let rowDown = row + 1;
  let columnR = column + 1;
  let columnL = column - 1;
  console.log(rowUp, rowDown, columnL, columnR);
  
  if ( rowUp > -1 && matrix[row][column] == matrix[rowUp][column]) {
    points.push([rowUp, column]);
  }
  if ( rowDown < matrix.length && matrix[row][column] == matrix[rowDown][column]) {
    points.push([rowDown, column]);
  }
  if ( columnR < matrix[0].length && matrix[row][column] == matrix[row][columnR]) {
    points.push([row, columnR])
  }
  if ( columnL > -1 && matrix[row][column] == matrix[row][columnL]) {
    points.push([row, columnL])
  }
  
  return points;
}

function fillGrid(matrix, row, column, color = 1) {
  
  if (!matrix || matrix.length == 0){
    return null;
  }
  
  var hash = {};
  
  var q = [];
  q.push([row, column]);
  console.log(q);
  hash[row + "" + column];
  while (q.length > 0) {
    
    let process = q.shift();
    
    let points = getPoints(matrix, process[0], process[1]); // points of the same color
    console.log(points);
    matrix[process[0]][process[1]] = color;
    
    for (let i = 0; i < points.length; i++) {
      let point = points[i];
      if (! hash[point[0] + "" + point[1]]) {
        hash[point[0] + "" + point[1]] = true;
        q.push(point);
        console.log(point);
      }
    }
  }
  return matrix;
}
