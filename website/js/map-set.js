const animal = new Map();
animal.set("dog", "woof");
animal.set("cat", "meow");
animal.set("elephant", "toot");
console.log(animal.size); 
console.log(animal.get("dog")); 
console.log(animal.get("fox")); 
console.log(animal.has("bird")); 
animal.delete("dog");
console.log(animal.has("dog")); 

for (const [key, value] of animal) {
  console.log(`${key} goes ${value}`);
}

animal.clear();
console.log(animal.size);

const wm=new WeakMap();
let obj1={name:"thincnext"};
wm.set(obj1,"internship");
console.log(wm.get(obj1));
console.log(wm);

const users = [
  { name: "Amit", age: 22 },
  { name: "Ravi", age: 16},
  { name: "Sneha", age: 19 }
];
const adults = users.filter(user => user.age >= 18);
console.log(adults);
 const set = new Set();
set.add(1);
set.add(2);
set.add(3);
console.log(set);
console.log(set.values());
console.log(set.has(3));
set.delete(3);
let a=set.values();
for(let x of a){
    console.log(x);
}