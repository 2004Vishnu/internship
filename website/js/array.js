// const fruits = ["Banana", "Orange", "Apple"];
// fruits.push("Lemon");

// //Array.isArray(fruits);

// let x = "";
// const myObj = {
//   name: "John",
//   age: 30,
//   cars: [
//     {name:"Ford", models:["Fiesta", "Focus", "Mustang"]},
//     {name:"BMW", models:["320", "X3", "X5"]},
//     {name:"Fiat", models:["500", "Panda"]}
//   ]
// }

// for (let i in myObj.cars) {
//     console.log(i);
//   x += myObj.cars[i].name;
//   for (let j in myObj.cars[i].models) {
//    x += myObj.cars[i].models[j] ;
//     console.log(x);
//  }
// }

// const fruits = ["Banana", "Orange", "Apple", "Mango"];
// console.log(fruits);
//  let f1=fruits.copyWithin(2,0);
// console.log(f1);
// let f3=fruits.copyWithin(1,2,4);
// console.log(f3);

// //toString() method converts an array to a string of (comma separated) array values.
// const f=fruits.toString();
// console.log(f);


// const f2=fruits.join(" * ");
// console.log(f2);

const myArr = [1, 2, 3, 4, 5,6];
const arr1=[[1,2],[3,4],[5,6]];
const newArr = myArr.flatMap(x =>  x * 10);
console.log(newArr);

const arr2=arr1.flat();
const arr3=myArr.flatMap(x=>x*2);
const arr4=myArr.slice(3);
console.log(arr2);
console.log(arr3);
console.log(arr4);

myArr.includes(3);