Function.prototype.method = function (name, func) { // here we're augmenting Function.prototype so we make a method available to all functions
        this.prototype[name] = func; // here we're assigning a function available to all the objects of "this", because we're augmenting it to its prototype
        return this;
    };

Number.method('length', function ( ) { // adding length method to number prototype
        return this.toString().length;
    });

var pascalTriangle = function(){
        
        var arr = [[1], [1, 1]]; // default value (main array)

        return{
            calPasTri: function (level){
                n = level - arr.length; // level - the default value

                for (var i = 0; i <= n ; i++){
                    var temp_arr= [];// Building row by row
                    temp_arr[0] = 1; // adding 1 at the beginning of the array
                    for (var j = 0, k = 1; j < arr[arr.length -1].length - 1; j++, k++){
                        temp_arr[k] = arr[arr.length -1][j] + arr[arr.length -1][j+1];
                    }
                    temp_arr.push(1);// adding 1 at the end of the array
                    arr.push(temp_arr);// pushing the temp array to a new row on the main array
                }
        },
            getArr: function(){
                return arr;
            },
            getStringTree: function(){
                var str = "";
                var white_space = "       ";
                
                
                for (var i = 0; i < arr.length; i++){
                    
                    for (var j = 0; j < ((arr.length - arr[i].length) / 2) * (white_space.length + 1); j++){
                        str += " ";
                    }
                    for (var j = 0; j < arr[i].length; j++){
                        
                        if ( j == 0 && i > 3){
                            str += arr[i][0] +  white_space;
                        }else{
                            str += arr[i][j] + (arr[i][j].length() > 1 ? white_space : white_space + " "); // if number == 1 digit, then give extra space. because 2 and more digits are taking more space than 1 digit
                        }
                        
                    }
                    str +="\n\n";
                }
                return str;
            }
        }
    };
    var pasTriObj = pascalTriangle();
    pasTriObj.calPasTri(8);
    console.log("The result array: ", pasTriObj.getArr());
    
    console.log("The result string tree: \n", pasTriObj.getStringTree());
