if (typeof Function.prototype.method !== "function") {
    Function.prototype.method = function (name, func) { // here we're augmenting Function.prototype so we can add/make a method available to all functions
        console.log("function called: Function.prototype.method");
        this.prototype[name] = func; // here we're assigning a function available to all the objects of "this", because we're augmenting "func()" to its prototype property "name"
        return this;
    };
}

if (typeof Number.prototype.originToFixed !== "function") { // This is very important, we first check if we already overwrote the toFixed() by checking "originToFixed" property to prevent serious problems.
    Number.method("toFixed", function (){
            
        Number.method("originToFixed", Number.prototype.toFixed); // assigning the original toFixed() to originToFixed property (like renaming so we don't loss it).
        
        return function(digits){
            var that = this;
            var str = that.toString();
            
            /*
            recover all "digits" parameter errors
            */
            if ( typeof digits !== "number" || digits < 0 ){
                digits = 0;
            } else{
                digits = digits > 20? 20 : digits;
            }
            
            var pos = str.lastIndexOf(".") + digits + 1;
            if (str.charAt(pos) === "5") { // change "5" by "4" to test if this work (it will work)
                str = str.slice(0, pos) + "6";
            }
            that = Number(str);
            return that.originToFixed(digits); // using the original toFixed()
        }
    }());   
}

var dec = 2.55555;
console.log(dec.toFixed(2));