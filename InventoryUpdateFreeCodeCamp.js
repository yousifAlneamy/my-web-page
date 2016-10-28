function updateInventory(arr1, arr2) {
    
    for ( var i = 0; i < arr1.length; i++ ){
        
        for ( var j = 0; j < arr2.length; j++ ){
            if ( arr1[i][1] === arr2[j][1]){
                arr1[i][0] += arr2[j][0];
            }
        }
    }
    
    for ( var i = 0; i < arr2.length; i++ ){
        var isFoundFlag = false;
        
        for ( var j = 0; j < arr1.length; j++ ){
            if ( arr2[i][1] === arr1[j][1]){
                isFoundFlag = true;
                break;
            }
        }
        if ( ! isFoundFlag ){
            arr1.push(arr2[i]);
        }
    }
    return arr1.sort(function (a, b) {
        return a[1].localeCompare(b[1]);
    });
}

var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

console.log(updateInventory(curInv, newInv));