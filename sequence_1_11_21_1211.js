function getSequence(n, oldState){
        oldState = oldState || {};
        var beginTime = new Date().getTime();
        
        var arr_sec = oldState.arr_sec || ["1"]; // default
        
        function clearOldState(){
            oldState.split_arr = undefined;
            oldState.check_no =  undefined;
            oldState.conut_rep = undefined;
            oldState.new_level_str = undefined;
            oldState.j = undefined;
        }
        
        TimeOut:
        {
            for (var i = arr_sec.length - 1; i < n - 1 ; i++){
                
                var split_arr = oldState.split_arr || arr_sec[i].split('');

                var j = oldState.j || 0;
                var check_no = oldState.check_no || Number(split_arr[0]);
                var conut_rep = oldState.conut_rep || 0;
                var new_level_str = oldState.new_level_str || "";
                
                clearOldState();
                for ( ; j < split_arr.length; j++){
                
                    if ( check_no == Number(split_arr[j]) ){
                        conut_rep++;
                    } else {
                        new_level_str += conut_rep.toString() + check_no.toString();
                        check_no = Number(split_arr[j]);
                        conut_rep = 1;
                    }
                    
                    if ( new Date().getTime() - beginTime > breakTime ){
                        oldState.countTimeOut = (oldState.countTimeOut ? oldState.countTimeOut+1 : 1);
                        oldState.arr_sec = arr_sec;
                        if ( j + 1 >= split_arr.length ){
                            clearOldState();
                            new_level_str += conut_rep.toString() + check_no.toString();
                            arr_sec[i+1] = new_level_str;
                        } else{
                            oldState.split_arr = split_arr;
                            oldState.check_no =  check_no;
                            oldState.conut_rep = conut_rep;
                            oldState.new_level_str = new_level_str;
                            oldState.j = j + 1;
                        }
                        
                        console.log("Time out, saved old satate and break execution.. " + i + " times breaked\nLevel: " + i);
                        break TimeOut;
                    }
                }
                new_level_str += conut_rep.toString() + check_no.toString();
                arr_sec[i+1] = new_level_str;
            }
            return printStringContent(arr_sec[n-1]);
        }
        
        setTimeout(function(){return getSequence(n, oldState);}, pauseTime);
    }
    var n = 60; // level we want to find
    var breakTime = 100; // this is the time-limit that will an operation last before being paused. It should vary with browser and environment type
    var pauseTime = 50; // this is the time that current operation will stop before continues to work again.
    getSequence(n);
    
    function printStringContent(str, oldState){
        oldState = oldState || {};
        var beginTime = new Date().getTime();
        
        var str_len = oldState.str_len || str.length;
        TimeOut:{
            for (var i = oldState.i || 0; i < str_len; i += 5000){
                console.log(str.slice(i, i + 5000));
                if ( new Date().getTime() - beginTime > breakTime){
                    oldState.i = i + 5000;
                    oldState.str_len = str_len;
                    break TimeOut;
                }
            }
            return;
        }
        setTimeout(function(){return printStringContent(str, oldState);}, pauseTime);
    }
