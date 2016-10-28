var G_UNITS = {"PENNY": 0.01,
            "NICKEL": 0.05,
            "DIME": 0.10,
            "QUARTER": 0.25,
            "ONE": 1.00,
            "FIVE": 5.00,
            "TEN": 10.00,
            "TWENTY": 20.00,
            "ONE HUNDRED": 100.00};
    
function checkCashRegister(price, cash, cid) {
  
    cid.sort(function (a, b) {
        return G_UNITS[b[0]] - G_UNITS[a[0]];
    });
    var remain = cash - price;
    
    function CheckBalance(remain, cid){
        var cidSum = 0;
        for (var i = 0; i < cid.length; i++){
            cidSum += cid[i][1];
        }
        
        if ( cidSum < remain ){
            return "Insufficient Funds";
        } else if ( cidSum === remain ){
            return "Closed";
        } else {
            return getChange(remain, cid);
        }
    }
    
    function getChange(remain, cid){
        var change = [];
        var count = -1;
        for ( var i = 0; i < cid.length; i++ ){
            if ( cid[i][1] > 0 ){ // !== 0
                if ( G_UNITS[cid[i][0]] <= remain ){
                    change[++count] = [cid[i][0], 0.00];
                    //console.log(change);
                    do{
                        remain = Number((remain - G_UNITS[cid[i][0]]).toFixed(2));// toFixed method is very important or you'll lose the last iterate (return type is a string number, so we change it to number type)
                        cid[i][1] = Number((cid[i][1] - G_UNITS[cid[i][0]].toFixed(2)));
                        
                        change[count][1] += G_UNITS[cid[i][0]];
                        console.log(change[count], remain);
                    } while(remain > 0 && (remain - G_UNITS[cid[i][0]]) >= 0 && cid[i][1] > 0);
                }
            }
            if ( remain === 0 ){
                console.log(change);
                return change;
            }
        }
      if ( remain !== 0 ){
                return "Insufficient Funds";
            }
    }
    
  return CheckBalance(remain, cid);
}

console.log(checkCashRegister(3.26, 100.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]));