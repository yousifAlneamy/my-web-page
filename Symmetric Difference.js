function sym(args) {
        
    function isFound(obj, element){
        return obj.indexOf(element) !== -1;
    }
    var new_row = [];
    for ( var i = 1; i < arguments.length; i++ ){

        for ( var j = 0; j < arguments[i].length; j++ ){

            if ( ! isFound(args, arguments[i][j]) && ! isFound(new_row, arguments[i][j])){
                new_row.push(arguments[i][j]);
            }
        }
        for ( var k = 0; k < args.length; k++ ){
            if ( ! isFound(arguments[i], args[k]) && ! isFound(new_row, args[k]) ){
                new_row.push(args[k]);
            }
        }
        args = new_row;
        new_row = [];
    }
  return args.sort();
}

console.log(sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]));