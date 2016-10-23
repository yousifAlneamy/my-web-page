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
                var white_space = "     ";
                
                for (var i = 0; i < arr.length; i++){
                    
                    for (var j = 0; j < ((arr.length - arr[i].length) / 2) * 5; j++){
                        str += " ";
                    }
                    for (var j = 0; j < arr[i].length; j++){
                        str += arr[i][j] + white_space;
                    }
                    str +="\n\n";
                }
                return str;
            }
        }
    };
    var pasTriObj = pascalTriangle();
    pasTriObj.calPasTri(4);
    console.log("The result array: ", pasTriObj.getArr());
    
    console.log("The result string tree: \n", pasTriObj.getStringTree());