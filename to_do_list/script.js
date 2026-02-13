let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let doneTasks=JSON.parse(localStorage.getItem("doneTasks"))||[];

// new_b.addEventListener("click",()=>{
// const newtxt=document.getElementById('li_p').value;
// console.log(newtxt);
// tasks[index]=newtxt;
// saveTasks();
// displayTasks();
// });

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function saveTasks1() {
  localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
}

function addTask() {
  const input = document.getElementById("content");
 const text = input.value.trim();
  if (!text) return;
  tasks.push(text);
  input.value = "";
  saveTasks();
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}

function removeAll() {
  if (!confirm("Clear all tasks?")) return;

  tasks = [];
  saveTasks();
  displayTasks();
}

function displayTasks() {
  const ul = document.getElementById("taskList");
  ul.innerHTML = "";

  tasks.forEach((task, index) => {
    ul.innerHTML += `
      <li>
        <p>${task}</p><span>
      <div class="btngrp">
        <button class="delete-btn" onclick="deleteTask(${index})">✕</button>
        <button class="edit" onclick="edittask(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pen-icon lucide-pen"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg>
        </button>
        <button class="done-btn" onclick="done(${index})">Done</button>
        </div></span>
      </li> `;
  });  

   
}

function edittask(index) {
  const ul = document.getElementById("taskList");
  const li = ul.children[index];

  const textElement = li.querySelector("p");
  const editButton = li.querySelector(".edit");
  const deleteButton = li.querySelector(".delete-btn");
  const doneButton = li.querySelector(".done-btn");

  const currentText = tasks[index];

  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;
  input.style.flex = "1";

  textElement.replaceWith(input);

  // Hide other buttons
  deleteButton.style.display = "none";
  doneButton.style.display = "none";

  editButton.innerText = "Save";

  editButton.onclick = function () {
    const updatedText = input.value.trim();
    if (!updatedText) return;

    tasks[index] = updatedText;
    saveTasks();
    displayTasks(); // refresh restores buttons
  };
}


  
  // new_p.value=tasks[index];

  // q.replaceWith(new_p);
  // b.replaceWith(new_b);

  // const newText=prompt("Edit task:", tasks[index]);
  // if (!newText) return;
  // tasks[index]=newText;
  // document.getElementById("content").value="";
  // saveTasks();
  // displayTasks();
 

displayTasks();
displayCompletedTasks();

function done(index){
//const checkbox=document.getElementById("checkbox");
doneTasks.push(tasks[index]);
console.log(doneTasks);
deleteTask(index);
saveTasks();
saveTasks1();
displayTasks();
displayCompletedTasks(); 
}

function displayCompletedTasks(){
const ul1 = document.getElementById("completed");

ul1.innerHTML='';
  doneTasks.forEach((task,index) => {
    ul1.innerHTML += `
      <li>
        <p>${task}</p><button onclick="undo(${index})">undo</button>
      </li> `;
  }); 
}


function removelist() {
  if (!confirm("Clear all tasks?")) return;

  doneTasks = [];
  saveTasks1();
  displayCompletedTasks();
}

function undo(index){
tasks.push(doneTasks[index]);
doneTasks.splice(index,1);
saveTasks();
saveTasks1();
displayTasks();
displayCompletedTasks();
}