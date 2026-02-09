const tasks=[];
const i=0;
function addtask(){
    const txt=document.getElementById("content").value;
    console.log(txt);
if(txt===''){return;}
    tasks.push(txt);
    document.getElementById("content").value="";
    displaytask();
}   

function deletetask(i){
    tasks.splice(i,1);
    displaytask();
}

function displaytask(){
    let list=[];
     for(i=0;i<tasks.length;i++){
    list+="<li>"+tasks[i]+"<button onClick='deletetask()'>x</button></li>"; 
}
document.getElementById("demo").innerHTML=list;
}

function removeall(){
    tasks=[];
    displaytask();
}
