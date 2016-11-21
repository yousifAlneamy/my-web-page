function getSequence(n){
        var arr_sec = ["1"]; // default
        for (var i = 0; i < n - 1; i++){

            var str_num = arr_sec[i];
            var split_arr = str_num.split('');

            var check_no = Number(split_arr[0]);
            var conut_rep = 0;
            var new_level_str = "";

            for (var j = 0; j < split_arr.length; j++){

                if ( check_no == Number(split_arr[j]) ){
                    conut_rep++;
                } else{
                    new_level_str += conut_rep.toString() + check_no.toString();
                    check_no = Number(split_arr[j]);
                    conut_rep = 1;
                }
            }
            new_level_str += conut_rep.toString() + check_no.toString();
            arr_sec[i+1] = new_level_str;
        }
        console.log(arr_sec);
        return arr_sec[n-1];
    }
    var n = 10;
    console.log("the level-" + n + "= " + getSequence(n) );
