let p= document.getElementById("fruit");
      let q=document.getElementById("fruits").onchange=function(e){
    console.log(e) 
        p.innerText=e.target.value;}


let img1=document.getElementById("myimg");
img1.addEventListener("load",function(){
     document.getElementById("img").innerHTML = "Page is fully loaded!";
    })
