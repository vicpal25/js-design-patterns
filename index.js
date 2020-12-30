"use strict";
var a = 1;
{
  let a = 2;
  console.log( a ); // 2
}
console.log( a ); // 1
function print(a, b){
    console.log(a,b);
  }
  print(...[1,2,3]);  //1,2

  let s = Symbol(); // not a constructor so no new
  console.log(typeof s); //symbol
  console.log(s.valueOf("d"))

  //for of ..for in
  var list = ['Sunday','Monday','Tuesday'];
for (let i in list){
  console.log(i);  //0 1 2
}
for (let i of list){
  console.log(i);  //Sunday Monday Tuesday
}

var f3 = x => {
    if(x>5){
      console.log(x);
    }
    else {
      console.log(x+5);
    }
  }
  f3(6); //6
