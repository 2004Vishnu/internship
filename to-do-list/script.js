const tasks=[];
const a="";
const i=0;
function addtask(){
    const txt=document.getElementById("content").value;
    document.getElementById("content").innerHTML=a;
    console.log(txt);
    tasks.push(txt);
    console.log(i);
    displaytask(i);
}   

function deletetask(){
    tasks.pop(i);
    displaytask();
}

function displaytask(i){
    console.log(i);
    for(j=i;j<tasks.length;j++){
    document.getElementById("demo").innerHTML+="<li>"+tasks[i]+"<button onClick={deletetask()}>x</button>";
    i++;
    console.log(i);
    }
}
