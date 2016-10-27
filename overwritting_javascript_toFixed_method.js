if (typeof Function.prototype.method !== "function") {
    Function.prototype.method = function (name, func) { // here we're augmenting Function.prototype so we can add/make a method available to all functions
        this.prototype[name] = func; // here we're assigning a function available to all the objects of "this", because we're augmenting "func()" to its prototype property "name"
        return this;
    };
}

if (typeof Number.prototype.originToFixed !== "function") { // This is very important, we first check if we already overwrote the toFixed() by checking "originToFixed" property to prevent serious problems.
    Number.method("toFixed", function (){
            
        Number.method("originToFixed", Number.prototype.toFixed); // assigning the original toFixed() to originToFixed property (like renaming so we don't loss it).
        
        return function(digits){
            /*
            recover all "digits" parameter errors
            */
            if ( typeof digits !== "number" || digits < 0 ){
                digits = 0;
            } else{
                digits = digits > 20? 20 : digits;
            }
            
            var str = this.toString();
            var index_of_dot = str.lastIndexOf(".");
            
            if ( index_of_dot !== -1){ // is it a decimal?
                var pos = index_of_dot + digits + 1;
                if (str.charAt(pos) === "5") { // is the char at pos == "5"?        (change "5" by "4" to test if this work (it will work))
                    str = str.slice(0, pos) + "6"; // replace the "5" at index of pos, by "6"
                    alert("dec changed from " + this.toString() + " to  " + str);
                }   
            }
            
            var that = Number(str);
            return that.originToFixed(digits); // using the original toFixed()
        }
    }());   
}

var dec = 23.445;
console.log(dec.toFixed(2));
