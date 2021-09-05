const csv = require('csv-parser')
const fs = require('fs')
const results = [];
var csvData=[];

var maleSet = [];
var femaleSet = [];


fs.createReadStream("sample_data.csv")
.pipe(csv())
.on('data', function(data){
    try {

        if(data.Gender == " m"){
            maleSet.push(data.Name);
        }else if (data.Gender ==" f"){
          femaleSet.push(data.Name);
        }else{
        results.push(data);
        }
    }
    catch(err) {
        console.log("Incorrect data was found on the csv file");
    }
})
.on('end',function(){

  maleSet = remove_duplicates(maleSet);
  femaleSet = remove_duplicates(femaleSet);

  console.log("---------Good Match program by Vusi Sithole------------\n");
  console.log("----------------------Results--------------------------\n");
  for (var ii = 0; ii < maleSet.length; ii++){
    program((maleSet[ii]),(femaleSet[ii]))

    }

}); 

function program(name_1, name_2){
    
    var wordToMatch = name_1.concat("matches", name_2);
    var logger = fs.createWriteStream('output.txt', {
        flags: 'a' 
      })
    
    const wordToMatchArr = wordToMatch.split("");
    
    values = countOccurances(wordToMatchArr);
    
    do {
        var numberslist = listOfAdditions(values)
        values = numberslist;
    }while (values.length > 2);
    
    var total_percent = parseInt(numberslist.join(""));
    
    if (total_percent < 80){
        console.log(name_1 + " matches " + name_2 + " " + total_percent + "%");
        logger.write(name_1 + " matches " + name_2 + " " + total_percent + "%\n");
        
    }else{
        console.log(name_1 + " matches " + name_2 + " " + total_percent + "%, good match");
        logger.write(name_1 + " matches " + name_2 + " " + total_percent + "%, good match\n");
    } 
}

function countOccurances (stringArr) {

    const map = stringArr.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

    let values = Array.from( map.values());

    return values

}

function addFirstAndLast(numberArr){
    
    return (numberArr[0] + numberArr[numberArr.length - 1]);
    
}

function listOfAdditions(numberArr){
    var numbers = []
    var x = (numberArr.length / 2).toFixed();

    for (let i = 0; i < x; i++){
        if (numberArr.length == 1){
            numberArr.push(0)
        }
        var sumFirstAndLast = addFirstAndLast(numberArr);
        numberArr = numberArr.slice(1, -1);
        if (sumFirstAndLast > 9){ 
            sNum = sumFirstAndLast.toString();

            for (var y = 0, len = sNum.length; y < len; y += 1) {
                numbers.push(+sNum.charAt(y));
            }
        } 
        else {
            numbers.push(sumFirstAndLast)}
    }
    
    return numbers
}

function remove_duplicates(arr) {
    var obj = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i]] = true;
    }
    for (var key in obj) {
        ret_arr.push(key);
    }
    return ret_arr;
  }
